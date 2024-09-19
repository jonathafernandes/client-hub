import { db } from '../../_lib/prisma';
import { NextResponse } from "next/server";

export const GET = async () => {
    const clients = await db.client.findMany({
        select: {
            id: true,
            name: true,
            fantasyName: true,
            address: true,
            city: true,
            email: true,
            phone: true,
            district: true,
            zipCode: true,
            corporateName: true,
            referencePoint: true,
            cnpjOrCpf: true,
            registerNumber: true,
            createdAt: true,
            updatedAt: true,
            orders: {
                select: {
                    id: true,
                    totalValue: true,
                    discount: true,
                    createdAt: true,
                    updatedAt: true,
                    clientId: true,
                    registerNumber: true,
                    client: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            address: true,
                            district: true,
                            city: true,
                            zipCode: true,
                            referencePoint: true,
                            fantasyName: true,
                            cnpjOrCpf: true,
                            corporateName: true,
                            createdAt: true,
                            updatedAt: true,
                            registerNumber: true,
                        },
                    },
                    products: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                },
            },
        },
    });

    const res = NextResponse.json(clients, { status: 201 });
    res.headers.set('Cache-Control', 'no-store');
    return res;
}