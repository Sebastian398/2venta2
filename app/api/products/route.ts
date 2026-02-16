// app/api/products/route.ts
import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await sql`
      SELECT 
        id, name, price, images, seller_id,
        (SELECT full_name FROM users WHERE id = products.seller_id) AS seller_name
      FROM products 
      WHERE is_active = true
      ORDER BY created_at DESC
      LIMIT 50;
    `;

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}