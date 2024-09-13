"use server"

import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache"

export interface ClientParams {
    name: string;
    fantasyName?: string;
    corporateName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    district?: string;
    zipCode?: string;
    cnpjOrCpf?: string;
}

export const saveClient = async (params: ClientParams) => {
    await db.client.create({
        data: params
    });
    revalidatePath('/dashboard');
}