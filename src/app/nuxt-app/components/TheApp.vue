<template>
  <main>
    <section class="grid-section">
      <TheTopPanel class="top-panel" />
      <TheLeftPanel class="left-panel" />
      <TheMainWindow class="main-window" />
      <TheRightPanel class="right-panel" />
    </section>
  </main>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

/* global cornerstone, cornerstoneTools, cornerstoneMath, cornerstoneWADOImageLoader, dicomParser, Hammer */

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  async mounted() {
    await this.initLibraries();
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
@use "assets/global";
.grid-section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  .top-panel {
    grid-column: 1 / 6;
    grid-row: 1;
  }

  .left-panel {
    grid-column: 1;
    grid-row: 2 / 4;
  }

  .main-window {
    grid-column: 2 / 5;
    grid-row: 2 / 4;
  }

  .right-panel {
    grid-column: 5;
    grid-row: 2 / 4;
  }
}
</style>
