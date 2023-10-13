import { TextField, TextFieldProps } from '@mui/material';
import { KeyboardEvent, useEffect, useLayoutEffect, useState } from 'react';
import { IsNumberString } from '../../common/helpers';

const MuiNumberInput = (
  p: Omit<TextFieldProps, 'value' | 'onChange'> & {
    value: number | undefined;
    onChange: (v: number | undefined) => void;
  } & {
    step?: number;
    disableNegative?: boolean;
  },
) => {
  const { step = 1, onChange, onKeyUp, value, disableNegative, autoComplete, ...others } = p;

  const [localValue, setValueAsString] = useState<string>(value?.toString() ?? '');

  const [localValueInvalid, setLocalValueInvalid] = useState(false);

  useLayoutEffect(() => {
    if (localValueInvalid) {
      return;
    }
    const newValue = value?.toString() ?? '';
    if (newValue !== localValue) {
      setValueAsString(newValue);
    }
  }, [value]);

  const onKeyUpAugmented = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const key = e.key;
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      let newValue = key === 'ArrowUp' ? (value ?? 0) + step : (value ?? 0) - step;
      if (newValue < 0 && disableNegative) {
        newValue = 0;
      }
      onChange(newValue);
      onKeyUp && onKeyUp(e);
    }
  };

  return (
    <TextField
      onKeyDown={(e) => {
        const key = e.key;
        if (key === 'ArrowUp' || key === 'ArrowDown') {
          e.preventDefault();
        }
      }}
      autoComplete="off"
      value={localValue}
      onKeyUp={onKeyUpAugmented}
      onChange={(e) => {
        /**
         * TODO:
         * ""
         * .
         * .12
         * 11.
         * 11...
         * 11.12
         * -
         * -0
         * -0.1
         * -0..
         * -111
         * -11.11
         */
        const newValue = e.target.value;
        if (!newValue) {
          onChange(0);
          setLocalValueInvalid(true);
          setValueAsString('0');
          return;
        }
        if (newValue === '.') {
          onChange(0);
          setValueAsString('0');
          setLocalValueInvalid(true);
          return;
        }
        if (newValue.endsWith('.')) {
          setValueAsString(newValue.replace(/\.+$/, '.'));
          setLocalValueInvalid(true);
          return;
        }
        if ((newValue === '-' || newValue === '0-') && !disableNegative) {
          onChange(0);
          setValueAsString('-');
          setLocalValueInvalid(true);
          return;
        }
        if (newValue === '-0') {
          onChange(0);
          setValueAsString('-0');
          setLocalValueInvalid(true);
          return;
        }
        if (!IsNumberString(newValue)) {
          return;
        }
        onChange(newValue.includes('.') ? parseFloat(newValue) : parseInt(newValue));
        setLocalValueInvalid(false);
      }}
      {...others}
    />
  );
};

export default MuiNumberInput;
