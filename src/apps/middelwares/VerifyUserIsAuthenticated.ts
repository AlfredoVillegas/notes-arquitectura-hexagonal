import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function verifyUserIsAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.get('authorization');

    const token = authorization && authorization.toLowerCase().startsWith('bearer') ? authorization.substring(7) : null;

    const decodedToken: any = token ? jwt.verify(token, process.env.SECRET || 'Dev') : null;

    if (!token || !decodedToken.id) {
      return res.status(401).json({ errorMessage: 'token missing or invalid' });
    }

    console.log(`userId: ${decodedToken.id}`);

    req.params.userId = decodedToken.id;

    next();
  } catch (err: any) {
    res.status(401).json({ errorMessage: err });
  }
}
