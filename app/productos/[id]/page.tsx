// app/productos/[id]/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useParams, useRouter } from 'next/navigation';

const mockProduct = {
  id: '1',
  name: 'Auriculares Bluetooth Inalámbricos',
  price: 29.99,
  originalPrice: 49.99,
  discount: 40,
  rating: 4.7,
  reviews: 128,
  description:
    'Auriculares con cancelación de ruido, batería de hasta 30 horas, resistencia al agua IPX5 y sonido premium.',
  images: [
    '/images/headphones.jpg',
    '/images/headphones-2.jpg',
    '/images/headphones-3.jpg',
  ],
  specs: [
    { key: 'Marca', value: 'SoundMax' },
    { key: 'Color', value: 'Negro mate' },
    { key: 'Batería', value: '30 horas' },
    { key: 'Conexión', value: 'Bluetooth 5.2' },
  ],
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = mockProduct; // En producción: fetch por ID

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        },
      });
    }
    router.push('/carrito');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">Inicio</Link> &gt;{' '}
          <span className="text-gray-700">Electrónica</span> &gt;{' '}
          <span className="font-medium">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="relative w-full h-96 bg-white rounded-xl shadow-sm p-4 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-orange-500">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through ml-2">${product.originalPrice}</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded ml-2">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Cantidad:</span>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => router.push('/cuenta')}
                className="flex-1 border border-orange-500 text-orange-500 font-bold py-3 rounded-lg hover:bg-orange-50 transition"
              >
                Comprar ahora
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Especificaciones</h3>
              <ul className="space-y-2">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{spec.key}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// app/productos/[id]/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useParams, useRouter } from 'next/navigation';

const mockProduct = {
  id: '1',
  name: 'Auriculares Bluetooth Inalámbricos',
  price: 29.99,
  originalPrice: 49.99,
  discount: 40,
  rating: 4.7,
  reviews: 128,
  description:
    'Auriculares con cancelación de ruido, batería de hasta 30 horas, resistencia al agua IPX5 y sonido premium.',
  images: [
    '/images/headphones.jpg',
    '/images/headphones-2.jpg',
    '/images/headphones-3.jpg',
  ],
  specs: [
    { key: 'Marca', value: 'SoundMax' },
    { key: 'Color', value: 'Negro mate' },
    { key: 'Batería', value: '30 horas' },
    { key: 'Conexión', value: 'Bluetooth 5.2' },
  ],
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = mockProduct; // En producción: fetch por ID

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        },
      });
    }
    router.push('/carrito');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">Inicio</Link> &gt;{' '}
          <span className="text-gray-700">Electrónica</span> &gt;{' '}
          <span className="font-medium">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="relative w-full h-96 bg-white rounded-xl shadow-sm p-4 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-orange-500">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through ml-2">${product.originalPrice}</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded ml-2">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Cantidad:</span>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => router.push('/cuenta')}
                className="flex-1 border border-orange-500 text-orange-500 font-bold py-3 rounded-lg hover:bg-orange-50 transition"
              >
                Comprar ahora
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Especificaciones</h3>
              <ul className="space-y-2">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{spec.key}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}