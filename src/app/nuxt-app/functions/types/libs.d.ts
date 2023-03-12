declare module 'hammerjs';
declare module 'cornerstone-math';
declare module 'cornerstone-wado-image-loader';

/**
 * Extend Image interface
 */
declare namespace cornerstone {
  interface Image {
    data: {
      string(value: string): string,
    };
  }
}
