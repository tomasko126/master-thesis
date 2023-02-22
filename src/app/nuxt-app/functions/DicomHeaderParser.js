/* global cornerstone */

import { useGlobalStore } from '~/stores';
const store = useGlobalStore();

class DicomHeaderParser {
    getImage() {
        try {
            return cornerstone.getImage(store.mainImageContainer);
        } catch (e) {
            return null;
        }
    }

    getModality() {
        const image = this.getImage();
        if (!image) {
            return null;
        }
        return image.data.string('x00080060');
    }

    getPatientName() {
        const image = this.getImage();
        if (!image) {
            return null;
        }
        return image.data.string('x00100010');
    }

    getSeriesNumber() {
        const image = this.getImage();
        if (!image) {
            return null;
        }
        return image.data.string('x00200011');
    }

    getWindowWidth() {
        const image = this.getImage();
        if (!image) {
            return null;
        }
        return image.width;
    }

    getWindowHeight() {
        const image = this.getImage();
        if (!image) {
            return null;
        }
        return image.rows;
    }
}

export default DicomHeaderParser;
