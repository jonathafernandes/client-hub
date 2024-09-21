import React from "react";
import OrderFile from "./order-file";
import { Client, Orders, Prisma, Product } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";

interface OrderItemProps {
    order: Orders & {
        products: Product[];
        client: Client;
    };        
}

const OrderItem = ({ order }: OrderItemProps) => {
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

    return (
        <Sheet>
            <tr className="text-sm text-gray-400" key={order.id}>
                <SheetTrigger asChild>
                    <td className="px-4 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-800">00{order.registerNumber}</td>
                </SheetTrigger>
                <td className="px-4 py-4 whitespace-nowrap uppercase">{order.client.fantasyName}</td>
                <td className="px-4 py-4 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-4 whitespace-nowrap">{formatPercentage(order.discount)}</td>
                <td className="px-4 py-4 whitespace-nowrap">{formatCurrency(order.totalValue)}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                    <OrderFile 
                        order={order} 
                        products={order.products} 
                        client={{
                            ...order.client,
                            id: order.clientId,
                            corporateName: order.client.name,
                            createdAt: order.createdAt,
                            updatedAt: order.updatedAt,
                            registerNumber: order.registerNumber
                        }} 
                    />
                </td>
            </tr>
            <SheetContent className="overflow-auto w-11/12 bg-secondary text-gray-200 font-[family-name:var(--font-geist-sans)]">
                <div className="mt-6">
                    <div className="mb-4 flex items-center gap-4 border-b pb-4">
                        <h2 className="text-xl font-bold">Pedido</h2>
                        <Badge className="bg-gray-800 border">
                            00{order.registerNumber}
                        </Badge>
                    </div>
                    <p className="uppercase"><strong>Cliente: </strong>{order.client.fantasyName}</p>
                    <p><strong>Data: </strong>{formatDate(order.createdAt)}</p>
                    <p><strong>Desconto: </strong>{formatPercentage(order.discount)}</p>
                    <p><strong>Valor total: </strong>{formatCurrency(order.totalValue)}</p>
                    <div className="mt-4">
                        <h3 className="text-md font-semibold mb-2">Produtos</h3>
                        {order.products.map((product) => (
                            <div key={product.id} className="border p-2 mb-2">
                                <p className="uppercase"><strong>Nome: </strong>{product.name}</p>
                                <p><strong>Preço: </strong>{formatCurrency(product.price)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default OrderItem;
