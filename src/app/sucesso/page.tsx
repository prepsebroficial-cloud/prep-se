'use client';
export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SucessoPage() {
  const params = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Qualquer acesso ao navegador (window/localStorage) vai aqui dentro
  useEffect(() => {
    setSessionId(params.get('session_id') || null);

    // Exemplo seguro de uso do localStorage (se você precisar):
    try {
      const paid = localStorage.getItem('prepse_paid');
      // ...use 'paid' se quiser
    } catch (_) {}
  }, [params]);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Pagamento confirmado</h1>
      <p className="mt-2 text-gray-600">
        {sessionId ? `Sessão: ${sessionId}` : 'Sessão confirmada.'}
      </p>

      <a
        href="/jornada"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Ir para o cadastro
      </a>
    </main>
  );
}
