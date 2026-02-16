// app/notificaciones/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Notification = {
  id: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
  type: 'new_order' | 'review' | 'system';
};

const getIcon = (type: string) => {
  switch (type) {
    case 'new_order': return '📦';
    case 'review': return '⭐';
    default: return '🔔';
  }
};

export default function NotificacionesPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications([
      {
        id: '1',
        title: '¡Nueva venta!',
        body: 'Juan Pérez compró tus zapatillas deportivas.',
        is_read: false,
        created_at: 'Hoy, 10:30 AM',
        type: 'new_order',
      },
      {
        id: '2',
        title: 'Nueva reseña',
        body: 'Ana te dejó 5 estrellas en tu mochila escolar.',
        is_read: true,
        created_at: 'Ayer',
        type: 'review',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ← Notificaciones
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Notificaciones</h1>

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tienes notificaciones nuevas.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl ${
                  n.is_read ? 'bg-white' : 'bg-orange-50 border-l-4 border-orange-500'
                } shadow-sm`}
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{getIcon(n.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{n.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{n.body}</p>
                    <p className="text-gray-400 text-xs mt-2">{n.created_at}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}