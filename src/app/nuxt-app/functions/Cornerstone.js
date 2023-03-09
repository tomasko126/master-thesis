/**
 * Usually I would declare any business logic contained in this file as a Pinia action,
 * however Cornerstone library does not like to be imported multiple times from different Vue components.
 * Thus, any Cornerstone-related logic has been put to one single file with all methods exported individually.
 * Side effect benefit of this implementation is that it supports tree-shaking by default, so the app bundle
 * footprint can be smaller.
 */

import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import Hammer from 'hammerjs';

import { useGlobalStore } from '~/stores';
const store = useGlobalStore();

/* global cornerstoneTools */

/**
 * Initialize cornerstone libraries
 * @returns {Promise<void>}
 */
export const initLibraries = async() => {
    // Setup all required cornerstone-tools dependencies
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.init({
        mouseEnabled: true,
        showSVGCursors: true,
    });

    // Setup all required cornerstone-wado-image-loader dependencies
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    cornerstoneWADOImageLoader.configure({
        useWebWorkers: true,
        decodeConfig: {
            convertFloatPixelDataToInt: false,
        },
    });

    const config = {
        maxWebWorkers: navigator.hardwareConcurrency || 1,
        startWebWorkersOnDemand: false,
        taskConfiguration: {
            decodeTask: {
                initializeCodecsOnStartup: true,
                strict: false,
            },
        },
    };

    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
}

/**
 * Load images from given |files| and show the first one in a main window
 * @param {File[]} imageFiles
 * @returns {Promise<void>}
 */
export const loadImagesFromFiles = async (imageFiles) => {
    // Purge existing cached and stored data
    removeImages();

    // Retrieve image IDs used for referencing images
    const imageIds = [];
    for (const imageFile of imageFiles) {
        imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(imageFile));
    }
    store.imageIds = imageIds;

    // Set image stack
    const stack = {
        currentImageIdIndex: 0,
        imageIds: store.imageIds,
    };

    // We have to reset enabled element
    cornerstone.disable(store.mainImageContainer);
    cornerstone.enable(store.mainImageContainer);

    // Add stack state manager for stack and playClip tools
    cornerstoneTools.addStackStateManager(store.mainImageContainer, ['stack', 'playClip']);
    cornerstoneTools.addToolState(store.mainImageContainer, 'stack', stack);

    // Set default animation settings
    store.animation = {
        speed: 30,
        fromIdx: 0,
        toIdx: Math.max( store.imageIds.length - 1, 0),
    }
};

/**
 * Display an image specified by |imageId| in the |element|
 * @param {HTMLElement} element
 * @param {string} imageId
 * @returns {Promise<void>}
 */
export const displayImageInElement = async (element, imageId) => {
    if (!imageId) {
        return;
    }
    const image = await cornerstone.loadAndCacheImage(imageId);
    cornerstone.displayImage(element, image);
}

/**
 * Retrieve shown image
 * @returns {Image|null}
 */
export const getImage = () => {
    try {
        return cornerstone.getImage(store.mainImageContainer);
    } catch (e) {
        return null;
    }
};

/**
 * Remove all loaded images
 */
export const removeImages = () => {
    store.imageIds = [];
    store.shownImageId = null;
    store.gridState = null;
    store.dicomHeaderParser = null;
    cornerstone.imageCache.purgeCache();
    cornerstoneTools.getToolForElement(store.mainImageContainer, 'Grid').clearAllStates();
};

/**
 * Set cornerstone's tool to an active state
 * @param {string} toolName - tool's name
 * @param {Object} toolOptions - tool's option
 */
export const activateTool = (toolName, toolOptions = {}) => {
    if (store.activeTool) {
        // Deactivate another active tool
        deactivateTool(toolName);
    }
    cornerstoneTools.setToolActiveForElement(store.mainImageContainer, toolName, toolOptions);
    store.activeTool = toolName;
};

/**
 * Deactivate tool by setting its state to 'enabled'
 * @param {string} toolName
 */
export const deactivateTool = (toolName) => {
    cornerstoneTools.setToolEnabledForElement(store.mainImageContainer, toolName);
    store.activeTool = null;
};

/**
 * Register and enable tool given by |toolName| param
 * @param {string} toolName
 */
export const registerTool = (toolName) => {
    const tool = cornerstoneTools[`${toolName}Tool`];
    cornerstoneTools.addToolForElement(store.mainImageContainer, tool);
    cornerstoneTools.setToolEnabledForElement(store.mainImageContainer, toolName);
};

/**
 * Register all tools
 */
export const registerAllTools = () => {
    for (const toolName of store.tools) {
        registerTool(toolName);
    }
};

/**
 * Unregister a tool
 * @param {string} toolName
 */
export const unregisterTool = (toolName) => {
    const tool = cornerstoneTools[`${toolName}Tool`];
    cornerstoneTools.removeTool(tool);
};

/**
 * Unregister all tools
 */
export const unregisterAllTools = () => {
    for (const toolName of store.tools) {
        unregisterTool(toolName);
    }
};

/**
 * Register image container in order to show DICOM images in it
 * @param {HTMLElement} element
 * @param {boolean} isMainImageContainer
 */
export const registerImageContainer = (element, isMainImageContainer = false) => {
    cornerstone.enable(element);
    if (isMainImageContainer) {
        store.mainImageContainer = element;
    }
};

/**
 * Unregister image container
 * @param {HTMLElement} element
 * @param {boolean} isMainImageContainer
 */
export const unregisterImageContainer = (element, isMainImageContainer = false) => {
    cornerstone.disable(element);
    if (isMainImageContainer) {
        store.mainImageContainer = null;
    }
};

/**
 * Retrieve GridTool instance
 * @returns {Object|null}
 */
export const getGridTool = () => {
    return cornerstoneTools.getToolForElement(store.mainImageContainer, 'Grid') ?? null;
}



/**
 * Start looping images in the main container
 * @returns {Promise<void>}
 */
export const startLoopingImages = async () => {
    store.isLoopingImages = true;
    cornerstoneTools.playClip(store.mainImageContainer, store.animation.speed, { fromIdx: store.animation.fromIdx, toIdx: store.animation.toIdx });
};

/**
 * Stop looping images in the main container
 */
export const stopLoopingImages = () => {
    cornerstoneTools.stopClip(store.mainImageContainer);
    store.isLoopingImages = false;
};

/**
 * Set brightness of main image container
 * @param {number} scalar
 */
export const setBrightness = (scalar) => {
    const viewport = cornerstone.getViewport(store.mainImageContainer);
    viewport.voi.windowCenter -= scalar;
    cornerstone.setViewport(store.mainImageContainer, viewport);
};

/**
 * Set contrast of main image container
 * @param {number} scalar
 */
export const setContrast = (scalar) => {
    const viewport = cornerstone.getViewport(store.mainImageContainer);
    viewport.voi.windowWidth -= scalar;
    cornerstone.setViewport(store.mainImageContainer, viewport);
};

/**
 * Set zoom of main image container by |zoomFactorChange|
 * @param {number} zoomFactorChange
 */
export const setZoom = (zoomFactorChange) => {
    const viewport = cornerstone.getViewport(store.mainImageContainer);

    const pow = 1.7;
    const oldFactor = Math.log(viewport.scale) / Math.log(pow);
    const factor = oldFactor + zoomFactorChange;

    viewport.scale = Math.pow(pow, factor);

    cornerstone.setViewport(store.mainImageContainer, viewport);
};
