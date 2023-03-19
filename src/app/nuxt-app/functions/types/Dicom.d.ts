declare namespace Dicom {
  export interface Image {
    byteArray: Uint8Array;
    elements: {
      [tag:string]: Dicom.Tag
    }
    warnings: string[];
  }

  interface Tag {
    tag: string;
    vr: string;
    dataOffset: number;
    length: number;
  }
}
