import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] || req.query.api_key;
    const validApiKey = process.env.API_KEY || 'nest-secret-api-key';

    if (!apiKey) {
      throw new UnauthorizedException('API key is required. Pass "x-api-key" in headers or "api_key" in query.');
    }

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('Invalid API key provided.');
    }

    next();
  }
}
