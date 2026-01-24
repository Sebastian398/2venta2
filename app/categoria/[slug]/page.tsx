// Datos simulados por categoría
"use client"
const productsByCategory: Record<string, any[]> = {
  electronica: [
    { id: '1', name: 'Auriculares Bluetooth', price: 29.99, image: '/auriculares.jpg', discount: 40 },
    { id: '4', name: 'Smartwatch', price: 89.99, image: '/smartwatch.jpg', discount: 20 },
  ],
  moda: [
    { id: '2', name: 'Camiseta Estampada', price: 12.99, image: '/camisa.jpg', discount: 35 },
    { id: '5', name: 'Jeans Slim', price: 29.99, image: '/jeans.jpg', discount: 15 },
  ],
  hogar: [
    { id: '3', name: 'Juego de Sartenes', price: 34.99, image: '/sartenes.jpg', discount: 42 },
    { id: '6', name: 'Lámpara LED', price: 19.99, image: '/lampara.jpg', discount: 25 },
  ],
  juguetes: [{ id: '7', name: 'Muñeca Interactiva', price: 24.99, image: '/muneca.jpg', discount: 10 }],
  deportes: [{ id: '8', name: 'Balón de Fútbol', price: 15.99, image: '/balon.jpg', discount: 5 }],
  belleza: [{ id: '9', name: 'Kit de Maquillaje', price: 39.99, image: '/maquillaje.jpg', discount: 30 }],
};

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const categoryNameMap: Record<string, string> = {
  electronica: 'Electrónica',
  moda: 'Moda',
  hogar: 'Hogar',
  juguetes: 'Juguetes',
  deportes: 'Deportes',
  belleza: 'Belleza',
};

export default function CategoriaPage() {
  const params = useParams();
  const { slug } = params;
  const categoryName = categoryNameMap[slug as string] || 'Productos';
  const products = productsByCategory[slug as string] || [];

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
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="text-2xl font-bold text-orange-500 flex items-center">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </span>
            Venta
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Categoría: {categoryName}</h1>

        {products.length === 0 ? (
          <p className="text-gray-500">No hay productos en esta categoría.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                <Link href={`/producto/${product.id}`} className="block">
                  <div className="relative w-full h-48 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain p-4 w-full h-full"
                    />
                    {product.discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-sm line-clamp-2 text-black">{product.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-orange-500 font-bold text-lg">${product.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-lg transition-colors mt-3"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}