'use client';

import React, { useEffect, useState } from "react";
import ClientItem from "./client-item";
import { getProducts } from "../_actions/get-products";
import { Client } from "@prisma/client";

interface ClientsProps {
    clients: Client[];
}

const Clients =  ({ clients }: ClientsProps) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products);
        });
    }
    , []);
    return (
        <>
            {/* TODO: Implementar pesquisa pelo cliente */}
            {/* <div className="flex items-center gap-2 mb-4">
                <input placeholder="Pesquise pelo cliente..." className="bg-gray-950 block w-full sm:w-1/2 px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
                <Button variant="default">
                <SearchIcon size={20} />
                </Button>
                </div> */}
            {clients?.length === 0 ? (
                <div className="text-center text-white p-4 mt-[20vh]">Nenhum cliente encontrado! Clique no botão para criar um novo cliente.</div>
            ) : (
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
                            {clients?.map((client: Client) => (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                <ClientItem key={client.id} client={client as any} products={products} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
};

export default Clients;