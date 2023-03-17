import validateSort from '../../src/validators/sort.validator';

describe('validateSort function', () => {
  test('should return true if the input is a string which contains letters, dots, dashes', () => {
    const result = validateSort('original_title.asc');
    expect(result).toBe(true);
  });

  test('should return false for an input which contains spaces', () => {
    const result = validateSort('original_title.asc ');
    expect(result).toBe(false);
  });
  test('should return false for an input which contains dangerous characters', () => {
    const result = validateSort('original_title.asc>!');
    expect(result).toBe(false);
  });
  test('should return false for an input which is empty', () => {
    const result = validateSort('');
    expect(result).toBe(false);
  });
  test('should return false for an input which only contains dots', () => {
    const result = validateSort('.');
    expect(result).toBe(false);
  });
  test('should return false for an input which only contains dashes', () => {
    const result = validateSort('-');
    expect(result).toBe(false);
  });
  test('should return false for an input which only contains spaces', () => {
    const result = validateSort(' ');
    expect(result).toBe(false);
  });
});
