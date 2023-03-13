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

import { VaFile } from 'vuestic-ui';
import { useGlobalStore } from '~/stores';
import { GridTool } from '~/functions/types/GridTool';

const store = useGlobalStore();

/**
 * Initialize cornerstone libraries
 */
export const initLibraries = (): void => {
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
 * Load images from given |imageFiles| and show the first one in a main window
 */
export const loadImagesFromFiles = (imageFiles: VaFile[]|[]): void => {
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
  cornerstone.disable(store.mainImageContainer as HTMLElement);
  cornerstone.enable(store.mainImageContainer as HTMLElement);

  // Add stack state manager for stack and playClip tools
  cornerstoneTools.addStackStateManager(store.mainImageContainer, ['stack', 'playClip']);
  cornerstoneTools.addToolState(store.mainImageContainer, 'stack', stack);

  // Set default animation settings
  store.animation = {
    speed: 30,
    fromIdx: 0,
    toIdx: Math.max(store.imageIds.length - 1, 0),
  }
};

/**
 * Display an image specified by |imageId| in the |element|
 */
export const displayImageInElement = async (element: HTMLElement, imageId: string): Promise<void> => {
  if (!imageId) {
    return;
  }
  const image = await cornerstone.loadAndCacheImage(imageId);
  cornerstone.displayImage(element, image);
}

/**
 * Retrieve shown image
 */
export const getImage = (): cornerstone.Image|null => {
  try {
    return cornerstone.getImage(store.mainImageContainer as HTMLElement);
  } catch (e) {
    return null;
  }
};

/**
 * Remove all loaded images
 */
export const removeImages = (): void => {
  store.imageIds = [];
  store.shownImageId = null;
  store.gridState = null;
  store.dicomHeaderParser = null;
  cornerstone.imageCache.purgeCache();
  cornerstoneTools.getToolForElement(store.mainImageContainer, 'Grid').clearAllStates();
};

/**
 * Set cornerstone's tool to an active state
 */
export const activateTool = (toolName: string, toolOptions: object): void => {
  if (store.activeTool) {
    // Deactivate another active tool
    deactivateTool(toolName);
  }
  cornerstoneTools.setToolActiveForElement(store.mainImageContainer, toolName, toolOptions);
  store.activeTool = toolName;
};

/**
 * Deactivate tool by setting its state to 'enabled'
 */
export const deactivateTool = (toolName: string): void => {
  cornerstoneTools.setToolEnabledForElement(store.mainImageContainer, toolName);
  store.activeTool = null;
};

/**
 * Register and enable tool given by |toolName| param
 */
export const registerTool = (toolName: string): void => {
  const tool = cornerstoneTools[`${toolName}Tool`];
  cornerstoneTools.addToolForElement(store.mainImageContainer, tool);
  cornerstoneTools.setToolEnabledForElement(store.mainImageContainer, toolName);
};

/**
 * Register all tools
 */
export const registerAllTools = (): void => {
  for (const toolName of store.tools) {
    registerTool(toolName);
  }
};

/**
 * Unregister a tool
 */
export const unregisterTool = (toolName: string): void => {
  const tool = cornerstoneTools[`${toolName}Tool`];
  cornerstoneTools.removeTool(tool);
};

/**
 * Unregister all tools
 */
export const unregisterAllTools = (): void => {
  for (const toolName of store.tools) {
    unregisterTool(toolName);
  }
};

/**
 * Register image container in order to show DICOM images in it
 */
export const registerImageContainer = (element: HTMLElement, isMainImageContainer = false): void => {
  cornerstone.enable(element);
  if (isMainImageContainer) {
    store.mainImageContainer = element;
  }
};

/**
 * Unregister image container
 */
export const unregisterImageContainer = (element: HTMLElement, isMainImageContainer = false): void => {
  cornerstone.disable(element);
  if (isMainImageContainer) {
    store.mainImageContainer = null;
  }
};

/**
 * Retrieve GridTool instance
 */
export const getGridTool = (): GridTool|null => {
  return cornerstoneTools.getToolForElement(store.mainImageContainer, 'Grid') ?? null;
}

/**
 * Start looping images in the main container
 */
export const startLoopingImages = ({ fromIdx = store.animation.fromIdx, toIdx = store.animation.toIdx, loop = true }: { fromIdx?: number, toIdx?: number, loop?: boolean } = {}): void => {
  store.isLoopingImages = true;
  cornerstoneTools.playClip(store.mainImageContainer, store.animation.speed, { fromIdx, toIdx, loop });
};

/**
 * Stop looping images in the main container
 */
export const stopLoopingImages = (): void => {
  cornerstoneTools.stopClip(store.mainImageContainer);
  store.isLoopingImages = false;
};

/**
 * Set brightness of main image container
 */
export const setBrightness = (scalar: number): void => {
  const viewport = cornerstone.getViewport(store.mainImageContainer as HTMLElement);
  if (viewport) {
    viewport.voi.windowCenter -= scalar;
    cornerstone.setViewport(store.mainImageContainer as HTMLElement, viewport);
  }
};

/**
 * Set contrast of main image container
 */
export const setContrast = (scalar: number): void => {
  const viewport = cornerstone.getViewport(store.mainImageContainer as HTMLElement);
  if (viewport) {
    viewport.voi.windowWidth -= scalar;
    cornerstone.setViewport(store.mainImageContainer as HTMLElement, viewport);
  }
};

/**
 * Set zoom of main image container by |zoomFactorChange|
 */
export const setZoom = (zoomFactorChange: number): void => {
  const viewport = cornerstone.getViewport(store.mainImageContainer as HTMLElement);

  if (viewport) {
    const pow = 1.7;
    const oldFactor = Math.log(viewport.scale) / Math.log(pow);
    const factor = oldFactor + zoomFactorChange;

    viewport.scale = Math.pow(pow, factor);

    cornerstone.setViewport(store.mainImageContainer as HTMLElement, viewport);
  }
};

export const getImageData = (imageIndex: number): Dicom.Image => {
  return cornerstone.imageCache.cachedImages[imageIndex].image.data;
}
