'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';
import { useForm, type SubmitHandler, type UseFormRegisterReturn } from 'react-hook-form';

import { useAuth } from './use-auth';
import type { ILoginPayload } from '../types/auth.types';

export function useLoginForm(): {
  usernameField: UseFormRegisterReturn<'username'>;
  passwordField: UseFormRegisterReturn<'password'>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: {
    username?: { message?: string };
    password?: { message?: string };
    root?: { message?: string };
  };
  isSubmitting: boolean;
} {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ILoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILoginPayload> = async (data): Promise<void> => {
    try {
      await login(data);
    } catch (error: unknown) {
      setError('root', {
        message: getApiErrorMessage(
          error,
          'No se pudo iniciar sesión. Verifica tus credenciales.',
        ),
      });
    }
  };

  return {
    usernameField: register('username', {
      required: 'El usuario es obligatorio',
    }),
    passwordField: register('password', {
      required: 'La contraseña es obligatoria',
      minLength: {
        value: 6,
        message: 'Mínimo 6 caracteres',
      },
    }),
    onSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
