'use client';

import { useState } from 'react';

import { RagFab } from './RagFab';
import { RagPanel } from './RagPanel';
import { useRagForm } from '../hooks/use-rag-form';
import type { IRagMessage } from '../types/rag.types';

export function RagWidget(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<IRagMessage[]>([
    {
      id: 'demo-user',
      role: 'user',
      content: '¿Cómo implementar autenticación JWT en NestJS?',
    },
    {
      id: 'demo-assistant',
      role: 'assistant',
      content:
        'Según el post [1], la autenticación JWT en NestJS se implementa con Passport y un módulo Auth que emite el access token tras el login.',
      sources: [
        {
          title: 'Autenticación JWT en NestJS',
          slug: 'autenticacion-jwt-en-nestjs',
        },
      ],
    },
  ]);

  const { queryField, onSubmit, isPending, errors, clearErrors } = useRagForm({
    onAppendMessage: (message) => {
      setMessages((previous) => [...previous, message]);
    },
  });

  const openPanel = (): void => {
    setIsOpen(true);
  };

  const closePanel = (): void => {
    clearErrors();
    setIsOpen(false);
  };

  const clearChat = (): void => {
    setMessages([]);
    clearErrors();
  };

  return (
    <>
      {!isOpen ? <RagFab onClick={openPanel} /> : null}
      {isOpen ? (
        <RagPanel
          messages={messages}
          isPending={isPending}
          onClose={closePanel}
          onClearChat={clearChat}
          queryField={queryField}
          onSubmit={onSubmit}
          errors={errors}
        />
      ) : null}
    </>
  );
}
