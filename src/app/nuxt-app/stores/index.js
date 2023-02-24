import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: () => {
        return {
            algorithm: {
                curvature: 0.0015,
                force: 0.5,
                stopTime: 0.150,
            },
            animation: {
                speed: 30, // in fps
                fromIdx: 0, // image idx
                toIdx: 0, // image idx
            },
            /**
             * @type {boolean}
             */
            isLoopingImages: false,
            /**
             * @type {HTMLElement}
             */
            mainImageContainer: null,
            /**
             * @type {Array<string>}
             */
            imageIds: [],
            /**
             * @type {string|null}
             */
            shownImageId: null,
            /**
             * @type {string|null}
             */
            activeTool: null,
            /**
             * @type {Array<string>}
             */
            tools: [],
            /**
             * @type {DicomHeaderParser}
             */
            dicomHeaderParser: null,
            /**
             * @type {GridState}
             */
            gridState: null,
        };
    },
    getters: {
        hasImageDefinedGrid(state) {
            return state.gridState?.hasGrid() ?? false;
        },
    },
});
