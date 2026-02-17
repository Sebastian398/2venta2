// app/cuenta/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Iniciando sesión:', formData.email);
    } else {
      console.log('Registrando usuario:', formData);
    }
    // Aquí integrarías con tu backend o auth provider
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
            2
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isLogin ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta'}
          </h1>
          <p className="text-gray-500 mt-2">
            {isLogin
              ? 'Inicia sesión para acceder a tu cuenta'
              : 'Únete a 2Venta y disfruta de ofertas exclusivas'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                placeholder="Juan Pérez"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <Link href="/cuenta/recuperar" className="text-sm text-orange-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
          >
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-orange-500 font-medium hover:underline"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
            </button>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Al continuar, aceptas nuestros{' '}
            <Link href="/terminos" className="text-orange-500 hover:underline">
              Términos
            </Link>{' '}
            y{' '}
            <Link href="/privacidad" className="text-orange-500 hover:underline">
              Política de privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}