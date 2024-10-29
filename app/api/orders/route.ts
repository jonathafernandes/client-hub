/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '../../_lib/prisma';
import { NextResponse } from "next/server";

export const fetchCache = 'force-no-store';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    const { clientId, products, totalValue, discount } = await req.json() as {
      clientId: string;
      products: { create: { product: { connect: { id: string } }, quantity: number }[] };
      totalValue: number;
      discount?: number;
    };

    if (!clientId || !products || !products.create || products.create.length === 0) {
      console.log('ClientId ou produtos inválidos');
      return NextResponse.json('ClientId ou produtos inválidos', { status: 400 });
    }

    try {
      const orderData = {
        client: {
          connect: {
            id: clientId,
          },
        },
        totalValue: totalValue,
        discount: discount,
        orderProducts: {
          create: products.create.map(item => {
            console.log('Item do produto:', item);
            if (!item.product.connect.id) {
              throw new Error(`ID do produto não fornecido para o item: ${JSON.stringify(item)}`);
            }
            return {
              product: {
                connect: {
                  id: item.product.connect.id,
                },
              },
              quantity: item.quantity,
            };
          }),
        },
      };

      const order = await db.orders.create({
        data: orderData,
      });

      console.log('Pedido criado:', order);

      const response = NextResponse.json(order);
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');

      return response;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      return NextResponse.json({ message: 'Erro ao salvar o pedido', error: String(error) }, { status: 500 });
    }
  }

  return NextResponse.json({ message: `Método ${req.method} não permitido` }, { status: 405 });
}
