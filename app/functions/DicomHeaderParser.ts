import { getImage } from '~/functions/Cornerstone'

/**
 * Class responsible for parsing various DICOM headers from shown image
 */
class DicomHeaderParser {
  /**
   * Retrieve modality from image's DICOM header
   */
  getModality (): string|null {
    const image = getImage()
    return image?.data.string('x00080060') ?? null;
  }

  /**
   * Retrieve patient's name from image's DICOM header
   */
  getPatientName (): string|null {
    const image = getImage()
    return image?.data.string('x00100010') ?? null;
  }

  /**
   * Retrieve series number from image's DICOM header
   */
  getSeriesNumber (): string|null {
    const image = getImage()
    return image?.data.string('x00200011') ?? null;
  }

  /**
   * Retrieve width from image's DICOM header
   */
  getWindowWidth (): number|null {
    const image = getImage()
    return image?.width ?? null
  }

  /**
   * Retrieve height from image's DICOM header
   */
  getWindowHeight (): number|null {
    const image = getImage()
    return image?.rows ?? null;
  }
}

export default DicomHeaderParser
