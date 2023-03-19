import { getImage } from '~/functions/Cornerstone.js';

/**
 * Class responsible for parsing various DICOM headers from shown image
 */
class DicomHeaderParser {
  /**
   * Retrieve modality from image's DICOM header
   */
  getModality(): string|null {
    const image = getImage();
    if (!image) {
      return null;
    }

    return image.data.string('x00080060');
  }

  /**
   * Retrieve patient's name from image's DICOM header
   */
  getPatientName(): string|null {
    const image = getImage();
    if (!image) {
      return null;
    }
    return image.data.string('x00100010');
  }

  /**
   * Retrieve series number from image's DICOM header
   */
  getSeriesNumber(): string|null {
    const image = getImage();
    if (!image) {
      return null;
    }
    return image.data.string('x00200011');
  }

  /**
   * Retrieve width from image's DICOM header
   */
  getWindowWidth(): number|null {
    const image = getImage();
    if (!image) {
      return null;
    }
    return image.width;
  }

  /**
   * Retrieve height from image's DICOM header
   */
  getWindowHeight(): number|null {
    const image = getImage();
    if (!image) {
      return null;
    }
    return image.rows;
  }
}

export default DicomHeaderParser;
