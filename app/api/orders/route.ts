import { db } from '../../_lib/prisma';
import { NextResponse } from "next/server";
async function handler(req: Request) {
    if (req.method === 'POST') {
        const { clientId, products, totalValue, discount } = await req.json() as {
            clientId: string;
            products: { id: string }[];
            totalValue: number;
            discount?: number;
        };

        if (!clientId || !products || products.length === 0) {
            return NextResponse.json('ClientId ou produtos inválidos', { status: 400 });
        }

        try {
            const order = await db.orders.create({
                data: {
                    client: {
                        connect: {
                            id: clientId,
                        },
                    },
                    totalValue: totalValue,
                    discount: discount,
                    products: {
                        connect: products.map(product => ({
                            id: product.id,
                        })),
                    },
                },
            });

            return NextResponse.json(order, { status: 201 });
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            return NextResponse.json({ message: 'Erro ao salvar o pedido' }, { status: 500 });
        }
    }
    NextResponse.json(`Método ${req.method} não permitido`, {
        status: 405,
    });
}

export { handler as POST }
