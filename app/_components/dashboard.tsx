'use client';

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Clients from "./clients";
import OrderItem from "./order-item";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients } from "../_actions/get-client";
import { deleteClient } from "../_actions/delete-client";
import { Product, Client as PrismaClient, OrderProduct } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { deleteOrder } from "../_actions/delete-order";

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
  orderProducts: (OrderProduct & { product: Product })[];
}

const Dashboard = () => {
  const queryClient = useQueryClient();

  const { data: clients, error } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => await getClients(),
    staleTime: 0,
  });

  const deleteClientMutation = useMutation({
    mutationFn: deleteClient,
    onMutate: async (deletedClientId) => {
      await queryClient.cancelQueries({ queryKey: ['clients'] });

      const previousClients = queryClient.getQueryData<Client[]>(['clients']);

      queryClient.setQueryData<Client[]>(['clients'], (old) =>
        old ? old.filter((client) => client.id !== deletedClientId) : []
      );

      return { previousClients };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['clients'], context?.previousClients);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onMutate: async (deletedOrderId) => {
      await queryClient.cancelQueries({ queryKey: ['clients'] });

      const previousClients = queryClient.getQueryData<Client[]>(['clients']);

      queryClient.setQueryData<Client[]>(['clients'], (old) =>
        old ? old.filter((client) => client.orders.some((order) => order.id !== deletedOrderId)) : []
      );

      return { previousClients };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['clients'], context?.previousClients);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const handleDeleteClient = (id: string) => {
    deleteClientMutation.mutate(id);
  };

  const handleDeleteOrder = (id: string) => {
    deleteOrderMutation.mutate(id)
  };

  return (
    <div className="text-sm mb-16 px-4 lg:px-8">
      <h1 className="text-lg font-bold border-b p-5">Dashboard</h1>
      <div className="flex justify-between items-center mb-2">
        <h4 className="uppercase m-5 font-semibold">Clientes</h4>
        <Button variant="default" className="font-bold p-2" asChild>
          <Link href="/new-client">
            Novo cliente
          </Link>
        </Button>
      </div>
      {error ? (
        <p className="text-red-500">Erro ao carregar clientes!</p>
      ) : (
        <Clients clients={clients ?? []} onDelete={handleDeleteClient} />
      )}
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
                    <OrderItem key={order.id} client={client} order={order} onDelete={handleDeleteOrder} />
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