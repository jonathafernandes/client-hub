import React from "react";
import ClientItem from "./client-item";
import { db } from "../_lib/prisma";

const Clients = async () => {
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
                            fantasyName: true,
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

    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
        },
    });
    return (
        <>
            {/* TODO: Implementar pesquisa pelo cliente */}
            {/* <div className="flex items-center gap-2 mb-4">
                <input placeholder="Pesquise pelo cliente..." className="bg-gray-950 block w-full sm:w-1/2 px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                <Button variant="default">
                <SearchIcon size={20} />
                </Button>
                </div> */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y border border-gray-500">
                    <thead className="bg-gray-950 text-white">
                        <tr className="text-left text-xs font-medium uppercase tracking-wider">
                            <th className="px-4 py-3 w-1/12">Nome</th>
                            <th className="px-4 py-3 w-1/12">Nome fantasia</th>
                            <th className="px-4 py-3 w-1/12">Pedidos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-700">
                        {clients.map((client) => (
                            <ClientItem key={client.id} client={client} products={products} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Clients;