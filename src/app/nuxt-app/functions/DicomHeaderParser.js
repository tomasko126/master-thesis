import { getImage } from '~/functions/Cornerstone.js';

/**
 * Class responsible for parsing various DICOM headers from shown image
 * @hideconstructor
 */
class DicomHeaderParser {

    /**
     * Retrieve modality from image's DICOM header
     * @returns {string|null}
     */
    getModality() {
        const image = getImage();
        if (!image) {
            return null;
        }
        return image.data.string('x00080060');
    }

    /**
     * Retrieve patient's name from image's DICOM header
     * @returns {string|null}
     */
    getPatientName() {
        const image = getImage();
        if (!image) {
            return null;
        }
        return image.data.string('x00100010');
    }

    /**
     * Retrieve series number from image's DICOM header
     * @returns {string|null}
     */
    getSeriesNumber() {
        const image = getImage();
        if (!image) {
            return null;
        }
        return image.data.string('x00200011');
    }

    /**
     * Retrieve width from image's DICOM header
     * @returns {number|null}
     */
    getWindowWidth() {
        const image = getImage();
        if (!image) {
            return null;
        }
        return image.width;
    }

    /**
     * Retrieve height from image's DICOM header
     * @returns {number|null}
     */
    getWindowHeight() {
        const image = getImage();
        if (!image) {
            return null;
        }
        return image.rows;
    }
}

export default DicomHeaderParser;
