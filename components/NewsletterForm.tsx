'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aqui entraria a integração com o serviço de e-mail no futuro
      console.log('Inscrito com o e-mail:', email);
      setStatus('success');
      setEmail('');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-brand-50 text-brand-700 p-4 rounded-lg text-center">
        <p className="font-medium">Obrigado por se inscrever! 🎉</p>
        <p className="text-sm mt-1">Em breve você receberá nossas melhores análises.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu melhor e-mail"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
      />
      <button 
        type="submit"
        className="btn-primary whitespace-nowrap"
      >
        Inscrever-se
      </button>
    </form>
  );
}