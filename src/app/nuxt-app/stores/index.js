import { defineStore } from 'pinia';

//import cornerstone from "cornerstone-core";
//window.cornerstone = cornerstone; // todo: remove once we do not need it
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
                speed: 50, // in ms
                fromIdx: 0, // image idx
                toIdx: 0, // image idx
            },
            isLoopingImages: false,
            mainImageContainer: null,
            imageIds: [],
            shownImageId: null,
            toolNames: [],
        };
    },
    actions: {
        /**
         * Load images from given |files| and show the first one in a main window
         * @param {File[]} imageFiles
         * @returns {Promise<void>}
         */
        async loadImagesFromFiles(imageFiles) {
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

            cornerstoneTools.addStackStateManager(this.mainImageContainer, ['stack']);
            cornerstoneTools.addToolState(this.mainImageContainer, 'stack', stack);

            // Set default animation settings
            this.animation = {
                speed: 50,
                fromIdx: 0,
                toIdx: Math.max( this.imageIds.length - 1, 0),
            }

            // Display first image in main window
            this.shownImageId = this.imageIds[0] ?? null;
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
            // todo: deactivate another tools
            cornerstoneTools.setToolActiveForElement(this.mainImageContainer, toolName, toolOptions);
        },
        registerTool(toolName) {
            const tool = cornerstoneTools[`${toolName}`];
            cornerstoneTools.addToolForElement(this.mainImageContainer, tool);
        },
        unregisterTool(toolName) {
            const tool = cornerstoneTools[`${toolName}`];
            cornerstoneTools.removeTool(tool);
        },
        registerAllTools() {
            for (const toolName of this.toolNames) {
                this.registerTool(toolName);
            }
        },
        unregisterAllTools() {
            for (const toolName of this.toolNames) {
                this.unregisterTool(toolName);
            }
        },
    },
});
