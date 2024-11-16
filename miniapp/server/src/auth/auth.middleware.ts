import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    try {
      // Simulate token verification
      (req as any).user = { id: 'user_id', email: 'user@example.com' };
      next();
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
  }
}