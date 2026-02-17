// app/vendedor/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Seller = {
  name: string;
  products: Array<{ id: string; name: string; price: number; images: string[] }>;
};

export default function VendedorPage() {
  const { id } = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);

  useEffect(() => {
    // Simulación: en producción usa fetch(`/api/sellers/${id}`)
    setSeller({
      name: 'Juan Pérez',
      products: [
        { id: '1', name: 'Zapatillas deportivas', price: 89.99, images: ['/img1.jpg'] },
        { id: '2', name: 'Mochila escolar resistente', price: 45.50, images: ['/img2.jpg'] },
      ],
    });
  }, [id]);

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Cargando tienda...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ← Tienda de {seller.name}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Tienda de {seller.name}</h1>

        {seller.products.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Esta tienda no tiene productos disponibles aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {seller.products.map((p) => (
              <Link key={p.id} href={`/productos/${p.id}`} className="block">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full text-gray-600">
                  <div className="relative w-full h-48 bg-gray-100">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="object-contain p-4 w-full h-full"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="font-semibold text-sm line-clamp-2 text-black">{p.name}</h2>
                    <p className="text-orange-500 font-bold mt-2">${p.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}