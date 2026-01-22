// app/carrito/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleCheckout = () => {
    if (state.totalItems === 0) return;
    // Aquí iría la lógica de pago o redirección a cuenta
    alert('¡Redirigiendo al proceso de pago!');
    router.push('/cuenta'); // o /checkout si lo creas después
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">🛒 Tu carrito</h1>

        {state.totalItems === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
            <Link
              href="/"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Seguir comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center text-black">
                  <div className="relative w-20 h-20 mr-4">
                    <img src={item.image} alt={item.name} className="object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-orange-500 font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
              <h2 className="text-xl text-black font-semibold mb-4">Resumen</h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-black">
                  <span>Subtotal ({state.totalItems} {state.totalItems === 1 ? 'producto' : 'productos'}):</span>
                  <span className="font-bold">${state.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold text-black">
                  <span>Total:</span>
                  <span>${state.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition"
              >
                Proceder al pago
              </button>
              <Link
                href="/"
                className="block text-center mt-3 text-orange-500 hover:underline"
              >
                ← Seguir comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}