import type { Request, Response } from 'express';
import { HealthService } from '../services/health.service.js';

export class HealthController {
  constructor(private readonly healthService: HealthService = new HealthService()) {}

  getHealth = (_req: Request, res: Response) => {
    const payload = this.healthService.getHealthStatus();
    res.status(200).json(payload);
  };
}
