// components/Header.tsx
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/busqueda?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-500 flex items-center">
          <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            2
          </span>
          Venta
        </Link>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué estás buscando?"
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </form>

        {/* Iconos */}
        <div className="flex items-center space-x-5">
          <Link href="/cuenta" className="text-gray-700 hover:text-orange-500">
            👤
          </Link>
          <Link href="/carrito" className="relative">
            {/* Ícono SVG de carrito (silueta blanca sobre fondo naranja si hay items) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700 hover:text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.347 1.076.838l.169.68a1.875 1.875 0 001.875 1.392h13.125a1.875 1.875 0 001.875-1.875V3m-18 0h18M3 9v12a3 3 0 003 3h12a3 3 0 003-3V9M9 12h6"
              />
            </svg>
            {state.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
