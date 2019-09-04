const isObject = (value: any): value is Object => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export default isObject;
