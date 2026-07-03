export interface HealthResponse {
  status: 'ok';
  uptime: number;
  timestamp: string;
}

export interface InfoResponse {
  environment: string;
  port: number;
  databaseConfigured: boolean;
}
