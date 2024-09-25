"use client"

import React, { useState } from "react";
import OrderFile from "./order-file";
import { Client, OrderProduct, Orders, Prisma, Product } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { deleteOrder } from "../_actions/delete-order";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"
import { toast } from "sonner";

interface OrderItemProps {
    client: Client;
    order: Orders & {
        products: Product[];
        client: Client;
        orderProducts: (OrderProduct & { product: Product })[];
    };
    onDelete: (id: string) => void;
}

const OrderItem = ({ client, order, onDelete }: OrderItemProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const formatDate = (date: Date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('pt-BR', {
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

    const handleDeleteOrderClick = async () => {
        try {
            await deleteOrder(order.id);
            toast.success('Pedido excluído com sucesso!');
            onDelete(order.id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDialogOpen(false);
        }
    };

    return (
        <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <tr className="text-sm text-gray-400" key={order.id}>
                <SheetTrigger asChild>
                    <td className="px-4 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-800">00{order.registerNumber}</td>
                </SheetTrigger>
                <td className="px-4 py-4 whitespace-nowrap uppercase">{client.fantasyName}</td>
                <td className="px-4 py-4 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-4 whitespace-nowrap">{formatPercentage(order.discount)}</td>
                <td className="px-4 py-4 whitespace-nowrap">{formatCurrency(order.totalValue)}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                    <OrderFile
                        order={order}
                        products={order.products}
                        client={client}
                    />
                </td>
            </tr>
            <SheetContent className="flex flex-col justify-between overflow-auto w-11/12 bg-secondary text-gray-200 font-[family-name:var(--font-geist-sans)]">
                <div className="mt-6">
                    <div className="mb-4 flex items-center gap-4 border-b pb-4">
                        <h2 className="text-xl font-bold">Pedido</h2>
                        <Badge className="bg-gray-800 border">
                            00{order.registerNumber}
                        </Badge>
                    </div>
                    <p className="uppercase"><strong>Cliente: </strong>{client.fantasyName}</p>
                    <p><strong>Data: </strong>{formatDate(order.createdAt)}</p>
                    <p><strong>Desconto: </strong>{formatPercentage(order.discount)}</p>
                    <p><strong>Valor total: </strong>{formatCurrency(order.totalValue)}</p>
                    <div className="mt-4">
                        <h3 className="text-md font-semibold mb-2">Produtos</h3>
                        {order.orderProducts.map((orderProduct) => (
                            <div key={orderProduct.orderId} className="border p-2 mb-2">
                                <p className="uppercase"><strong>Nome: </strong>{orderProduct.product.name}</p>
                                <p className="uppercase"><strong>Quantidade: </strong>{orderProduct.quantity}</p>
                                <p><strong>Preço: </strong>{formatCurrency(orderProduct.product?.price)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="mt-4 w-full">
                            Excluir
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="p-4 rounded-sm font-[family-name:var(--font-geist-sans)] max-h-[90%] w-11/12 overflow-x-auto">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você realmente deseja excluir esse pedido?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Essa ação não poderá ser desfeita.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                            onClick={handleDeleteOrderClick}
                            >
                                Confirmar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SheetContent>
        </Sheet>
    );
};

export default OrderItem;
