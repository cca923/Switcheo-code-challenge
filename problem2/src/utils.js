export const isNumber = (value) => {
  return /^\d*(\.\d+)?$/.test(value) && !isNaN(parseFloat(value));
};
