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
// @ts-ignore
import cornerstoneTools from '@tarotoma/cornerstone-tools';
import type { FullToolName, ToolName } from './types/cornerstoneTools';

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
  if (!store.mainImageContainer) {
    return;
  }

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
    toIdx: Math.max(store.imageIds.length - 1, 0),
    isComputingGrids: false,
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
  if (!store.mainImageContainer) {
    return null;
  }
  try {
    return cornerstone.getImage(store.mainImageContainer);
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

  if (!store.mainImageContainer) {
    return;
  }

  const gridTool: GridTool = cornerstoneTools.getToolForElement(store.mainImageContainer, 'Grid') as GridTool;
  gridTool.clearAllStates();
};

/**
 * Set cornerstone's tool to an active state
 */
export const activateTool = (toolName: string, toolOptions: object): void => {
  if (!store.mainImageContainer) {
    return;
  }
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
  if (!store.mainImageContainer) {
    return;
  }
  cornerstoneTools.setToolEnabledForElement(store.mainImageContainer, toolName);
  store.activeTool = null;
};

/**
 * Register and enable tool given by |toolName| param
 */
export const registerTool = (toolName: ToolName): void => {
  if (!store.mainImageContainer) {
    return;
  }
  const fullToolName = toolName + 'Tool' as FullToolName;
  const tool = cornerstoneTools[fullToolName];
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
  cornerstoneTools.removeTool(toolName);
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
  if (!store.mainImageContainer) {
    return null;
  }
  const gridTool = cornerstoneTools.getToolForElement(store.mainImageContainer, 'Grid') as GridTool;
  return gridTool ?? null;
}

/**
 * Start looping images in the main container
 */
export const startLoopingImages = ({ fromIdx = store.animation.fromIdx, toIdx = store.animation.toIdx, loop = true }: { fromIdx?: number, toIdx?: number, loop?: boolean } = {}): void => {
  if (!store.mainImageContainer) {
    return;
  }
  store.isLoopingImages = true;
  cornerstoneTools.playClip(store.mainImageContainer, store.animation.speed, { fromIdx, toIdx, loop });
};

/**
 * Stop looping images in the main container
 */
export const stopLoopingImages = (): void => {
  if (!store.mainImageContainer) {
    return;
  }
  cornerstoneTools.stopClip(store.mainImageContainer);
  store.isLoopingImages = false;
};

/**
 * Set brightness of main image container
 */
export const setBrightness = (scalar: number): void => {
  if (!store.mainImageContainer) {
    return;
  }
  const viewport = cornerstone.getViewport(store.mainImageContainer);
  if (viewport) {
    viewport.voi.windowCenter -= scalar;
    cornerstone.setViewport(store.mainImageContainer, viewport);
  }
};

/**
 * Set contrast of main image container
 */
export const setContrast = (scalar: number): void => {
  if (!store.mainImageContainer) {
    return;
  }
  const viewport = cornerstone.getViewport(store.mainImageContainer);
  if (viewport) {
    viewport.voi.windowWidth -= scalar;
    cornerstone.setViewport(store.mainImageContainer, viewport);
  }
};

/**
 * Set zoom of main image container by |zoomFactorChange|
 */
export const setZoom = (zoomFactorChange: number): void => {
  if (!store.mainImageContainer) {
    return;
  }
  const viewport = cornerstone.getViewport(store.mainImageContainer);

  if (viewport) {
    const pow = 1.7;
    const oldFactor = Math.log(viewport.scale) / Math.log(pow);
    const factor = oldFactor + zoomFactorChange;

    viewport.scale = Math.pow(pow, factor);

    cornerstone.setViewport(store.mainImageContainer, viewport);
  }
};

export const getImageData = (imageIndex: number): Dicom.Image => {
  return cornerstone.imageCache.cachedImages[imageIndex].image.data;
}
