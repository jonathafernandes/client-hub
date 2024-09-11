import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma"

interface OrderParams {
    clientId: string;
    products: { id: string }[];
}

export const saveOrder = async (params: OrderParams) => {
    await db.orders.create({
        data: {
            client: {
                connect: {
                    id: params.clientId
                }
            },
            products: {
                create: params.products.map((product) => ({
                    product: {
                        connect: {
                            id: product.id
                        }
                    }
                }))
            }
        }
    })
    revalidatePath('/dashboard');
}