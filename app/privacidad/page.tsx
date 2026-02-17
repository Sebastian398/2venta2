'use client';

import Link from 'next/link';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ← Política de privacidad
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl prose prose-orange">
        <h1 className="text-3xl font-bold mb-6 text-black">Política de Privacidad</h1>
        <p className="text-gray-700">
          En 2Venta, respetamos tu privacidad y nos comprometemos a proteger tus datos personales.
        </p>
        
        <div className="space-y-6">
          <section className="text-gray-900">
            <h2>1. Información que recopilamos</h2>
            <p className="text-gray-700">
              - Datos de registro (nombre, email, teléfono)<br/>
              - Direcciones de envío<br/>
              - Historial de compras y ventas<br/>
              - Documentos de verificación (si te conviertes en vendedor)
            </p>
          </section>
          
          <section className="text-gray-900">
            <h2>2. Cómo usamos tus datos</h2>
            <p className="text-gray-700">
              Tus datos se utilizan para:<br/>
              - Procesar pedidos<br/>
              - Verificar identidad de vendedores<br/>
              - Enviar notificaciones sobre tus pedidos<br/>
              - Mejorar la experiencia de usuario
            </p>
          </section>
          
          <section className="text-gray-900">
            <h2>3. Compartimos tus datos?</h2>
            <p className="text-gray-700">
              Solo compartimos información con:<br/>
              - Proveedores de pago (Stripe, Mercado Pago)<br/>
              - Servicios de envío (si aplica)<br/>
              - Autoridades legales, si es requerido por ley
            </p>
          </section>
          
          <section className="text-gray-900">
            <h2>4. Tus derechos</h2>
            <p className="text-gray-700">
              Puedes:<br/>
              - Acceder, corregir o eliminar tus datos<br/>
              - Solicitar la portabilidad de tus datos<br/>
              - Oponerte al tratamiento de tus datos
            </p>
          </section>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Última actualización: 16 de febrero de 2026
        </p>
      </main>
    </div>
  );
}
