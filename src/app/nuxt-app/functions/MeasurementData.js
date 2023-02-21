class MeasurementData {
    /**
     * @param {GridTool} tool - grid tool's instance
     */
    constructor(tool) {
        const { config, state } = tool.getToolsStateAndConfig();
        this.config = config;
        this.state = state;
        this.tool = tool;
    }

    hasGrid() {
        return this.state.length;
    }

    getMoveMode() {
        if (!this.hasGrid()) {
            return null;
        }

        const isMovingOneHandleOnly = this.config.moveOneHandleOnly;

        return isMovingOneHandleOnly ? 'point' : 'grid'; // todo: extract to consts
    }

    getAngle() {
        return this.tool.angle;
    }

    getGridOffsetX() {
        if (!this.hasGrid()) {
            return null;
        }
        return this.state[0].handles.points[0].x;
    }

    getGridOffsetY() {
        if (!this.hasGrid()) {
            return null;
        }
        return this.state[0].handles.points[0].y;
    }

    getNoOfGridPrimaryLines() {
        return this.tool.noOfPrimaryLines;
    }

    getNoOfGridSecondaryLines() {
        return this.tool.noOfSecondaryLines;
    }

    getGridSpacing() {
        if (!this.hasGrid()) {
            return null;
        }
        return this.tool.spacing;
    }
}

export default MeasurementData;
