'use client';

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Clients from "./clients";
import OrderItem from "./order-item";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../_actions/get-client";
import { Product, Client as PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface Client extends PrismaClient {
    orders: Order[];
}

interface Order {
    id: string;
    clientId: string;
    discount: Decimal | null;
    totalValue: Decimal | null;
    createdAt: Date;
    updatedAt: Date;
    registerNumber: number;
    products: Product[];
    client: Client;
}

const Dashboard = () => {
    const { data: clients } = useQuery<Client[]>({
        queryKey: ['clients'],
        queryFn: async () => {
            const clients = await getClients();
            return clients;
        }
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
            <Clients clients={clients ?? []} />

            {(clients ?? []).length > 0 && (
                <>
                    <h4 className="uppercase m-5 font-semibold">Pedidos</h4>
                    <div className="overflow-x-auto">
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
                                {clients?.flatMap((client) =>
                                    client.orders.map((order: Order) => (
                                        <OrderItem key={order.id} order={order} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
