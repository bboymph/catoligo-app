import { api } from './api';

export type LoginRequest = {
  email: string;
  password: string;
};

// O formato da resposta ainda não foi definido; ajustar quando o contrato da API existir.
export type LoginResponse = Record<string, unknown>;

export type SignUpRequest = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
};

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/users/login', payload);
  return data;
}

export async function signUp(payload: SignUpRequest): Promise<void> {
  await api.post('/users', payload);
}
