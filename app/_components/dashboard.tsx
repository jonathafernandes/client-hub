import React from "react";
import { db } from "../_lib/prisma";
import { Button } from "./ui/button";
import Link from "next/link";
import Clients from "./clients";
import OrderItem from "./order-item";

const Dashboard = async () => {
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

    return (
        <div className="text-sm mb-16 px-4 lg:px-8">
            <h1 className="text-lg font-bold border-b p-5">Dashboard</h1>
            <div className="flex justify-between items-center mb-2">
                <h4 className="uppercase m-5 font-semibold">Clientes</h4>
                <Button
                    variant="default"
                    className="font-bold p-2"
                    asChild
                >
                    <Link href="/new-client">
                        Novo cliente
                    </Link>
                </Button>
            </div>
            <Clients />

            {/* TODO: Implementar pesquisa pelo pedido */}
            {/* <div className="flex items-center gap-2 mb-4">
                 <input placeholder="Pesquise pelo número do pedido..." className="bg-gray-950 block w-full sm:w-1/2 px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                 <Button variant="default">
                     <SearchIcon size={20} />
                 </Button>
             </div> */}
            {clients.length > 0 && (
                <><h4 className="uppercase m-5 font-semibold">Pedidos</h4><div className="overflow-x-auto">
                    <table className="min-w-full divide-y border border-gray-500">
                        <thead className="bg-gray-950 text-white">
                            <tr className="text-left text-xs font-medium uppercase tracking-wider">
                                <th className="px-4 py-3">Número</th>
                                <th className="px-4 py-3">Cliente</th>
                                <th className="px-4 py-3">Data</th>
                                <th className="px-4 py-3">Desconto</th>
                                <th className="px-4 py-3">Valor</th>
                                <th className="px-4 py-3">Baixar</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900 divide-y divide-gray-700">
                            {clients.flatMap((client) => client.orders.map((order) => (
                                <OrderItem key={order.id} order={order} />
                            ))
                            )}
                        </tbody>
                    </table>
                </div></>
            )}
        </div>
    );
};

export default Dashboard;
