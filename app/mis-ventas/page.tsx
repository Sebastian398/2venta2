// app/mis-ventas/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Sale = {
  id: string;
  buyer_name: string;
  product_name: string;
  quantity: number;
  total: number;
  status: string;
  date: string;
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-gray-100 text-gray-800',
};

export default function MisVentas() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    setSales([
      {
        id: 'sale1',
        buyer_name: 'Ana Gómez',
        product_name: 'Zapatillas deportivas',
        quantity: 1,
        total: 89.99,
        status: 'shipped',
        date: '12 feb 2026',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ← Mis ventas
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mis ventas</h1>
          <Link
            href="/productos/nuevo"
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600"
          >
            + Nuevo producto
          </Link>
        </div>

        {sales.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No has vendido nada aún.</p>
            <Link
              href="/productos/nuevo"
              className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              Publicar tu primer producto
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sales.map((sale) => (
              <div key={sale.id} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-700">{sale.product_name}</h2>
                    <p className="text-gray-600 text-sm">Comprado por: {sale.buyer_name}</p>
                    <p className="text-gray-500 text-xs mt-1">{sale.date} • x{sale.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-500">${sale.total.toFixed(2)}</p>
                    <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColors[sale.status]}`}>
                      {sale.status === 'shipped' ? 'Enviado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
                {sale.status !== 'delivered' && (
                  <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600">
                    Marcar como enviado
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}