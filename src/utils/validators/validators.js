export const requiredField = (value) => {
  if (value) return undefined;
  return 'Field is required';
};

const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
  return undefined;
};

export const maxLength30 = maxLengthCreator(30);
