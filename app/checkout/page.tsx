// app/checkout/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Simulación: en producción, obtendrías esto de tu auth provider
const useAuth = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Simula que el usuario está logueado si hay un token en localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    setUser(token ? 'usuario@ejemplo.com' : null);
  }, []);

  return { user };
};

export default function CheckoutPage() {
  const { state } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirige a cuenta si no está logueado
      router.push('/cuenta');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirigiendo a inicio de sesión...</p>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    alert('¡Pago procesado con éxito!');
    // Aquí integrarías Stripe, Mercado Pago, etc.
    // Luego: limpiar carrito y redirigir a orden completada
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">💳 Confirmar compra</h1>

        {state.totalItems === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
            <Link href="/" className="text-orange-500 hover:underline">
              ← Seguir comprando
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold mb-4">Resumen de tu pedido</h2>
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${state.totalPrice.toFixed(2)}</span>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">✅ ¡Hola, {user}! Estás listo para pagar.</p>
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold"
            >
              Pagar ahora
            </button>

            <Link
              href="/carrito"
              className="block text-center mt-4 text-orange-500 hover:underline"
            >
              ← Editar carrito
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
// app/checkout/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Simulación: en producción, obtendrías esto de tu auth provider
const useAuth = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Simula que el usuario está logueado si hay un token en localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    setUser(token ? 'usuario@ejemplo.com' : null);
  }, []);

  return { user };
};

export default function CheckoutPage() {
  const { state } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirige a cuenta si no está logueado
      router.push('/cuenta');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirigiendo a inicio de sesión...</p>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    alert('¡Pago procesado con éxito!');
    // Aquí integrarías Stripe, Mercado Pago, etc.
    // Luego: limpiar carrito y redirigir a orden completada
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">💳 Confirmar compra</h1>

        {state.totalItems === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
            <Link href="/" className="text-orange-500 hover:underline">
              ← Seguir comprando
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold mb-4">Resumen de tu pedido</h2>
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${state.totalPrice.toFixed(2)}</span>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">✅ ¡Hola, {user}! Estás listo para pagar.</p>
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold"
            >
              Pagar ahora
            </button>

            <Link
              href="/carrito"
              className="block text-center mt-4 text-orange-500 hover:underline"
            >
              ← Editar carrito
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}