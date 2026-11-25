import { create, isAxiosError } from 'axios';

import { env } from '../config/env';

export const api = create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Define (ou remove) o token enviado em todas as requisições seguintes.
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export function getErrorMessage(error: unknown, fallback = 'Ocorreu um erro inesperado.') {
  if (isAxiosError(error)) {
    if (!error.response) return 'Não foi possível conectar ao servidor.';
    const message = (error.response.data as { message?: unknown } | undefined)?.message;
    if (typeof message === 'string') return message;
  }
  return fallback;
}
