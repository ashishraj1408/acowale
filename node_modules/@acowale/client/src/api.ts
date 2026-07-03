import type { HealthResponse, InfoResponse } from './types';

const API_BASE_URL = '/api';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json() as Promise<T>;
}

export async function fetchHealth(): Promise<HealthResponse> {
  return request<HealthResponse>('/health');
}

export async function fetchInfo(): Promise<InfoResponse> {
  return request<InfoResponse>('/info');
}
