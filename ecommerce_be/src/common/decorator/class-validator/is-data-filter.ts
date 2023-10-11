import { buildMessage, ValidateBy, ValidatorOptions } from 'class-validator';
import { FilterOperatorList, IDataFilter, IDataFilterOperator } from '../../types/data-filter';
const IS_DATA_FILTER_OPERATOR = 'isDataFilterOperator';
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
export function isDataFilter(object: IDataFilter) {
  if (typeof object !== 'object') {
    return false;
  }
  for (const fieldName in object) {
    if (Object.prototype.hasOwnProperty.call(object, fieldName)) {
      if (typeof fieldName !== 'string') {
        return false;
      }
      const filter = object[fieldName];
      for (const operatorName in filter) {
        if (Object.prototype.hasOwnProperty.call(filter, operatorName)) {
          if (!FilterOperatorList.includes(operatorName as any)) {
            return false;
          }
          const value = filter[operatorName];
          if (typeof value !== 'string' && typeof value !== 'number') {
            return false;
          }
        }
      }
    }
  }

  return true;
}
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
export function IsDataFilter(validationOptions?: ValidatorOptions) {
  return ValidateBy(
    {
      name: IS_DATA_FILTER_OPERATOR,
      validator: {
        validate: function (value, args) {
          return isDataFilter(value);
        },
        defaultMessage: buildMessage(function (eachPrefix) {
          return eachPrefix + '$property is not a data filter operator';
        }, validationOptions),
      },
    },
    validationOptions,
  );
}
//# sourceMappingURL=IsNotEmpty.js.map
