"use server"

import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache"

export const deleteOrder = async (id: string) => {
    await db.orders.delete({
        where: {
            id
        }
    })

    revalidatePath('/dashboard');
};