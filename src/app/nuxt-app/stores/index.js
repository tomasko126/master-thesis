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
            isLoopingImages: false,
            init: false,
            imageContainers: [],
            mainImageContainer: null,
            imageIds: [],
            lastImageId: null,
            tools: [],
        };
    },
    actions: {
        async initLibraries() {
            // todo: do not store the reference to cornerstone in the |window| object
            window.cornerstone = cornerstone;
            if (this.init) {
                return;
            }

            // Setup all required cornerstone-tools dependencies
            cornerstoneTools.external.cornerstone = cornerstone;
            cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
            cornerstoneTools.external.Hammer = Hammer;
            cornerstoneTools.init({
                mouseEnabled: true,
                touchEnabled: true,
                showSVGCursors: true,
                globalToolSyncEnabled: true,
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

            this.init = true;
        },
        /**
         * Load images from given |files| and show the first in a main window
         * @param {File[]} imageFiles
         * @param {HTMLElement} imageContainer
         * @returns {Promise<void>}
         */
        async loadImagesFromFiles(imageFiles, imageContainer) {
            // First, we need to register main window as an image container
            this.registerImageContainer(imageContainer, true);

            // Retrieve image IDs used later for referencing images
            const imageIds = [];
            for (const imageFile of imageFiles) {
                imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(imageFile));
            }
            this.imageIds = imageIds;

            try {
                const stack = {
                    currentImageIdIndex: 0,
                    imageIds: this.imageIds,
                };
                cornerstoneTools.addStackStateManager(imageContainer, ['stack']);
                cornerstoneTools.addToolState(imageContainer, 'stack', stack);

                await this.displayImageInElement(imageContainer, this.imageIds[0]);

                // todo: re-registering tools
                for (const tool of this.tools) {
                    cornerstoneTools.addTool(tool);
                }

                // todo: move tools functionality to another place
                // const FreehandRoiTool = cornerstoneTools.FreehandRoiTool;
                // cornerstoneTools.addTool(FreehandRoiTool);
                // cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 });

                // const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
                // cornerstoneTools.addTool(StackScrollMouseWheelTool);
                // cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
            } catch (e) {
                console.error(e);
            }
        },
        /**
         * Display image in a given element
         * @param {HTMLElement} imageContainer
         * @param {string} imageId
         * @returns {Promise<void>}
         */
        async displayImageInElement(imageContainer, imageId) {
            this.registerImageContainer(imageContainer);
            const image = await cornerstone.loadImage(imageId);
            cornerstone.displayImage(imageContainer, image);
            this.lastImageId = imageId;
        },
        /**
         * Display image in main window
         * @param {string} imageId
         * @returns {Promise<void>}
         */
        async displayImageInMainWindow(imageId) {
            const image = await cornerstone.loadImage(imageId);
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
        /**
         * @param {string} toolName
         * @param {Object} toolOptions
         */
        activateTool(toolName, toolOptions = {}) {
            // todo: deactivate another tools
            cornerstoneTools.setToolActive(toolName, toolOptions);
        },
        /**
         *
         * @param {string} toolName
         */
        registerTool(toolName) {
            const tool = cornerstoneTools[`${toolName}`];
            if (!tool) {
                throw new Error(`Tool ${toolName} does not exist!`);
            }
            // Pushing tool to the queue so it can get registered
            this.tools.push(tool); // todo: do I need this?
            cornerstoneTools.addTool(tool);
        },
        /**
         * Start looping all images in the main window
         * @returns {Promise<void>}
         */
        async startLoopingImages() {
            console.log(cornerstoneTools.getToolState(this.mainImageContainer, 'FreehandRoi'));

            // todo: start looping from last opened image
            this.isLoopingImages = true;

            const leftImageIds = this.imageIds.slice(this.imageIds.indexOf(this.lastImageId));
            for (const imageId of leftImageIds) {
                if (!this.isLoopingImages) {
                    return;
                }
                await this.displayImageInMainWindow(imageId);
                await sleep(50); // todo: configurable?
            }

            while (this.isLoopingImages) {
                for (const imageId of this.imageIds) {
                    if (!this.isLoopingImages) {
                        return;
                    }
                    await this.displayImageInMainWindow(imageId);
                    await sleep(50); // todo: configurable?
                }
            }
        },
        stopLoopingImages() {
            this.isLoopingImages = false;
        },
    },
});
