import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../_lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { clientId, products } = req.body;

        // Logar os dados recebidos pela API
        console.log('Dados recebidos na API:', { clientId, products });

        if (!clientId || !products || products.length === 0) {
            return res.status(400).json({ message: 'ClientId ou produtos inválidos' });
        }

        try {
            const order = await db.orders.create({
                data: {
                    client: {
                        connect: {
                            id: clientId,
                        },
                    },
                    products: {
                        create: products.map((product: { id: string }) => ({
                            product: {
                                connect: {
                                    id: product.id,
                                },
                            },
                        })),
                    },
                },
            });

            return res.status(200).json(order);
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            return res.status(500).json({ message: 'Erro ao salvar o pedido' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
