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
