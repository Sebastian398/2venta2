// app/mis-compras/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Order = {
  id: string;
  seller_name: string;
  total: number;
  status: string;
  date: string;
  items: number;
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function MisCompras() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulación
    setOrders([
      {
        id: 'ord1',
        seller_name: 'ElectroStore',
        total: 89.99,
        status: 'delivered',
        date: '10 feb 2026',
        items: 2,
      },
      {
        id: 'ord2',
        seller_name: 'ModaTop',
        total: 45.5,
        status: 'shipped',
        date: '12 feb 2026',
        items: 1,
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ← Mis compras
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Mis compras</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No has realizado compras aún.</p>
            <Link
              href="/"
              className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              Ir a comprar
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/orden/${order.id}`} className="block">
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-semibold text-gray-900">Pedido #{order.id.slice(0, 8)}</h2>
                      <p className="text-gray-600 text-sm">Vendido por: {order.seller_name}</p>
                      <p className="text-gray-500 text-xs mt-1">{order.date} • {order.items} artículo{order.items > 1 ? 's' : ''}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100'}`}>
                      {order.status === 'delivered' ? 'Entregado' : order.status === 'shipped' ? 'Enviado' : 'Pendiente'}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-orange-500 mt-3">${order.total.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}