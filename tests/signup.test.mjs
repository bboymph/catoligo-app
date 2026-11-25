import assert from 'node:assert/strict';
import test from 'node:test';

import { validateSignUp } from '../src/utils/signUpValidation.ts';

const valid = {
  name: 'Maria',
  email: 'maria@example.com',
  password: '123456',
  confirm_password: '123456',
};

test('identifica todos os campos obrigatórios simultaneamente', () => {
  assert.deepEqual(validateSignUp({ name: ' ', email: ' ', password: '', confirm_password: '' }), {
    name: 'Informe seu nome.',
    email: 'Informe seu e-mail.',
    password: 'Informe uma senha.',
    confirm_password: 'Confirme sua senha.',
  });
  for (const field of Object.keys(valid)) {
    assert.deepEqual(Object.keys(validateSignUp({ ...valid, [field]: '' })), [field]);
  }
});

test('valida o e-mail', () => {
  for (const email of ['maria', 'maria@', '@example.com', 'maria@example', 'maria @example.com']) {
    assert.deepEqual(validateSignUp({ ...valid, email }), { email: 'Informe um e-mail válido.' });
  }
  assert.deepEqual(validateSignUp({ ...valid, email: ' maria@example.com ' }), {});
});

test('valida comprimento e confirmação da senha', () => {
  assert.deepEqual(validateSignUp({ ...valid, password: '12345', confirm_password: '12345' }), {
    password: 'A senha deve ter pelo menos 6 caracteres.',
  });
  assert.deepEqual(validateSignUp({ ...valid, confirm_password: 'abcdef' }), {
    confirm_password: 'As senhas não coincidem.',
  });
  assert.deepEqual(validateSignUp({ ...valid, password: 'abcdef', confirm_password: '123456' }), {
    confirm_password: 'As senhas não coincidem.',
  });
  assert.deepEqual(validateSignUp(valid), {});
});

test('identifica erros diferentes em campos simultaneamente', () => {
  assert.deepEqual(validateSignUp({ ...valid, email: 'inválido', password: '12345' }), {
    email: 'Informe um e-mail válido.',
    password: 'A senha deve ter pelo menos 6 caracteres.',
    confirm_password: 'As senhas não coincidem.',
  });
});
