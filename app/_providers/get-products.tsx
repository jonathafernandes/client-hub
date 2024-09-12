import React from "react";
import { db } from "../_lib/prisma";
import NewOrderDialogClient from "../_components/new-order-dialog";

export const NewOrderDialogServer = async () => {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
        },
    });

    const orders = await db.orders.findMany({
        select: {
            client: {
                select: {
                    name: true,
                },
            },
            products: {
                select: {
                    name: true,
                },
            },
            totalValue: true,
        },
    });
    console.log("🚀 ~ NewOrderDialogServer ~ orders:", orders)
    
    return <NewOrderDialogClient products={products} clientId={""} />;
};
