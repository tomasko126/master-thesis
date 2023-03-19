import cryptoRandomString from 'crypto-random-string';

/**
 * Class responsible for anonymizing various DICOM tag values.
 * This class shall be used before any DICOM data is being sent to the server.
 */
class DicomAnonymizer {
  /**
   * Tags we want to anonymize.
   * For more info, take a look at https://www.dicomlibrary.com/dicom/dicom-tags/
   */
  static fieldsToAnonymize = new Set(['x00100010', 'x00100020', 'x00100030', 'x00081030']);

  /**
   * Generates a crypto-safe string with specified length
   */
  static #generateRandomString(length: number): string {
    return cryptoRandomString({ length, type: 'url-safe' });
  }

  /**
   * Anonymize tags of given DICOM image.
   * Returns copy of DICOM image.
   */
  static anonymize(dicomImage: Dicom.Image): Uint8Array {
    const byteArrayCopy = structuredClone(dicomImage.byteArray);

    for (const key of DicomAnonymizer.fieldsToAnonymize.keys()) {
      const element = dicomImage.elements[key];
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
