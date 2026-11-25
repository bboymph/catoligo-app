import { api } from './api';

// Considera a API disponível apenas se /health responder { "status": "ok" }.
export async function checkHealth(): Promise<boolean> {
  try {
    const { data } = await api.get<{ status?: string }>('/health', { timeout: 5000 });
    return data?.status === 'ok';
  } catch {
    return false;
  }
}
