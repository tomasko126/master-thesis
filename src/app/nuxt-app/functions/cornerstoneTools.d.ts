import { GridTool } from '~/functions/types/GridTool';

export declare interface ApiTool {}

export declare type ToolName = 'Grid' | 'Pan';
export declare type FullToolName = 'GridTool' | 'PanTool';

export declare class cornerstoneTools {
  static GridTool: ApiTool;
  static PanTool: ApiTool;
  static external: { cornerstone: object | null; cornerstoneMath: object | null; Hammer: object | null };
  static addToolForElement(element: HTMLElement, ApiTool: ApiTool, props?: Object): void;
  static getToolForElement(element: HTMLElement, name: string): GridTool|object;
  static setToolActiveForElement(element: HTMLElement, toolName: string, toolOptions: object): void;
  static setToolEnabledForElement(element: HTMLElement, toolName: string, options?: Object|number): void;
  static removeTool(toolName: string): void;
  static init(param: { showSVGCursors?: boolean; mouseEnabled?: boolean, touchEnabled?: boolean, globalToolSyncEnabled?: boolean }): void;
  static addStackStateManager(element: HTMLElement, toolNames: string[]): void;
  static addToolState(element: HTMLElement, toolName: string, measurementData: object): void;
  static playClip(element: HTMLElement, framesPerSecond: number, options: { fromIdx: number, toIdx: number, loop: boolean }): void;
  static stopClip(element: HTMLElement): void;
}
