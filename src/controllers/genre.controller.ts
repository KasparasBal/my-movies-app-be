import express from 'express';
import * as genreService from '../services/genre.service';

const getGenres = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    res.json(await genreService.getGenres());
  } catch (error) {
    next(error);
  }
};

export { getGenres };
