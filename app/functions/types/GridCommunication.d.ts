export namespace GridCommunication {
  export interface Image {
    imageId: string;
    imageData: string;
  }

  export namespace Request {
    import compactPrimaryLine = cornerstoneTools.GridToolOptions.compactPrimaryLine;

    export interface AlgorithmOptions {
      curvature: number;
      force: number;
      stopTime: number;
    }

    export interface Grid {
      includesRefinementPoints: boolean;
      primaryLines: compactPrimaryLine[]|[];
    }

    export interface BodyData {
      image: Image;
      grid: Grid;
    }

    export interface Body {
      data: BodyData[];
      options: AlgorithmOptions;
    }
  }

  export namespace Response {
    import compactPrimaryLine = cornerstoneTools.GridToolOptions.compactPrimaryLine;

    export interface Grid {
      imageId: string;
      includesRefinementPoints: boolean;
      primaryLines: compactPrimaryLine[];
    }

    export interface BodyData {
      grids: Grid[];
    }
  }
}
