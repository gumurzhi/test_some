import { NextFunction } from 'express';

export type Middleware = (req: Express.Request, res: Express.Response, next: NextFunction) => void;
