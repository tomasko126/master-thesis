import type GridToolOptions from '~/functions/types/GridTool';
import primaryLine = GridToolOptions.primaryLine;

declare namespace GridCommunication {
  interface Image {
    imageId: string;
    imageData: Uint8Array;
  }

  declare namespace Request {
    interface AlgorithmOptions {
      curvature: number;
      force: number;
      stopTime: number;
    }

    interface Grid {
      includesRefinementPoints: boolean;
      primaryLines: primaryLine[]|[];
    }

    interface BodyData {
      image: Image;
      grid: Grid;
    }

    export interface Body {
      data: BodyData[];
      options: AlgorithmOptions;
    }
  }

  declare namespace Response {
    interface Grid {
      imageId: string;
      includesRefinementPoints: boolean;
      primaryLines: primaryLine[];
    }

    export interface BodyData {
      grids: Grid[];
    }
  }
}
