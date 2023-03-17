import validateTitle from '../../src/validators/title.validator';

describe('validateTitle function', () => {
  test('should return true for a valid input', () => {
    const result = validateTitle('Godzilla vs. Kong');
    expect(result).toBe(true);
  });

  test('should return false for an invalid input', () => {
    const result = validateTitle('Godzilla vs. $%Kong');
    expect(result).toBe(false);
  });

  test('should return true if string only contains a space', () => {
    const result = validateTitle(' ');
    expect(result).toBe(true);
  });

  test('should return true if the string is empty', () => {
    const result = validateTitle('');
    expect(result).toBe(true);
  });

  test('should return true if the string allows dots', () => {
    const result = validateTitle('.');
    expect(result).toBe(true);
  });

  test('should return true if the string allows dashes', () => {
    const result = validateTitle('-');
    expect(result).toBe(true);
  });

  test('should return false if there are dangerous symbols', () => {
    const result = validateTitle('<|?&Godzilla !vs. $%Kong');
    expect(result).toBe(false);
  });

  test('should return false if the value is null or undefined', () => {
    const result1 = validateTitle(null);
    const result2 = validateTitle(undefined);
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});
