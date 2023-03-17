const validateGenre = (value: string | null | undefined): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  const regexp = /^(\d+,)*\d+$/g;
  const result = value.match(regexp);
  return result !== null;
};

export default validateGenre;
