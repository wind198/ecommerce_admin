import { ForwardedRef, forwardRef, useMemo } from 'react';
import { ImageField, ImageFieldProps, useRecordContext } from 'react-admin';

export type IAugmentedImageFieldProps = {};

const AugmentedImageField = (p: ImageFieldProps) => {
  const { source, ...o } = p;

  const record = useRecordContext();

  const [aumentedRecord, augmentedSource] = useMemo(() => {
    if (!source) {
      return [record, source];
    }
    const recordVal = record[source];
    if (typeof recordVal === 'string') {
      return [{ ...record, [source]: { src: recordVal } }, `${source}.src`];
    }
    return [record, source];
  }, [record, source]);

  return <ImageField {...o} source={augmentedSource} record={aumentedRecord} />;
};

export default AugmentedImageField;
