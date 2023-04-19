import cryptoRandomString from 'crypto-random-string';

/**
 * Class responsible for anonymizing various DICOM tag values.
 * This class shall be used before any DICOM data is being sent to the server.
 */
class DicomAnonymizer {
  dicomImage: Dicom.Image;

  constructor(dicomImage: Dicom.Image) {
    this.dicomImage = dicomImage;
  }

  /**
   * Generates a crypto-safe string with specified length
   */
  static #generateRandomString(length: number): string {
    return cryptoRandomString({ length, type: 'url-safe' });
  }

  /**
   * Tags we want to anonymize.
   * For more info, take a look at https://www.dicomlibrary.com/dicom/dicom-tags/
   */
  getTagsToAnonymize(): Set<string> {
    return new Set(Object.keys(this.dicomImage.elements).filter((val) => val.startsWith('x0008') || val.startsWith('x0010')));
  }

  /**
   * Anonymize tags of given DICOM image.
   * Returns copy of DICOM image.
   */
  getAnonymizedImage(): Uint8Array {
    const byteArrayCopy = structuredClone(this.dicomImage.byteArray);

    for (const tagName of this.getTagsToAnonymize().keys()) {
      const element = this.dicomImage.elements[tagName];
      if (element === undefined) {
        continue;
      }
      const randomString = DicomAnonymizer.#generateRandomString(element.length);
      for (let idx = 0; idx < element.length; idx++) {
        byteArrayCopy[element.dataOffset + idx] = randomString.charCodeAt(idx);
      }
    }

    return byteArrayCopy;
  }
}

export default DicomAnonymizer;
