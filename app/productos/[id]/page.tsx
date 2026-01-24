'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// Simulamos una "base de datos" de productos
const mockProducts: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Auriculares Bluetooth Inalámbricos',
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    rating: 4.7,
    reviews: 128,
    description:
      'Auriculares con cancelación de ruido, batería de hasta 30 horas, resistencia al agua IPX5 y sonido premium.',
    images: ['/auriculares.jpg', '/auriculares.jpg', '/auriculares.jpg'],
    specs: [
      { key: 'Marca', value: 'SoundMax' },
      { key: 'Color', value: 'Negro mate' },
      { key: 'Batería', value: '30 horas' },
      { key: 'Conexión', value: 'Bluetooth 5.2' },
    ],
    category: 'electronica',
  },
  '2': {
    id: '2',
    name: 'Camiseta Estampada',
    price: 12.99,
    originalPrice: 19.99,
    discount: 35,
    rating: 4.3,
    reviews: 89,
    description: 'Camiseta de algodón 100% suave y cómoda, ideal para uso diario.',
    images: ['/camisa.jpg', '/camisa.jpg', '/camisa.jpg'],
    specs: [
      { key: 'Material', value: 'Algodón 100%' },
      { key: 'Tallas', value: 'S, M, L, XL' },
      { key: 'Cuidado', value: 'Lavable a máquina' },
    ],
    category: 'moda',
  },
  '3': {
    id: '3',
    name: 'Juego de Sartenes Antiadherentes',
    price: 34.99,
    originalPrice: 59.99,
    discount: 42,
    rating: 4.5,
    reviews: 203,
    description: 'Set de 3 sartenes con recubrimiento antiadherente, aptas para inducción y lavavajillas.',
    images: ['/sartenes.jpg', '/sartenes.jpg', '/sartenes.jpg'],
    specs: [
      { key: 'Material', value: 'Aluminio reforzado' },
      { key: 'Piezas', value: '3 unidades' },
      { key: 'Compatibilidad', value: 'Inducción, gas, eléctrico' },
    ],
    category: 'hogar',
  },
};

// Mapeo de categorías para el breadcrumb
const categoryNames: Record<string, string> = {
  electronica: 'Electrónica',
  moda: 'Moda',
  hogar: 'Hogar',
  juguetes: 'Juguetes',
  deportes: 'Deportes',
  belleza: 'Belleza',
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);

  const id = params?.id as string;

  useEffect(() => {
    // En producción, aquí harías un fetch(`/api/productos/${id}`)
    const foundProduct = mockProducts[id];
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(0); // Reiniciar imagen seleccionada
    } else {
      router.push('/'); // Redirigir si no existe
    }
  }, [id, router]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  const categoryName = categoryNames[product.category] || 'Productos';

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
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Inicio
          </Link>{' '}
          &gt;{' '}
          <Link href={`/categoria/${product.category}`} className="hover:text-orange-500">
            {categoryName}
          </Link>{' '}
          &gt;{' '}
          <span className="font-medium text-gray-900">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Galería de imágenes */}
          <div className="lg:w-1/2">
            <div className="relative w-full h-96 bg-white rounded-xl shadow-sm p-4 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Vista ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="lg:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Calificación */}
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating.toFixed(1)} ({product.reviews} reseñas)
              </span>
            </div>

            {/* Precios */}
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through ml-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded ml-2">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Descripción */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Selector de cantidad */}
            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium text-gray-700">Cantidad:</span>
              <div className="flex border border-gray-300 rounded-lg text-gray-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100 text-gray-700"
                  aria-label="Reducir cantidad"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100 text-gray-700"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones de acción */}
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

            {/* Especificaciones */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-700">Especificaciones</h3>
              <ul className="space-y-2">
                {product.specs.map((spec: any, idx: number) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700">{spec.key}:</span>
                    <span className="font-medium text-gray-700">{spec.value}</span>
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