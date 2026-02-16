// app/terminos/page.tsx
'use client';

import Link from 'next/link';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ← Términos y condiciones
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl prose prose-orange">
        <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
        <p className="text-gray-700">
          Bienvenido a 2Venta. Al acceder o utilizar nuestra plataforma, aceptas los siguientes términos:
        </p>
        <h2>1. Uso de la plataforma</h2>
        <p>
          2Venta es un marketplace que conecta compradores y vendedores. No somos responsables por la calidad,
          legalidad o seguridad de los productos ofrecidos por terceros.
        </p>
        <h2>2. Registro de cuenta</h2>
        <p>
          Debes proporcionar información veraz al registrarte. Eres responsable de mantener la confidencialidad
          de tu contraseña.
        </p>
        <h2>3. Publicación de productos</h2>
        <p>
          Los vendedores son responsables de la exactitud de la información de sus productos. Queda prohibida
          la venta de artículos ilegales o falsificados.
        </p>
        <h2>4. Pagos y envíos</h2>
        <p>
          Los pagos se procesan a través de proveedores externos (Stripe, Mercado Pago, etc.). Los tiempos de
          envío dependen del vendedor.
        </p>
        <h2>5. Propiedad intelectual</h2>
        <p>
          Todo el contenido de 2Venta es propiedad de sus respectivos dueños. Queda prohibido copiar, modificar
          o distribuir sin autorización.
        </p>
        <p className="mt-6 text-sm text-gray-500">
          Última actualización: 16 de febrero de 2026
        </p>
      </main>
    </div>
  );
}