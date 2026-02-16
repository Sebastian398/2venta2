// app/checkout/exito/page.tsx
'use client';

import Link from 'next/link';

export default function ExitoPage() {
  const handleDownloadInvoice = () => {
    // En producción, esto llamaría a: /api/invoices/order-123/pdf
    alert('Descargando factura...');
    // Ejemplo real:
    // window.open('/api/invoices/latest/pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">¡Compra exitosa!</h1>
        <p className="text-gray-600 mb-6">
          Tu pedido ha sido confirmado. El vendedor ha sido notificado y preparará tu envío.
        </p>

        <button
          onClick={handleDownloadInvoice}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition mb-4"
        >
          📄 Descargar factura
        </button>

        <div className="space-y-3">
          <Link
            href="/mis-compras"
            className="block w-full bg-white border border-orange-500 text-orange-500 py-2 rounded-lg font-medium hover:bg-orange-50"
          >
            Ver mis pedidos
          </Link>
          <Link
            href="/"
            className="block w-full text-gray-600 hover:underline"
          >
            ← Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}