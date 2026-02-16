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
    // fetch(`/api/sellers/${id}`)
    setSeller({
      name: 'Juan Pérez',
      products: [
        { id: '1', name: 'Zapatillas', price: 89.99, images: ['/img1.jpg'] },
        { id: '2', name: 'Mochila', price: 45.50, images: ['/img2.jpg'] },
      ],
    });
  }, [id]);

  if (!seller) return <div>Cargando tienda...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Tienda de {seller.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {seller.products.map((p) => (
          <Link key={p.id} href={`/productos/${p.id}`} className="block">
            <div className="border rounded-lg p-4 hover:shadow">
              <img src={p.images[0]} alt={p.name} className="w-full h-48 object-cover rounded" />
              <h2 className="font-semibold mt-2">{p.name}</h2>
              <p className="text-orange-500">${p.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}