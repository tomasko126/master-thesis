import { GridTool } from '~/functions/types/GridTool';

/**
 * Empty interface for declaring all cornerstone tools
 */
export declare interface ApiTool {}

/**
 * Used cornerstone tools in the app
 */
export declare type ToolName = 'Grid' | 'Pan';

/**
 * Full names of cornerstone tool in the app
 */
export declare type FullToolName = 'GridTool' | 'PanTool';

export declare module '@tarotoma/cornerstone-tools' {
  export class cornerstoneTools {
    /**
     * Grid tool reference
     */
    static GridTool: ApiTool;

    /**
     * Pan tool reference
     */
    static PanTool: ApiTool;

    /**
     * Object holding references to other libraries required to be used with cornerstoneTools.
     */
    static external: { cornerstone: object | null; cornerstoneMath: object | null; Hammer: object | null };

    /**
     * Adds a cornerstoneTools tool to an enabled element.
     */
    static addToolForElement(element: HTMLElement, ApiTool: ApiTool, props?: Object): void;

    /**
     * Returns the tool instance attached to the element.
     */
    static getToolForElement(element: HTMLElement, name: string): GridTool|object;

    /**
     * Sets a tool's state, with the provided toolName and element, to 'active' state.
     * Active tools are rendered, respond to user input, and can create new data.
     */
    static setToolActiveForElement(element: HTMLElement, toolName: string, toolOptions: object): void;

    /**
     * Sets a tool's state, with the provided toolName and element, to 'enabled' state.
     * Enabled tools are rendered, but do not respond to user input.
     */
    static setToolEnabledForElement(element: HTMLElement, toolName: string, options?: Object|number): void;

    /**
     * Sets a tool's state, with the provided toolName and element, to 'disabled'.
     * Disabled tools are not rendered, and do not respond to user input
     */
    static setToolDisabledForElement(element: HTMLElement, toolName: string): void;

    /**
     * Removes all tools from all enabled elements with the provided name.
     */
    static removeTool(toolName: string): void;

    /**
     * Initializes a cornerstoneTools library.
     * This method must be called before using the library.
     */
    static init(param: { showSVGCursors?: boolean; mouseEnabled?: boolean, touchEnabled?: boolean, globalToolSyncEnabled?: boolean }): void;

    /**
     * A Stack specific tool state management strategy.
     * Adding it to an element means that tool data (from specified toolNames) is shared between all imageIds in a given stack.
     */
    static addStackStateManager(element: HTMLElement, toolNames: string[]): void;

    /**
     * Adds tool state to the toolStateManager,
     * this is done by tools as well as modules that restore saved state.
     */
    static addToolState(element: HTMLElement, toolName: string, measurementData: object): void;

    /**
     * Starts playing a clip or adjusts the frame rate of an already playing clip.
     * A negative framesPerSecond will play the clip in reverse.
     * The element must be a stack of images.
     */
    static playClip(element: HTMLElement, framesPerSecond = 30, options: { fromIdx: number, toIdx: number, loop: boolean }): void;

    /**
     * Stops an already playing clip.
     */
    static stopClip(element: HTMLElement): void;
  }
}
