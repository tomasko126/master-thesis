import { defineStore } from 'pinia';

import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';

import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

import { sleep } from '~/functions/utils';

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
            imageContainers: [],
            mainImageContainer: null,
            imageIds: [],
            lastImageId: null,
            toolNames: [],
        };
    },
    actions: {
        async initLibraries() {
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
        },
        /**
         * Load images from given |files| and show the first in a main window
         * @param {File[]} imageFiles
         * @returns {Promise<void>}
         */
        async loadImagesFromFiles(imageFiles) {
            // Register main image container
            this.registerImageContainer(document.getElementById('dicom-image'), true);

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
            cornerstoneTools.addStackStateManager(this.mainImageContainer, ['stack']);
            cornerstoneTools.addToolState(this.mainImageContainer, 'stack', stack);

            // Display first image in main window
            await this.displayImageInMainWindow(this.imageIds[0]);

            // Set default animation settings
            this.setDefaultAnimationSettings();
        },
        /**
         * Display image in a given element
         * @param {HTMLElement} imageContainer
         * @param {string} imageId
         * @returns {Promise<void>}
         */
        async displayImageInElement(imageContainer, imageId) {
            const image = await cornerstone.loadAndCacheImage(imageId);
            cornerstone.displayImage(imageContainer, image);
            this.lastImageId = imageId;
        },
        /**
         * Display image in main window
         * @param {string} imageId
         * @returns {Promise<void>}
         */
        async displayImageInMainWindow(imageId) {
            const image = await cornerstone.loadAndCacheImage(imageId);
            cornerstone.displayImage(this.mainImageContainer, image);
            this.lastImageId = imageId;
        },
        /**
         * Register image container
         * @param {HTMLElement} imageContainer
         * @param {boolean} isMainImageContainer
         */
        registerImageContainer(imageContainer, isMainImageContainer = false) {
            if (!this.imageContainers.includes(imageContainer)) {
                cornerstone.enable(imageContainer);
                this.imageContainers.push(imageContainer);
                if (isMainImageContainer) {
                    this.mainImageContainer = imageContainer;
                }
            }
        },
        /**
         * Unregister image container
         * @param {HTMLElement} imageContainer
         * @param {boolean} isMainImageContainer
         */
        unregisterImageContainer(imageContainer, isMainImageContainer = false) {
            const imageFileIdx = this.imageContainers.indexOf(imageContainer);
            if (imageFileIdx > -1) {
                cornerstone.disable(imageContainer);
                this.imageContainers.splice(imageFileIdx, 1);
                if (isMainImageContainer) {
                    this.mainImageContainer = null;
                }
            }
        },
        addTool(toolName) {
          this.toolNames.push(toolName);
        },
        /**
         * @param {string} toolName
         * @param {Object} toolOptions
         */
        activateTool(toolName, toolOptions = {}) {
            // todo: deactivate another tools
            cornerstoneTools.setToolActive(toolName, toolOptions);
        },
        registerTool(toolName) {
            const tool = cornerstoneTools[`${toolName}`];
            if (!tool) {
                throw new Error(`Tool ${toolName} does not exist!`);
            }
            cornerstoneTools.addTool(tool);
        },
        registerAllTools() {
            for (const toolName of this.toolNames) {
                this.registerTool(toolName);
            }
        },
        /**
         * Start looping selected images in the main window
         * todo: when idx are updated, it is not reflected in the video sequence, bug when max idx is less than min
         * @returns {Promise<void>}
         */
        async startLoopingImages() {
            this.isLoopingImages = true;

            const leftImageIds = this.imageIds.slice(this.imageIds.indexOf(this.lastImageId), this.animation.toIdx + 1);
            for (const imageId of leftImageIds) {
                if (!this.isLoopingImages) {
                    return;
                }
                await this.displayImageInMainWindow(imageId);
                if (!this.isLoopingImages) {
                    return;
                }
                await sleep(this.animation.speed);
            }

            const allSelectedImages = this.imageIds.slice(this.animation.fromIdx, this.animation.toIdx + 1);
            while (this.isLoopingImages) {
                for (const imageId of allSelectedImages) {
                    if (!this.isLoopingImages) {
                        return;
                    }
                    await this.displayImageInMainWindow(imageId);
                    if (!this.isLoopingImages) {
                        return;
                    }
                    await sleep(this.animation.speed);
                }
            }
        },
        stopLoopingImages() {
            this.isLoopingImages = false;
        },
        setDefaultAnimationSettings() {
            this.animation = {
                speed: 50,
                fromIdx: 0,
                toIdx: this.imageIds.length - 1,
            }
        },
        updateBrightness(newValue) {
            const viewport = cornerstone.getViewport(this.mainImageContainer);
            viewport.voi.windowCenter = newValue;
            cornerstone.setViewport(this.mainImageContainer, viewport);
        },
        updateContrast(newValue) {
            const viewport = cornerstone.getViewport(this.mainImageContainer);
            viewport.voi.windowWidth = newValue;
            cornerstone.setViewport(this.mainImageContainer, viewport);
        },
    },
});
