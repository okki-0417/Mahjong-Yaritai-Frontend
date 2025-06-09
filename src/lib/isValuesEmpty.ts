export const isValuesEmpty = (object: object) => {
  if (!object) return true;

  return Object.values(object).every(value => !value);
};
