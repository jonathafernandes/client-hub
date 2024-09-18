import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma"

interface OrderParams {
    clientId: string;
    products: { id: string }[];
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
                products: {
                    create: params.products.map((product) => ({
                        product: {
                            connect: {
                                id: product.id,
                            },
                        },
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
