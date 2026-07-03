import { HealthService } from '../services/health.service.js';
export class HealthController {
    healthService;
    constructor(healthService = new HealthService()) {
        this.healthService = healthService;
    }
    getHealth = (_req, res) => {
        const payload = this.healthService.getHealthStatus();
        res.status(200).json(payload);
    };
}
