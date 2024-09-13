import React from "react";
import { db } from "../_lib/prisma";
import { Button } from "./ui/button";
import Link from "next/link";
import ClientItem from "./client-item";
import { Prisma } from "@prisma/client";
import OrderFile from "./order-file";

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

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatCurrency = (value: Prisma.Decimal | null) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value ? Number(value) : 0);
    };

    const formatPercentage = (value: Prisma.Decimal | null) => {
        return `${value ? Number(value) : 0}%`;
    };

    return (
        <div className="text-sm mb-16 px-4 lg:px-8">
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
                            <th className="px-4 py-3">Nome</th>
                            <th className="px-4 py-3">Nome fantasia</th>
                            <th className="px-4 py-3">Pedidos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-700">
                        {clients.map((client) => (
                            <ClientItem key={client.id} client={client} products={products} />
                        ))}
                    </tbody>
                </table>
            </div>

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
                        {clients.flatMap((client) =>
                            client.orders.map((order) => (
                                <tr className="text-sm text-gray-400" key={order.id}>
                                    <td className="px-4 py-4 whitespace-nowrap">00{order.registerNumber}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{order.client.fantasyName ?? 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{formatPercentage(order.discount)}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{formatCurrency(order.totalValue)}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <OrderFile order={order} products={order.products} client={client} />
                                    </td>
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
