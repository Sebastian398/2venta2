// app/productos/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  seller_name: string;
  images: string[];
};

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // fetch('/api/products')
    setProducts([
      { id: '1', name: 'Zapatillas', price: 89.99, seller_name: 'Juan Pérez', images: ['/img1.jpg'] },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todos los productos</h1>
      <div className="space-y-4">
        {products.map((p) => (
          <Link key={p.id} href={`/productos/${p.id}`} className="flex gap-4 p-4 border rounded hover:bg-gray-50">
            <img src={p.images[0]} alt={p.name} className="w-24 h-24 object-cover rounded" />
            <div>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-gray-600">Vendido por: {p.seller_name}</p>
              <p className="text-orange-500 font-bold">${p.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}