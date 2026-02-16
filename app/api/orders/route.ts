// app/api/orders/route.ts
import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyer_id, seller_id, items, shipping_address, total_amount } = body;

    // 1. Crear orden
    const [order] = await sql`
      INSERT INTO orders (
        id, buyer_id, seller_id, total_amount, shipping_address, status
      ) VALUES (
        ${uuidv4()}, ${buyer_id}, ${seller_id}, ${total_amount}, ${JSON.stringify(shipping_address)}, 'paid'
      )
      RETURNING id;
    `;

    // 2. Crear items de la orden
    for (const item of items) {
      await sql`
        INSERT INTO order_items (
          id, order_id, product_id, product_snapshot, quantity, price_per_unit
        ) VALUES (
          ${uuidv4()}, ${order.id}, ${item.product_id}, ${JSON.stringify(item.snapshot)}, ${item.quantity}, ${item.price}
        );
      `;
    }

    // 3. Crear notificación para el vendedor
    await sql`
      INSERT INTO notifications (
        id, user_id, type, title, body, metadata
      ) VALUES (
        ${uuidv4()}, ${seller_id}, 'new_order', '¡Nueva venta!', 'Tienes una nueva orden.', 
        ${JSON.stringify({ order_id: order.id, buyer_id })}
      );
    `;

    // 4. Crear factura (solo registro, PDF se genera al descargar)
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    await sql`
      INSERT INTO invoices (
        id, order_id, invoice_number, seller_id, buyer_id, amount
      ) VALUES (
        ${uuidv4()}, ${order.id}, ${invoiceNumber}, ${seller_id}, ${buyer_id}, ${total_amount}
      );
    `;

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}