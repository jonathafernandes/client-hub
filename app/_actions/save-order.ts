import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface OrderParams {
    clientId: string;
    products: { id: string; quantity: number }[];
}

export const saveOrder = async (params: OrderParams) => {
    try {
        const result = await db.orders.create({
            data: {
                client: {
                    connect: {
                        id: params.clientId,
                    },
                },
                orderProducts: {
                    create: params.products.map((product) => ({
                        product: {
                            connect: {
                                id: product.id,
                            },
                        },
                        quantity: product.quantity,
                    })),
                },
            },
        });
        revalidatePath('/dashboard');
        return result;
    } catch (error) {
        console.error('Erro ao salvar pedido', error);
        throw error;
    }
};
