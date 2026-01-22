// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata = {
  title: '2Venta - Compra rápido, vende fácil',
  description: 'La tienda online con las mejores ofertas del día.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}