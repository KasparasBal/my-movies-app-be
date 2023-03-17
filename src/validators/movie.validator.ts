import { body } from 'express-validator';

const validatePersonalMovies = [
  body('movieId').exists().isInt(),
  body('title').exists(),
  body('releaseDate').exists().isDate(),
];

export default validatePersonalMovies;
