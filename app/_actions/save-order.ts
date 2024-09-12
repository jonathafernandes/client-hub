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
        console.log('Pedido salvo com sucesso', result);
        revalidatePath('/dashboard');
        return result; // Retornar o resultado para ver se a operação foi bem-sucedida
    } catch (error) {
        console.error('Erro ao salvar pedido', error);
        throw error; // Retornar o erro para ser tratado no frontend
    }
};
