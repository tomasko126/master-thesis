import { GridToolOptions } from '~/functions/types/GridTool';

declare namespace GridCommunication {
  interface Image {
    imageId: string;
    imageData: string;
  }

  declare namespace Request {
    import compactPrimaryLine = GridToolOptions.compactPrimaryLine;

    interface AlgorithmOptions {
      curvature: number;
      force: number;
      stopTime: number;
    }

    interface Grid {
      includesRefinementPoints: boolean;
      primaryLines: compactPrimaryLine[]|[];
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
    import compactPrimaryLine = GridToolOptions.compactPrimaryLine;

    interface Grid {
      imageId: string;
      includesRefinementPoints: boolean;
      primaryLines: compactPrimaryLine[];
    }

    export interface BodyData {
      grids: Grid[];
    }
  }
}
