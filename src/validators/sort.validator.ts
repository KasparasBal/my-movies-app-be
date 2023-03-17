const validateSort = (value: string | null | undefined): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  const regexp = /^(?![-.]*$)[a-zA-Z0-9_.-]+$/;
  const result = value.match(regexp);
  return result !== null;
};

export default validateSort;
