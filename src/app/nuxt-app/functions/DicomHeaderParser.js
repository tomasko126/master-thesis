/* global cornerstone */

import { useGlobalStore } from '~/stores';
const store = useGlobalStore();

/**
 * Class responsible for parsing various DICOM headers from shown image
 * @hideconstructor
 */
class DicomHeaderParser {
    /**
     * Retrieve shown image
     * @returns {Image|null}
     */
    #getImage() {
        try {
            return cornerstone.getImage(store.mainImageContainer);
        } catch (e) {
            return null;
        }
    }

    /**
     * Retrieve modality from image's DICOM header
     * @returns {string|null}
     */
    getModality() {
        const image = this.#getImage();
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
        const image = this.#getImage();
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
        const image = this.#getImage();
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
        const image = this.#getImage();
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
        const image = this.#getImage();
        if (!image) {
            return null;
        }
        return image.rows;
    }
}

export default DicomHeaderParser;
