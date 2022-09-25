import { defineStore } from 'pinia';

import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';

import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: () => {
        return {
            init: false,
            elemActivated: false,
        };
    },
    getters: {
    },
    actions: {
        async initLibraries() {
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
         * Load images from given |files| and show the first one as a content of the |element|
         * @param {File[]} files
         * @param {HTMLElement} element
         * @returns {Promise<void>}
         */
        async loadImagesFromFiles(files, element) {
            if (!this.elemActivated) {
                cornerstone.enable(element);
                this.elemActivated = true;
            }

            const imageIds = [];
            for (const file of files) {
                imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(file));
            }

            try {
                const image = await cornerstone.loadImage(imageIds[0]);
                const stack = {
                    currentImageIdIndex: 0,
                    imageIds,
                };
                cornerstoneTools.addStackStateManager(element, ['stack']);
                cornerstoneTools.addToolState(element, 'stack', stack);
                cornerstone.displayImage(element, image);

                // todo: move this to another place
                const FreehandRoiTool = cornerstoneTools.FreehandRoiTool;
                cornerstoneTools.addTool(FreehandRoiTool);
                cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 });

                const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
                cornerstoneTools.addTool(StackScrollMouseWheelTool);
                cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
            } catch (e) {
                console.error(e);
            }
        },
    },
});
