import { unref, watch } from 'vue';
import type { GridCommunication } from '~/functions/types/GridCommunication';
import { displayImageInElement, getImageData, startLoopingImages } from '~/functions/Cornerstone';
import DicomAnonymizer from '~/functions/DicomAnonymizer';
import { useGlobalStore } from '~/stores';
import { Encode } from 'arraybuffer-encoding/base64/standard';

class Communication {
  /**
   * Retrieve image data for given imageIndex
   */
  async getImageData(imageIndex: number): Promise<GridCommunication.Image> {
    const imageData = getImageData(imageIndex);
    const store = useGlobalStore();

    const dicomAnonymizer = new DicomAnonymizer(imageData);

    return {
      imageId: store.imageIds[imageIndex],
      imageData: Encode(dicomAnonymizer.getAnonymizedImage()),
    };
  }

  /**
   * Retrieve grid data for a given imageIndex
   */
  getGridData(imageIndex: number): GridCommunication.Request.Grid {
    const store = useGlobalStore();

    const imageId = store.imageIds[imageIndex];
    const primaryLines = store?.gridState?.tool.getStateForImageId(imageId, true) || [];

    return {
      includesRefinementPoints: store?.gridState?.isShowingRefinementPoints() ?? false,
      primaryLines,
    }
  }

  /**
   * Retrieve algorithm settings
   */
  getAlgorithmOptions(): GridCommunication.Request.AlgorithmOptions {
    const store = useGlobalStore();

    return {
      curvature: store.algorithm.curvature,
      force: store.algorithm.force,
      stopTime: store.algorithm.stopTime,
    };
  }

  /**
   * Build body of /api/grid request.
   * Body of such request contains algorithm options along with
   * image's DICOM data and related grid.
   */
  async buildRequestBody(): Promise<GridCommunication.Request.Body> {
    const body: GridCommunication.Request.Body = {
      data: [],
      options: this.getAlgorithmOptions(),
    };

    const store = useGlobalStore();

    for (let imageIdx = 0; imageIdx < store.imageIds.length; imageIdx++) {
      const serializedData: GridCommunication.Request.BodyData = {
        image: await this.getImageData(imageIdx),
        grid: await this.getGridData(imageIdx),
      };

      body.data.push(serializedData);
    }

    return body;
  }
}

export default Communication;
