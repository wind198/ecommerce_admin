import { CreateParams, ResourceCallbacks, UpdateParams } from 'react-admin';
import { fetchBlobFromURL, subtract2List } from '../../../../helpers';
import { axiosClient } from '../../../axios';
import { IHasId, IImage } from '../../../../types';
import { ICreateProduct, IUpdateProduct } from '../../../../../pages/product/types';

export const ProductLifecycle: ResourceCallbacks = {
  resource: 'product',
  async beforeCreate(params: CreateParams<ICreateProduct>) {
    const {
      data: { images = [], ...otherData },
      ...o
    } = params;

    let imagesOutput: IImage[] = [];
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
        ...(imagesOutput.length && { images: imagesOutput }),
      },
    };
  },
  async beforeUpdate(params: UpdateParams<IUpdateProduct & IHasId>) {
    const {
      data: { images = [], category, ...otherData },
      previousData: { images: prevImages = [] },
      ...o
    } = params;

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
      data: { ...otherData, images: newImageOutput, ...(category?._id && { category: category?._id }) },
      previousData: params.previousData,
    };
  },
};
