import isNumber from './isNumber';

const isNumeric = (value: any): value is string | number => {
  return isNumber(parseInt(value));
};

export default isNumeric;
