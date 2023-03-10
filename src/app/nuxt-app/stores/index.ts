import { defineStore } from 'pinia';
import GridState from '~/functions/GridState';
import DicomHeaderParser from '~/functions/DicomHeaderParser';

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: () => {
        return {
            algorithm: {
                curvature: 0.0015,
                force: 0.5,
                stopTime: 0.150,
            } as AlgorithmSettings,
            animation: {
                speed: 30, // in fps
                fromIdx: 0, // image idx
                toIdx: 0, // image idx
            } as AnimationSettings,
            isLoopingImages: false as boolean,
            mainImageContainer: null as HTMLElement|null,
            imageIds: [] as string[],
            shownImageId: null as string|null,
            activeTool: null as string|null,
            tools: [] as string[],
            dicomHeaderParser: null as DicomHeaderParser|null,
            gridState: null as GridState|null,
        };
    },
    getters: {
        hasImageDefinedGrid(state) {
            return state.gridState?.hasGrid() ?? false;
        },
    },
});

interface AlgorithmSettings {
    curvature: number;
    force: number;
    stopTime: number;
}

interface AnimationSettings {
    /**
     * Animation speed in FPS
     */
    speed: number;
    /**
     * Index of an image, from which an animation will start
     */
    fromIdx: number;
    /**
     * Index of an image, to which an animation will loop to
     */
    toIdx: number;
}
