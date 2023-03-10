import { MOVING_MODE } from './enums/GridEnums';
import { GridTool } from '~/functions/types/GridTool';

/**
 * Class responsible for grid's config/state retrieval
 */
class GridState {
    config;
    state;
    tool;

    constructor(tool: GridTool) {
        const { config, state } = tool.getToolsStateAndConfig();
        this.config = config;
        this.state = state;
        this.tool = tool;
    }

    /**
     * Find out, whether grid has been defined for shown image
     */
    hasGrid(): boolean {
        return !!this.state.length;
    }

    /**
     * Retrieve grid's moving mode
     */
    getMovingMode(): string|null {
        if (!this.hasGrid()) {
            return null;
        }

        return this.config.moveOneHandleOnly ? MOVING_MODE.POINT : MOVING_MODE.GRID;
    }

    /**
     * Retrieve grid's angle
     */
    getAngle(): number|null {
        return this.tool.angle;
    }

    /**
     * Retrieve grid's X offset
     */
    getOffsetX(): number|null {
        if (!this.hasGrid()) {
            return null;
        }
        return this.state[0].handles.points[0].x;
    }

    /**
     * Retrieve grid's Y offset
     */
    getOffsetY(): number|null {
        if (!this.hasGrid()) {
            return null;
        }
        return this.state[0].handles.points[0].y;
    }

    /**
     * Retrieve grid's number of primary lines
     */
    getNoOfPrimaryLines(): number|null {
        return this.tool.noOfPrimaryLines;
    }

    /**
     * Retrieve grid's number of secondary lines
     */
    getNoOfSecondaryLines(): number|null {
        return this.tool.noOfSecondaryLines;
    }

    /**
     * Retrieve grid's spacing between points
     */
    getSpacing(): number|null {
        if (!this.hasGrid()) {
            return null;
        }
        return this.tool.spacing;
    }

    /**
     * Find out, if we are showing refinement points or not
     */
    isShowingRefinementPoints(): boolean|null {
        if (!this.hasGrid()) {
            return null;
        }
        return this.config.showRefinementPoints;
    }
}

export default GridState;