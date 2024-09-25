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

export const updateClient = async (params: ClientParams & { id: string }) => {
    await db.client.update({
        where: { id: params.id },
        data: {
            name: params.name,
            fantasyName: params.fantasyName,
            corporateName: params.corporateName,
            email: params.email,
            phone: params.phone,
            address: params.address,
            city: params.city,
            district: params.district,
            zipCode: params.zipCode,
            cnpjOrCpf: params.cnpjOrCpf,
        }
    });
    revalidatePath('/dashboard');
}