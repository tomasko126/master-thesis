import getStateAndConfigOutput = GridToolOptions.getStateAndConfigOutput;
import primaryLine = GridToolOptions.primaryLine;

export class GridTool {

  /**
   * Clear all states for all images
   */
  clearAllStates(): void;

  /**
   * Retrieve tool's config along with its state
   */
  getStateAndConfig(): getStateAndConfigOutput;

  /**
   * Find out, if we have grid placed on every image id
   */
  hasGridForImageIds(imageIds: string[]): boolean;

  /**
   * Retrieve grid's angle.
   * If not defined, returns null.
   */
  get angle(): number|null;

  /**
   * Set grid's angle.
   */
  set angle(angle: number): void;

  /**
   * Retrieve grid's number of primary lines.
   * If not defined, returns null.
   */
  get noOfPrimaryLines(): number|null;

  /**
   * Set grid's number of primary lines.
   */
  set noOfPrimaryLines(lines: number): void;

  /**
   * Retrieve grid's number of secondary lines.
   * If not defined, returns null.
   */
  get noOfSecondaryLines(): number|null;

  /**
   * Set grid's number of secondary lines.
   */
  set noOfSecondaryLines(lines: number): void;

  /**
   * Retrieve grid's spacing.
   * If not defined, returns null.
   */
  get spacing(): number|null;

  /**
   * Set grid's spacing
   */
  set spacing(spacing: number): void;

  /**
   * Set grid's offset.
   */
  setOffset(newLocation: { x: number, y: number } = { x: 0, y: 0 }, usingMouseInput: boolean = false): void;

  /**
   * Tell grid, whether to show its refinement points or not.
   */
  set showRefinementPoints(value: boolean): void;

  /**
   * Tell grid, whether to move with one handle or with whole grid at once
   */
  set moveOneHandleOnly(value: boolean): void;

  /**
   * Retrieve primary lines for a given image id
   */
  getStateForImageId(imageId: string): primaryLine[]|null;

  /**
   * Set given primary lines as grid's state for given image ids
   */
  setStateForImageIds(primaryLines: primaryLine[], imageIds: string[], hasRefinementPoints = false): void;

  /**
   * Remove grid from current shown image
   */
  removeGrid(): void;
}

declare namespace GridToolOptions {
  export interface getStateAndConfigOutput {
    config: GridToolConfig,
    state: primaryLine[],
  }

  export interface GridToolConfig {
    currentHandle: number,
    currentTool: number,
    handleRadius: number,
    highlighting: {
      primaryLineIdxInLoop: number,
      secondaryLineIdx: undefined|number,
    },
    moveOneHandleOnly: boolean,
    noOfPrimaryLines: {
      default: number,
    },
    noOfSecondaryLines: {
      default: number,
    },
    spacing: {
      default: number,
    },
    showRefinementPoints: {
      global: boolean,
    },
  }

  export interface primaryLine {
    active: boolean;
    color: string|undefined;
    handles: {
      points: gridPoint[],
    },
    invalidated: boolean;
    uuid: string;
    visible: boolean;
  }

  export interface gridPoint {
    active: boolean;
    highlight: boolean;
    /**
     * Find out, if this point is a common or a refinement point
     */
    isCommonPoint: boolean;

    /**
     * Array of points - between this point and every point in this array, a line will be drawn
     */
    lines: linePoint[],

    /**
     * X coordinate
     */
    x: number;
    /**
     * Y coordinate
     */
    y: number;
  }

  export interface linePoint {
    /**
     * Find out, if this point is a common or a refinement point
     */
    isCommonPoint: boolean;
    /**
     * Primary line idx, on which this point is defined on
     */
    primaryLineIdx: number;
    /**
     * X coordinate
     */
    x: number;
    /**
     * Y coordinate
     */
    y: number;
  }
}
