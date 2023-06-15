export type FieldValidatorType = (value: string) => string | undefined;

export const requiredField: FieldValidatorType = (value: string): string | undefined => {
  if (value) return undefined;
  return 'Field is required';
};

const maxLengthCreator =
  (maxLength: number): FieldValidatorType =>
  (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
  };

export const maxLength30 = maxLengthCreator(30);
