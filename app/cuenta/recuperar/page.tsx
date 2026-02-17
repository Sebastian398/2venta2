// app/cuenta/olvide-password/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OlvidePasswordPage() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría: fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })
    setMensaje('Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl text-gray-900 font-bold text-center mb-2">¿Olvidaste tu contraseña?</h1>
        <p className="text-gray-600 text-center mb-6">
          Ingresa tu correo y te enviaremos un enlace para crear una nueva.
        </p>

        {mensaje ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
            {mensaje}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-800 mb-1">Correo electrónico</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Enviar enlace
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/cuenta?mode=login" className="text-orange-500 hover:underline">
            ← Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}