import express from 'express';
import mongoose from 'mongoose';
import { ValidationChain, validationResult } from 'express-validator';

export const PAGE_SIZE = 20;

export const CORS = (_req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
};

export const validate = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

export const isLambdaRuntime = (): boolean => !!process.env.AWS_LAMBDA_FUNCTION_NAME;

export const connectToMongoDb = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionOptions: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL, connectionOptions);
    console.log('Successfully connected to DB');
  } else {
    console.error('Mongo URL not found');
  }
};
