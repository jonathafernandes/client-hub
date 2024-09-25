import { db } from '../../_lib/prisma';
import { NextResponse } from "next/server";

export const fetchCache = 'force-no-store'

async function handler(req: Request) {
  if (req.method === 'POST') {
    const { clientId, products, totalValue, discount } = await req.json() as {
      clientId: string;
      products: { create: { product: { connect: { id: string } }, quantity: number }[] };
      totalValue: number;
      discount?: number;
    };

    console.log('Dados recebidos:', { clientId, products, totalValue, discount });

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

      console.log('Dados do pedido a serem criados:', JSON.stringify(orderData, null, 2));

      const order = await db.orders.create({
        data: orderData,
      });

      console.log('Pedido criado:', order);

      const res = NextResponse.json(order, { status: 201 });
      res.headers.set('Cache-Control', 'no-store');
      return res;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      return NextResponse.json({ message: 'Erro ao salvar o pedido', error: String(error) }, { status: 500 });
    }
  }

  const res = NextResponse.json(`Método ${req.method} não permitido`, {
    status: 405,
  });
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export { handler as POST }