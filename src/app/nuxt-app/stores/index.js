import {defineStore, mapActions} from 'pinia';

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
        },
        /**
         * Load images from given |files| and show the first in a main window
         * @param {File[]} imageFiles
         * @returns {Promise<void>}
         */
        async loadImagesFromFiles(imageFiles) {
            this.registerImageContainer(document.getElementById('dicom-image'), true);
            // Retrieve image IDs used later for referencing images
            const imageIds = [];
            for (const imageFile of imageFiles) {
                imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(imageFile));
            }
            this.imageIds = imageIds;

            const stack = {
                currentImageIdIndex: 0,
                imageIds: this.imageIds,
            };
            cornerstoneTools.addStackStateManager(this.mainImageContainer, ['stack']);
            cornerstoneTools.addToolState(this.mainImageContainer, 'stack', stack);

            await this.displayImageInMainWindow(this.imageIds[0]);
        },
        /**
         * Display image in a given element
         * @param {HTMLElement} imageContainer
         * @param {string} imageId
         * @returns {Promise<void>}
         */
        async displayImageInElement(imageContainer, imageId) {
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
                console.log('registering main image container: ', isMainImageContainer);
                cornerstone.enable(imageContainer);
                this.imageContainers.push(imageContainer);
                if (isMainImageContainer) {
                    this.mainImageContainer = imageContainer;
                    for (const toolName of this.toolNames) {
                        this.registerTool(toolName);
                    }
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
                console.log('unregistering image container: ', isMainImageContainer);
                cornerstone.disable(imageContainer);
                this.imageContainers.splice(imageFileIdx, 1);
                if (isMainImageContainer) {
                    this.mainImageContainer = null;
                }
            }
        },
        addTool(toolName) {
          console.log('adding tool: ', toolName);
          this.toolNames.push(toolName);
        },
        /**
         * @param {string} toolName
         * @param {Object} toolOptions
         */
        activateTool(toolName, toolOptions = {}) {
            // todo: deactivate another tools
            this.registerImageContainer(document.getElementById('dicom-image'), true);
            this.registerTool(toolName + 'Tool');
            console.log('activating tool: ', toolName);
            cornerstoneTools.setToolActive(toolName, toolOptions);
        },
        registerTool(toolName) {
            console.log('registering tool: ', toolName, this.mainImageContainer);
            const tool = cornerstoneTools[`${toolName}`];
            if (!tool) {
                throw new Error(`Tool ${toolName} does not exist!`);
            }
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
