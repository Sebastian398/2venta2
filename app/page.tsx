// app/page.tsx
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useRef, useEffect } from 'react';

// Simulamos el estado de autenticación (en producción, usa tu auth context real)
const useAuth = () => {
  const [user, setUser] = useState<{ id: string; role: 'customer' | 'seller' } | null>(null);

  useEffect(() => {
    // En producción, esto vendría de cookies o tu auth provider
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (userData: { id: string; role: 'customer' | 'seller' }) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, login, logout };
};

const featuredProducts = [
  {
    id: '1',
    name: 'Auriculares Bluetooth',
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    image: '/auriculares.jpg',
    category: 'electronica',
  },
  {
    id: '2',
    name: 'Camiseta Estampada',
    price: 12.99,
    originalPrice: 19.99,
    discount: 35,
    image: '/camisa.jpg',
    category: 'moda',
  },
  {
    id: '3',
    name: 'Juego de Sartenes',
    price: 34.99,
    originalPrice: 59.99,
    discount: 42,
    image: '/sartenes.jpg',
    category: 'hogar',
  },
];

const categories = [
  { name: 'Electrónica', icon: '📱', slug: 'electronica' },
  { name: 'Moda', icon: '👕', slug: 'moda' },
  { name: 'Hogar', icon: '🏠', slug: 'hogar' },
  { name: 'Juguetes', icon: '🧸', slug: 'juguetes' },
  { name: 'Deportes', icon: '⚽', slug: 'deportes' },
  { name: 'Belleza', icon: '💄', slug: 'belleza' },
];

export default function HomePage() {
  const { state, dispatch } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0); // ← NUEVO: estado de notificaciones
  const menuRef = useRef<HTMLDivElement>(null);

  const cartItemCount = state.items.length;

  // Cargar notificaciones no leídas (simulado)
  useEffect(() => {
    if (user) {
      // En producción: fetch('/api/notifications/unread')
      setUnreadNotifications(3); // ← Simulación: 3 notificaciones no leídas
    } else {
      setUnreadNotifications(0);
    }
  }, [user]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/busqueda?q=${encodeURIComponent(searchQuery)}`;
    }
  };

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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-500 flex items-center">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </span>
            Venta
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué estás buscando?"
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 placeholder-gray-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </form>

          <div className="flex items-center space-x-3 relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-xl relative"
            >
              👤
              {!user && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {/* Botón de notificaciones con contador */}
            <Link href="/notificaciones" className="relative p-2 text-xl">
              <span>🔔</span>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </Link>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                {user ? (
                  <>
                    <Link
                      href="/mis-compras"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      📦 Mis pedidos
                    </Link>
                    {user.role === 'seller' && (
                      <Link
                        href="/mis-ventas"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        💼 Mis ventas
                      </Link>
                    )}
                    <Link
                      href="/cuenta/perfil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ⚙️ Actualizar datos
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/cuenta?mode=login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      🔑 Iniciar sesión
                    </Link>
                    <Link
                      href="/cuenta?mode=register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ✍️ Registrarse
                    </Link>
                  </>
                )}
              </div>
            )}

            <Link href="/productos/nuevo" className="p-2 text-xl bg-orange-100 rounded-full hover:bg-orange-200 transition">
              ➕
            </Link>
            <Link href="/carrito" className="relative p-2 text-xl">
              <span>🛒</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-64 md:h-80 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white text-center p-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">¡Ofertas que no puedes perder!</h1>
            <p className="text-lg mb-4">Hasta 50% de descuento en miles de productos</p>
            <Link
              href="/ofertas"
              className="bg-white text-orange-600 font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Ver ofertas
            </Link>
          </div>
        </div>

        {/* Categorías */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Categorías</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/categoria/${cat.slug}`}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition text-center text-black"
              >
                <span className="text-2xl mb-2">{cat.icon}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-3">
            <Link href="/categorias" className="text-orange-500 text-sm font-medium">
              Ver todas las categorías
            </Link>
          </div>
        </section>

        {/* Ofertas del día */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🔥 Ofertas del día</h2>
            <Link href="/ofertas" className="text-orange-500 text-sm font-medium">
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                <Link href={`/productos/${product.id}`} className="block">
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
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through ml-2 text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
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
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-3">
        <div className="container mx-auto px-2 text-center">
          <p className="text-lg font-bold mb-2">2Venta</p>
          <p className="text-gray-400 text-sm mb-2">Compra rápido, vende fácil.</p>
          <div className="flex justify-center space-x-4 mt-1">
            <Link href="/terminos" className="text-gray-400 hover:text-white text-xs">Términos</Link>
            <Link href="/privacidad" className="text-gray-400 hover:text-white text-xs">Privacidad</Link>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            © 2026 2Venta. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}