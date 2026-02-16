// app/mis-compras/estado/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

type OrderDetail = {
  id: string;
  seller: string;
  date: string;
  status: string;
  total: number;
  shipping_address: string;
  items: Array<{ name: string; quantity: number; price: number }>;
};

const statusSteps = ['Pedido recibido', 'Pago confirmado', 'En preparación', 'Enviado', 'Entregado'];

export default function EstadoPedido() {
  const { id } = useParams();
  
  // Simulación de datos
  const order: OrderDetail = {
    id: String(id),
    seller: 'ElectroStore',
    date: '10 de febrero de 2026',
    status: 'Enviado',
    total: 89.99,
    shipping_address: 'Calle Falsa 123, Ciudad, País',
    items: [
      { name: 'Auriculares Bluetooth', quantity: 1, price: 29.99 },
      { name: 'Cable USB-C', quantity: 2, price: 9.99 },
    ],
  };

  const currentStep = order.status === 'Entregado' ? 4 :
                     order.status === 'Enviado' ? 3 :
                     order.status === 'En preparación' ? 2 : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/mis-compras" className="text-xl font-bold text-orange-500">
            ← Estado del pedido
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Pedido #{order.id}</h1>
        <p className="text-gray-600 mb-6">Realizado el {order.date}</p>

        {/* Seguimiento */}
        <div className="mb-8">
          <h2 className="font-semibold mb-3">Seguimiento</h2>
          <div className="relative">
            {statusSteps.map((step, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  index < currentStep ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className={`${index < currentStep ? 'font-semibold' : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dirección */}
        <div className="bg-white p-4 rounded-xl mb-6">
          <h3 className="font-semibold mb-2">Dirección de envío</h3>
          <p className="text-gray-700">{order.shipping_address}</p>
        </div>

        {/* Productos */}
        <div className="bg-white p-4 rounded-xl mb-6">
          <h3 className="font-semibold mb-3">Productos</h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-3 pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <Link
          href="/mis-compras"
          className="block text-center text-orange-500 font-medium"
        >
          ← Volver a mis compras
        </Link>
      </main>
    </div>
  );
}