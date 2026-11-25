import type { SignUpRequest } from '../services/auth';

export type SignUpErrors = Partial<Record<keyof SignUpRequest, string>>;

export function validateSignUp({ name, email, password, confirm_password }: SignUpRequest): SignUpErrors {
  const errors: SignUpErrors = {};

  if (!name.trim()) errors.name = 'Informe seu nome.';
  if (!email.trim()) {
    errors.email = 'Informe seu e-mail.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }
  if (!password) {
    errors.password = 'Informe uma senha.';
  } else if (password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  }
  if (!confirm_password) {
    errors.confirm_password = 'Confirme sua senha.';
  } else if (password && password !== confirm_password) {
    errors.confirm_password = 'As senhas não coincidem.';
  }
  return errors;
}
