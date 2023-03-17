import validateGenre from '../../src/validators/genre.validator';

describe('validateGenre function', () => {
  test('should return true if endpoint can take 1 genre', () => {
    const result = validateGenre('28');
    expect(result).toBe(true);
  });

  test('should return true if endpoint can take 2 genres', () => {
    const result = validateGenre('28,12');
    expect(result).toBe(true);
  });

  test('should return true if endpoint can take 3 genres', () => {
    const result = validateGenre('28,12,35');
    expect(result).toBe(true);
  });

  test('should return false if endpoint contains commas', () => {
    const result = validateGenre(',');
    expect(result).toBe(false);
  });

  test('should return false if endpoint contains commas, but no number after', () => {
    const result = validateGenre('14,');
    expect(result).toBe(false);
  });

  test('should return false if anything other than numbers are passed in', () => {
    const result = validateGenre('Thriller');
    expect(result).toBe(false);
  });

  test('should return false if query contains symbols', () => {
    const result = validateGenre('53?>');
    expect(result).toBe(false);
  });

  test('should return false if query only contains spaces', () => {
    const result = validateGenre(' ');
    expect(result).toBe(false);
  });

  test('should return false if the value is null or undefined', () => {
    const result1 = validateGenre(null);
    const result2 = validateGenre(undefined);
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});
