import { INumberString } from '../types';

export function mapMongoIdToId<T extends { _id: string }>(list: T[]) {
  return list.map(convertMongoIdToId);
}
export function convertMongoIdToId<T extends { _id: string }>(item: T) {
  const { _id, ...o } = item;
  return { ...o, id: _id };
}
export const convertObjectUrlToArrayBuffer = async (objectURL: string) => {
  const blob = await fetchBlobFromURL(objectURL);
  if (!blob) return;
  const arrayBuffer = await blobToArrayBuffer(blob);
  return arrayBuffer;
};

const blobToArrayBuffer = (blob: Blob): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('FileReader error'));
  });
};

export const fetchBlobFromURL = async (url: string) => {
  try {
    const blob = await fetch(url).then((res) => res.blob());
    return blob;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const subtract2List = <T>(prevList: T[], currentList: T[], indentityFun: (i: T) => any) => {
  // Subtract common item from both list
  const prevItemsGetRemove = [];
  let newItemGetAdded = [...currentList];
  let itemsKept = [];
  for (let currentCheckIndex = 0; currentCheckIndex < prevList.length; currentCheckIndex++) {
    const element = prevList[currentCheckIndex];
    const matchInCurrentList = newItemGetAdded.find((it) => indentityFun(it) === indentityFun(element));
    if (matchInCurrentList) {
      newItemGetAdded = newItemGetAdded.filter((i) => indentityFun(i) === indentityFun(matchInCurrentList));
      itemsKept.push(matchInCurrentList);
    } else {
      prevItemsGetRemove.push(element);
    }
  }

  return {
    prevItemsGetRemove,
    newItemGetAdded,
    itemsKept,
  };
};
