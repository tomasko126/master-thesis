import { defineStore } from 'pinia';

// import cornerstone from "cornerstone-core";
// window.cornerstone = cornerstone; // todo: remove once we do not need it
// import cornerstoneMath from 'cornerstone-math';
// import 'cornerstone-tools';
// import Hammer from 'hammerjs';

// import dicomParser from 'dicom-parser';
// import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

/* global cornerstone, cornerstoneTools, cornerstoneWADOImageLoader*/

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: () => {
        return {
            animation: {
                speed: 30, // in fps
                fromIdx: 0, // image idx
                toIdx: 0, // image idx
            },
            isLoopingImages: false,
            mainImageContainer: null,
            measurementData: null,
            imageIds: [],
            shownImageId: null,
            activeTool: null,
            tools: [],
        };
    },
    getters: {
        hasImageDefinedGrid(state) {
            return state.measurementData?.hasGrid() ?? false;
        },
    },
    actions: {
        /**
         * Load images from given |files| and show the first one in a main window
         * @param {File[]} imageFiles
         * @returns {Promise<void>}
         */
        async loadImagesFromFiles(imageFiles) {
            // Purge existing cache
            cornerstone.imageCache.purgeCache();

            // Retrieve image IDs used for referencing images
            const imageIds = [];
            for (const imageFile of imageFiles) {
                imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(imageFile));
            }
            this.imageIds = imageIds;

            // Set image stack
            const stack = {
                currentImageIdIndex: 0,
                imageIds: this.imageIds,
            };

            // We have to reset enabled element
            cornerstone.disable(this.mainImageContainer);
            cornerstone.enable(this.mainImageContainer);

            cornerstoneTools.addStackStateManager(this.mainImageContainer, ['stack', 'playClip']);
            cornerstoneTools.addToolState(this.mainImageContainer, 'stack', stack);

            // Set default animation settings
            this.animation = {
                speed: 30,
                fromIdx: 0,
                toIdx: Math.max( this.imageIds.length - 1, 0),
            }
        },
        /**
         * Register image container
         * @param {HTMLElement} element
         * @param {boolean} isMainImageContainer
         */
        registerImageContainer(element, isMainImageContainer = false) {
            cornerstone.enable(element);
            if (isMainImageContainer) {
                this.mainImageContainer = element;
            }
        },
        /**
         * Unregister image container
         * @param {HTMLElement} element
         * @param {boolean} isMainImageContainer
         */
        unregisterImageContainer(element, isMainImageContainer = false) {
            cornerstone.disable(element);
            if (isMainImageContainer) {
                this.mainImageContainer = null;
            }
        },
        activateTool(toolName, toolOptions = {}) {
            if (this.activeTool) {
                // Deactivate another active tool
                this.deactivateTool(toolName);
            }
            cornerstoneTools.setToolActiveForElement(this.mainImageContainer, toolName, toolOptions);
            this.activeTool = toolName;
        },
        deactivateTool(toolName) {
            cornerstoneTools.setToolEnabledForElement(this.mainImageContainer, toolName);
            this.activeTool = null;
        },
        registerTool(toolName) {
            const tool = cornerstoneTools[`${toolName}Tool`];
            cornerstoneTools.addToolForElement(this.mainImageContainer, tool);
            cornerstoneTools.setToolEnabledForElement(this.mainImageContainer, toolName);
        },
        unregisterTool(toolName) {
            const tool = cornerstoneTools[`${toolName}Tool`];
            cornerstoneTools.removeTool(tool);
        },
        registerAllTools() {
            for (const toolName of this.tools) {
                this.registerTool(toolName);
            }
        },
        unregisterAllTools() {
            for (const toolName of this.tools) {
                this.unregisterTool(toolName);
            }
        },
        async displayImageInElement(element, imageId) {
            if (!imageId) {
                return;
            }
            const image = await cornerstone.loadAndCacheImage(imageId);
            cornerstone.displayImage(element, image);
        },
    },
});
