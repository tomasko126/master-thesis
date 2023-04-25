/**
 * Usually I would declare any business logic contained in this file as a Pinia action,
 * however Cornerstone library does not like to be imported multiple times from different Vue components.
 * Thus, any Cornerstone-related logic has been put to one single file with all methods exported individually.
 * Side effect benefit of this implementation is that it supports tree-shaking by default, so the app bundle
 * footprint can be smaller.
 */

import cornerstone from 'cornerstone-core'
import cornerstoneMath from 'cornerstone-math'
import dicomParser from 'dicom-parser'
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import Hammer from 'hammerjs'

import { VaFile } from 'vuestic-ui'
import cornerstoneTools from '@tarotoma/cornerstone-tools'

import { useGlobalStore } from '~/stores'

/**
 * Initialize cornerstone libraries
 */
export const initLibraries = (): void => {
  // Setup all required cornerstone-tools dependencies
  cornerstoneTools.external.cornerstone = cornerstone
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath
  cornerstoneTools.external.Hammer = Hammer
  cornerstoneTools.init({
    mouseEnabled: true,
    showSVGCursors: false
  })

  // Setup all required cornerstone-wado-image-loader dependencies
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser

  cornerstoneWADOImageLoader.configure({
    useWebWorkers: true,
    decodeConfig: {
      convertFloatPixelDataToInt: false
    }
  })

  const config = {
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: false,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: true,
        strict: false
      }
    }
  }

  cornerstoneWADOImageLoader.webWorkerManager.initialize(config)
}

/**
 * Load images from given |imageFiles| and show the first one in a main window
 * @returns {Promise<boolean>} - true, if all files have been successfully loaded
 */
export const loadImagesFromFiles = async (imageFiles: VaFile[]|[]): Promise<boolean|null> => {
  const store = useGlobalStore()

  if (!store.mainImageContainer) {
    return null
  }

  // Purge existing cached and stored data
  removeImages()

  // Retrieve image IDs used for referencing images
  const imageIds = []
  let processedAllImages = true

  for (const imageFile of imageFiles) {
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(imageFile)
    try {
      await cornerstone.loadAndCacheImage(imageId)
      imageIds.push(imageId)
    } catch (e) {
      // In most cases, method above fails when an image is either corrupted,
      // invalid, or not in a DICOM format.
      // Thus, we just skip processing this file at all.
      console.warn(e)
      processedAllImages = false
    }
  }
  store.imageIds = imageIds

  // Set image stack
  const stack = {
    currentImageIdIndex: 0,
    imageIds: store.imageIds
  }

  // We have to reset enabled element
  cornerstone.disable(store.mainImageContainer)
  cornerstone.enable(store.mainImageContainer)

  // Add stack state manager for stack and playClip tools
  cornerstoneTools.addStackStateManager(store.mainImageContainer, ['stack', 'playClip'])
  cornerstoneTools.addToolState(store.mainImageContainer, 'stack', stack)

  // Set default animation settings
  store.animation = {
    speed: 30,
    fromIdx: 0,
    toIdx: Math.max(store.imageIds.length - 1, 0)
  }

  return processedAllImages
}

/**
 * Display an image specified by |imageId| in the |element|
 */
export const displayImageInElement = async (element: HTMLElement, imageId: string): Promise<void> => {
  if (!imageId) {
    return
  }
  const image = await cornerstone.loadAndCacheImage(imageId)
  cornerstone.displayImage(element, image)
}

/**
 * Retrieve shown image
 */
export const getImage = (): cornerstone.Image|null => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return null
  }
  try {
    return cornerstone.getImage(store.mainImageContainer)
  } catch (e) {
    return null
  }
}

/**
 * Remove all loaded images
 */
export const removeImages = (): void => {
  const store = useGlobalStore()
  store.imageIds = []
  store.shownImageId = null
  store.gridState = null
  store.dicomHeaderParser = null
  cornerstone.imageCache.purgeCache()

  if (!store.mainImageContainer) {
    return
  }

  const gridTool: cornerstoneTools.GridTool = cornerstoneTools.getToolForElement(store.mainImageContainer, 'Grid') as cornerstoneTools.GridTool
  gridTool.clearAllStates()
}

/**
 * Set cornerstone's tool to an active state
 */
export const activateTool = (toolName: string, toolOptions: object): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  if (store.activeTool) {
    // Deactivate another active tool
    deactivateTool(toolName)
  }
  cornerstoneTools.setToolActiveForElement(store.mainImageContainer, toolName, toolOptions)
  store.activeTool = toolName
}

/**
 * Activates wheel tool used for scrolling between different images
 */
