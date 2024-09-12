"use client"

import React, { useState } from "react";
import { Prisma } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog } from "./ui/dialog";
import NewOrderDialog from "./new-order-dialog";

type ClientWithOrders = Prisma.ClientGetPayload<{
    select: {
        id: true;
        name: true;
        fantasyName: true;
        address: true;
        city: true;
        email: true;
        phone: true;
        district: true;
        zipCode: true;
        corporateName: true;
        referencePoint: true;
        registerNumber: true;
        orders: {
            select: {
                id: true;
                totalValue: true;
                discount: true;
                createdAt: true;
                registerNumber: true;
                client: {
                    select: {
                        fantasyName: true;
                    };
                };
            };
        };
    };
}>;

type Products = Prisma.ProductGetPayload<{
    select: {
        id: true;
        name: true;
        price: true;
    };
}>;

export interface ClientItemProps {
    client: ClientWithOrders;
    products: Products[];
}

const ClientItem: React.FC<ClientItemProps> = ({ client, products }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => setIsDialogOpen(true);

    const formatCurrency = (value: Prisma.Decimal | null) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value ? Number(value) : 0);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <tr className="text-sm text-gray-400">
            <Sheet>
                <SheetTrigger asChild>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap cursor-pointer hover:bg-gray-800">
                        {client.name ?? 'N/A'}
                    </td>
                </SheetTrigger>
                <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{client.fantasyName ?? 'N/A'}</td>
                <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{client.orders.length}</td>
                <SheetContent className="overflow-auto w-11/12 bg-secondary text-gray-200 font-[family-name:var(--font-geist-sans)]">
                    <div className="mt-6">
                        <div className="mb-4 flex items-center gap-4 border-b pb-4">
                            <h2 className="text-xl font-bold">{client.name}</h2>
                            <Badge className="bg-gray-800 border">
                                00{client.registerNumber}
                            </Badge>
                        </div>
                        <p className="mb-2"><strong>Nome Fantasia:</strong> {client.fantasyName ?? 'N/A'}</p>
                        <p className="mb-2"><strong>Razão Social:</strong> {client.corporateName ?? 'N/A'}</p>
                        <p className="mb-2"><strong>Endereço:</strong> {client.address ?? 'N/A'}</p>
                        <p className="mb-2"><strong>Bairro:</strong> {client.district ?? 'N/A'}</p>
                        <p className="mb-2"><strong>Cidade:</strong> {client.city ?? 'N/A'}</p>
                        <p className="mb-2"><strong>CEP:</strong> {client.zipCode ?? 'N/A'}</p>
                        <p className="mb-2"><strong>Ponto de referência:</strong> {client.referencePoint ?? 'N/A'}</p>
                        <p className="mb-2"><strong>E-mail:</strong> {client.email ?? 'N/A'}</p>
                        <p className="mb-2"><strong>Telefone:</strong> {client.phone ?? 'N/A'}</p>

                        <p className="mb-4"><strong>Número de pedidos:</strong> {client.orders.length}</p>

                        <div className="border-t pt-3 mb-3 flex items-center justify-between">
                            <h3 className="font-semibold">Pedidos recentes</h3>
                            <Button variant="default" className="font-bold p-2" onClick={openDialog}>
                                Novo pedido
                            </Button>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <NewOrderDialog products={products} clientId={client.id} />
                            </Dialog>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-400">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numero</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-100 divide-y text-gray-500 divide-gray-300">
                                    {client.orders.slice(0, 5).map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">00{order.registerNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(order.totalValue)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </tr>
    );
}

export default ClientItem;