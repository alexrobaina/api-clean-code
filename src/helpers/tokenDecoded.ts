import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const tokenDecoded = (req: Request, res: Response, next: any) => {
  const SEED = process.env.SEED || 'key-desarollo-secrets-yes';
  // @ts-ignore
  const authorization = req.headers.authorization.split(' ')[1];

  jwt.verify(authorization, SEED, (err: any, user: any) => {
    if (err)
      return res.status(403).send({
        message: 'Something went wrong 🙄',
      });

    req.user = user;
    next();
  });
};
