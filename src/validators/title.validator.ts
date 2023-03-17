const validateTitle = (value: string | null | undefined): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  const regexp = /^[A-Za-z0-9\s.-]*$/g;
  const result = value.match(regexp);
  return result !== null;
};

export default validateTitle;
