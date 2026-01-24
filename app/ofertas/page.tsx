'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const offers = [
  {
    id: '101',
    name: 'Smartwatch Deportivo',
    price: 39.99,
    originalPrice: 79.99,
    discount: 50,
    image: '/reloj.jpg',
  },
  {
    id: '102',
    name: 'Mochila Antirrobo',
    price: 24.99,
    originalPrice: 45.99,
    discount: 46,
    image: '/mochila.jpg',
  },
  {
    id: '103',
    name: 'Licuadora Profesional',
    price: 42.99,
    originalPrice: 89.99,
    discount: 52,
    image: '/licuadora.jpg',
  },
  {
    id: '104',
    name: 'Set de Brochas Maquillaje',
    price: 9.99,
    originalPrice: 24.99,
    discount: 60,
    image: '/brochas.jpg',
  },
];

export default function OffersPage() {
  const { dispatch } = useCart();

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">🔥 Ofertas Relámpago</h1>
          <p className="text-gray-600">Descuentos por tiempo limitado. ¡Aprovecha ahora!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              {/* ✅ Enlace al detalle del producto */}
              <Link href={`/productos/${offer.id}`} className="block">
                <div className="relative w-full h-48 bg-gray-100">
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="object-contain p-4 w-full h-full"
                  />
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{offer.discount}%
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 text-black">{offer.name}</h3>
                </div>
              </Link>

              {/* Precios y botón de carrito */}
              <div className="px-4 pb-4 mt-auto">
                <div className="flex items-center">
                  <span className="text-orange-500 font-bold">${offer.price.toFixed(2)}</span>
                  <span className="text-gray-400 line-through ml-2 text-sm">
                    ${offer.originalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(offer)}
                  className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-lg transition"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-orange-500 font-medium hover:underline inline-flex items-center"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}