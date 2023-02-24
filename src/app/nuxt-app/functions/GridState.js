import { MOVING_MODE } from './enums/GridEnums.js';

/**
 * Class responsible for grid's config/state retrieval
 */
class GridState {
    config = null;
    state = null;
    tool = null;

    /**
     * @param {GridTool} tool - GridTool instance defined in the cornerstoneTools lib
     */
    constructor(tool) {
        const { config, state } = tool.getToolsStateAndConfig();
        this.config = config;
        this.state = state;
        this.tool = tool;
    }

    /**
     * Find out, whether grid has been defined for shown image
     * @returns {boolean}
     */
    hasGrid() {
        return !!this.state.length;
    }

    /**
     * Retrieve grid's moving mode
     * @returns {string|null}
     */
    getMovingMode() {
        if (!this.hasGrid()) {
            return null;
        }

        return this.config.moveOneHandleOnly ? MOVING_MODE.POINT : MOVING_MODE.GRID;
    }

    /**
     * Retrieve grid's angle
     * @returns {number}
     */
    getAngle() {
        return this.tool.angle;
    }

    /**
     * Retrieve grid's X offset
     * @returns {number|null}
     */
    getOffsetX() {
        if (!this.hasGrid()) {
            return null;
        }
        return this.state[0].handles.points[0].x;
    }

    /**
     * Retrieve grid's Y offset
     * @returns {number|null}
     */
    getOffsetY() {
        if (!this.hasGrid()) {
            return null;
        }
        return this.state[0].handles.points[0].y;
    }

    /**
     * Retrieve grid's number of primary lines
     * @returns {number}
     */
    getNoOfPrimaryLines() {
        return this.tool.noOfPrimaryLines;
    }

    /**
     * Retrieve grid's number of secondary lines
     * @returns {number}
     */
    getNoOfSecondaryLines() {
        return this.tool.noOfSecondaryLines;
    }

    /**
     * Retrieve grid's spacing between points
     * @returns {number|null}
     */
    getSpacing() {
        if (!this.hasGrid()) {
            return null;
        }
        return this.tool.spacing;
    }

    /**
     * Find out, if we are showing refinement points or not
     * @returns {boolean|null}
     */
    isShowingRefinementPoints() {
        if (!this.hasGrid()) {
            return null;
        }
        return this.config.showRefinementPoints;
    }
}

export default GridState;
