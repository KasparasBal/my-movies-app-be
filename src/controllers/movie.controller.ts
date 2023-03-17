import express from 'express';
import * as movieService from '../services/movie.service';
import validateTitle from '../validators/title.validator';
import validateGenre from '../validators/genre.validator';
import validateSort from '../validators/sort.validator';

const getPageNumber = (req: express.Request): number => (req.query.page ? parseInt(req.query.page as string) || 1 : 1);

const getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const title = req.query.title as string;
    const genres = (req.query.genres as string) || '';
    const sort = (req.query.sort as string) || '';

    const isGenresValid = validateGenre(genres);
    const isSortValid = validateSort(sort);

    if (isGenresValid || isSortValid) {
      res.json(
        await movieService.filterMovies(getPageNumber(req), isGenresValid ? genres : '', isSortValid ? sort : ''),
      );
    } else if (validateTitle(title)) {
      res.json(await movieService.searchByMoviesTitle(getPageNumber(req), title));
    } else {
      res.json(await movieService.getMovies(req));
    }
  } catch (error) {
    next(error);
  }
};
const getMovie = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    res.json(await movieService.getMovie(_req));
  } catch (error) {
    next(error);
  }
};

export { getMovie, getMovies };
