import React from "react";
import { db } from "../_lib/prisma";
import { Button } from "./ui/button";
import Link from "next/link";

const Dashboard = async () => {
    const clients = await db.client.findMany(
        {
            select: {
                id: true,
                name: true,
                fantasyName: true,
                orders: {
                    select: {
                        id: true,
                        totalValue: true,
                        discount: true,
                        createdAt: true,
                        client: {
                            select: {
                                fantasyName: true,
                            },
                        },
                    },
                },
            },
        }
    );

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatPercentage = (value) => {
        return `${value}%`;
    };

    return (
        <div className="text-sm mb-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-bold border-b p-5">Dashboard</h1>
            <div className="flex justify-between items-center mb-2">
                <h4 className="uppercase m-5 font-semibold">Clientes</h4>
                <Button
                    variant="outline"
                    className="font-bold p-2"
                    asChild
                >
                    <Link href="/new-client">
                        Novo cliente
                    </Link>
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y border border-gray-500">
                    <thead className="bg-gray-950 text-white">
                        <tr className="text-left text-xs font-medium uppercase tracking-wider">
                            <th className="px-4 py-3 sm:px-6">Nome</th>
                            <th className="px-4 py-3 sm:px-6">Nome fantasia</th>
                            <th className="px-4 py-3 sm:px-6">Pedidos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-700">
                        {clients.map((client) => (
                            <tr className="text-sm text-gray-400" key={client.id}>
                                <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{client.name}</td>
                                <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{client.fantasyName}</td>
                                <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{client.orders.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h4 className="uppercase m-5 font-semibold">Pedidos</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y border border-gray-500">
                    <thead className="bg-gray-950 text-white">
                        <tr className="text-left text-xs font-medium uppercase tracking-wider">
                            <th className="px-4 py-3 sm:px-6">Número</th>
                            <th className="px-4 py-3 sm:px-6">Cliente</th>
                            <th className="px-4 py-3 sm:px-6">Data</th>
                            <th className="px-4 py-3 sm:px-6">Desconto</th>
                            <th className="px-4 py-3 sm:px-6">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-700">
                        {clients.map((client) =>
                            client.orders.map((orders) => (
                                <tr className="text-sm text-gray-400" key={orders.id}>
                                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{String(orders.id).slice(-4)}</td>
                                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{orders.client.fantasyName}</td>
                                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{formatDate(orders.createdAt)}</td>
                                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{formatPercentage(orders.discount)}</td>
                                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{formatCurrency(orders.totalValue)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
