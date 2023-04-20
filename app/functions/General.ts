import { unref, watch } from 'vue';
import { useGlobalStore } from '~/stores';
import { displayImageInElement, startLoopingImages} from '~/functions/Cornerstone';

/**
 * Refresh grid data for each image by starting an animation.
 */
export const refreshGridData = (): Promise<void> => {
  return new Promise((resolve) => {
    const store = useGlobalStore();

    const shownCurrentImageId = unref(store.shownImageId);
    startLoopingImages({ fromIdx: 0, toIdx: store.imageIds.length - 1, loop: false });

    const unwatch = watch(() => store.isLoopingImages, async (value) => {
      if (!value) {
        await displayImageInElement(store.mainImageContainer as HTMLElement, shownCurrentImageId as string);
        unwatch();
        resolve();
      }
    });
  });
};
