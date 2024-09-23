'use client';

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Clients from "./clients";
import OrderItem from "./order-item";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients } from "../_actions/get-client";
import { deleteClient } from "../_actions/delete-client";
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
  const queryClient = useQueryClient();

  const { data: clients, error } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => await getClients(),
    staleTime: 0,
  });

  const deleteClientMutation = useMutation({
    mutationFn: deleteClient,
    onMutate: async (deletedClientId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['clients'] });

      // Snapshot the previous value
      const previousClients = queryClient.getQueryData<Client[]>(['clients']);

      // Optimistically update to the new value
      queryClient.setQueryData<Client[]>(['clients'], (old) =>
        old ? old.filter((client) => client.id !== deletedClientId) : []
      );

      // Return a context object with the snapshotted value
      return { previousClients };
    },
    onError: (err, newTodo, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(['clients'], context?.previousClients);
    },
    onSettled: () => {
      // Always refetch after error or success:
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const handleDelete = (id: string) => {
    deleteClientMutation.mutate(id);
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
        <p className="text-red-500">Erro ao carregar clientes.</p>
      ) : (
        <Clients clients={clients ?? []} onDelete={handleDelete} />
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