export const activateWheelTool = () => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  cornerstoneTools.setToolActiveForElement(store.mainImageContainer, 'StackScrollMouseWheel', {})
}

/**
 * Deactivate tool by setting its state to 'passive'
 */
export const deactivateTool = (toolName: string): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  cornerstoneTools.setToolPassiveForElement(store.mainImageContainer, toolName)
  store.activeTool = null
}

/**
 * Disable tool by setting its state to 'disabled'
 */
export const disableTool = (toolName: string): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  cornerstoneTools.setToolDisabledForElement(store.mainImageContainer, toolName)
  store.activeTool = null
}

/**
 * Register and enable tool given by |toolName| param
 */
export const registerTool = (toolName: cornerstoneTools.ToolName): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  const fullToolName = toolName + 'Tool' as cornerstoneTools.FullToolName
  const tool = cornerstoneTools[fullToolName]
  cornerstoneTools.addToolForElement(store.mainImageContainer, tool)
  cornerstoneTools.setToolEnabledForElement(store.mainImageContainer, toolName)
}

/**
 * Register all tools
 */
export const registerAllTools = (): void => {
  const store = useGlobalStore()
  for (const toolName of [...store.tools, 'StackScrollMouseWheel' as cornerstoneTools.ToolName]) {
    registerTool(toolName)
  }
}

/**
 * Unregister a tool
 */
export const unregisterTool = (toolName: string): void => {
  cornerstoneTools.removeTool(toolName)
}

/**
 * Unregister all tools
 */
export const unregisterAllTools = (): void => {
  const store = useGlobalStore()
  for (const toolName of store.tools) {
    unregisterTool(toolName)
  }
}

/**
 * Register image container in order to show DICOM images in it
 */
export const registerImageContainer = (element: HTMLElement, isMainImageContainer = false): void => {
  cornerstone.enable(element)
  if (isMainImageContainer) {
    const store = useGlobalStore()
    store.mainImageContainer = element
  }
}

/**
 * Unregister image container
 */
export const unregisterImageContainer = (element: HTMLElement, isMainImageContainer = false): void => {
  cornerstone.disable(element)
  if (isMainImageContainer) {
    const store = useGlobalStore()
    store.mainImageContainer = null
  }
}

/**
 * Retrieve GridTool instance
 */
export const getGridTool = (): cornerstoneTools.GridTool|null => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return null
  }
  const gridTool = cornerstoneTools.getToolForElement(store.mainImageContainer, 'Grid') as cornerstoneTools.GridTool
  return gridTool ?? null
}

/**
 * Start looping images in the main container
 */
export const startLoopingImages = ({ fromIdx = undefined, toIdx = undefined, loop = true }: { fromIdx?: number, toIdx?: number, loop?: boolean } = {}): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  if (fromIdx === null || fromIdx === undefined) {
    fromIdx = store.animation.fromIdx
  }
  if (toIdx === null || toIdx === undefined) {
    toIdx = store.animation.toIdx
  }
  store.isLoopingImages = true
  cornerstoneTools.playClip(store.mainImageContainer, store.animation.speed, { fromIdx, toIdx, loop })
}

/**
 * Stop looping images in the main container
 */
export const stopLoopingImages = (): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  cornerstoneTools.stopClip(store.mainImageContainer)
  store.isLoopingImages = false
}

/**
 * Set brightness of main image container
 */
export const setBrightness = (scalar: number): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  const viewport = cornerstone.getViewport(store.mainImageContainer)
  if (viewport) {
    viewport.voi.windowCenter -= scalar
    cornerstone.setViewport(store.mainImageContainer, viewport)
  }
}

/**
 * Set contrast of main image container
 */
export const setContrast = (scalar: number): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  const viewport = cornerstone.getViewport(store.mainImageContainer)
  if (viewport) {
    viewport.voi.windowWidth -= scalar
    cornerstone.setViewport(store.mainImageContainer, viewport)
  }
}

/**
 * Set zoom of main image container by |zoomFactorChange|
 */
export const setZoom = (zoomFactorChange: number): void => {
  const store = useGlobalStore()
  if (!store.mainImageContainer) {
    return
  }
  const viewport = cornerstone.getViewport(store.mainImageContainer)

  if (viewport) {
    const pow = 1.7
    const oldFactor = Math.log(viewport.scale) / Math.log(pow)
    const factor = oldFactor + zoomFactorChange

    viewport.scale = Math.pow(pow, factor)

    cornerstone.setViewport(store.mainImageContainer, viewport)
  }
}

export const getImageData = (imageIndex: number): Dicom.Image => {
  return cornerstone.imageCache.cachedImages[imageIndex].image.data
}
