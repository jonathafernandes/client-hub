"use server"

import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache"

export const deleteClient = async (id: string) => {
    await db.client.delete({
        where: {
            id
        }
    });
    revalidatePath('/dashboard');
};