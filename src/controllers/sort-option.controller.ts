import express from 'express';
import * as sortOption from '../services/sort-option.service';

const getSortOptions = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    res.json(sortOption.getSortOptions());
  } catch (error) {
    next(error);
  }
};

export { getSortOptions };
