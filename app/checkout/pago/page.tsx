// app/checkout/pago/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function PagoPage() {
  const router = useRouter();

  useEffect(() => {
    // Simular procesamiento de pago
    const timer = setTimeout(() => {
      // Aquí iría la llamada a tu API:
      // fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData) })
      
      // Simulamos éxito
      alert('¡Pago procesado con éxito!');
      router.push('/checkout/exito');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold mb-2">Procesando pago...</h2>
        <p className="text-gray-600">Por favor, espera un momento.</p>
        <Link href="/carrito" className="mt-4 text-orange-500 hover:underline text-sm">
          ← Cancelar
        </Link>
      </div>
    </div>
  );
}