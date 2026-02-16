// app/categorias/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const allCategories = [
  { name: 'Electrónica', icon: '📱', slug: 'electronica' },
  { name: 'Moda', icon: '👕', slug: 'moda' },
  { name: 'Hogar', icon: '🏠', slug: 'hogar' },
  { name: 'Juguetes', icon: '🧸', slug: 'juguetes' },
  { name: 'Deportes', icon: '⚽', slug: 'deportes' },
  { name: 'Belleza', icon: '💄', slug: 'belleza' },
  { name: 'Libros', icon: '📚', slug: 'libros' },
  { name: 'Mascotas', icon: '🐶', slug: 'mascotas' },
  { name: 'Automotriz', icon: '🚗', slug: 'automotriz' },
  { name: 'Oficina', icon: '🖨️', slug: 'oficina' },
];

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ← Todas las categorías
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Explorar categorías</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/categoria/${cat.slug}`}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition text-center text-black"
            >
              <span className="text-3xl mb-2">{cat.icon}</span>
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}