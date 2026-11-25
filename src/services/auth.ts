import { api } from './api';

export type LoginRequest = {
  email: string;
  password: string;
};

// O formato da resposta ainda não foi definido; ajustar quando o contrato da API existir.
export type LoginResponse = Record<string, unknown>;

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/users/login', payload);
  return data;
}
