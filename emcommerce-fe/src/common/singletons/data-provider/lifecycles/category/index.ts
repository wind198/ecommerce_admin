import { CreateParams, ResourceCallbacks, UpdateParams } from 'react-admin';
import { fetchBlobFromURL, subtract2List } from '../../../../helpers';
import { axiosClient } from '../../../axios';
import { IHasId, IImage } from '../../../../types';
import { ICreateCategory, IUpdateCategory } from '../../../../../pages/category/types';

export const CategoryLifecycle: ResourceCallbacks = {
  resource: 'category',
  async beforeCreate(params: CreateParams<ICreateCategory>) {
    const {
      data: { icon, images = [], ...otherData },
      ...o
    } = params;
    let iconOutput: IImage | undefined = undefined;
    let imagesOutput: IImage[] = [];
    if (icon) {
      const iconData = await fetchBlobFromURL(icon.src);
      if (iconData) {
        const payload = new FormData();
        payload.append('icon', iconData);
        const {
          data: { src: iconRes },
        } = await axiosClient.post('icon', payload);
        if (iconRes) {
          iconOutput = {
            src: iconRes,
            title: icon.title,
          };
        }
      }
    }
    if (images.length) {
      await Promise.all(
        images.map(async ({ src, title }) => {
          const imgData = await fetchBlobFromURL(src);
          if (imgData) {
            const payload = new FormData();
            payload.append('image', imgData);
            const {
              data: { src: imgRes },
            } = await axiosClient.post('image', payload);
            imagesOutput.push({ src: imgRes, title });
          }
        }),
      );
    }
    return {
      ...o,
      data: {
        ...otherData,
        ...(iconOutput && { icon: iconOutput }),
        ...(imagesOutput.length && { images: imagesOutput }),
      },
    };
  },
  async beforeUpdate(params: UpdateParams<IUpdateCategory & IHasId>) {
    const {
      data: { images = [], icon, ...otherData },
      previousData: { images: prevImages = [], icon: prevIcon },
      ...o
    } = params;

    let iconOutput: IImage | undefined = icon;
    if (icon) {
      if (icon.src !== prevIcon?.src) {
        const iconData = await fetchBlobFromURL(icon.src);
        if (iconData) {
          try {
            const payload = new FormData();
            payload.append('icon', iconData);
            const {
              data: { src: iconRes },
            } = await axiosClient.post('icon', payload);
            iconOutput = { src: iconRes, title: icon.title };
          } catch (error) {
            console.error(error);
          }
        }
      }
    }

    const { newItemGetAdded, itemsKept } = subtract2List(prevImages, images, (i) => i.src);
    const newImageOutput: IImage[] = [...itemsKept];
    if (newItemGetAdded.length) {
      await Promise.allSettled(
        newItemGetAdded.map(async ({ src, title }) => {
          const imgData = await fetchBlobFromURL(src);
          if (imgData) {
            const payload = new FormData();
            payload.append('image', imgData);
            const {
              data: { src: imgRes },
            } = await axiosClient.post('image', payload);
            newImageOutput.push({
              src: imgRes,
              title,
            });
          }
        }),
      );
    }

    return {
      ...o,
      data: { ...otherData, images: newImageOutput, icon: iconOutput, ...(!iconOutput && { removeIcon: true }) },
      previousData: params.previousData,
    };
  },
};
