// ClientItem.tsx
import React from "react";
import { Prisma } from "@prisma/client";

type ClientWithOrders = Prisma.ClientGetPayload<{
  select: {
    id: true;
    name: true;
    fantasyName: true;
    orders: {
      select: {
        id: true;
        totalValue: true;
        discount: true;
        createdAt: true;
        client: {
          select: {
            fantasyName: true;
          };
        };
      };
    };
  };
}>;

interface ClientItemProps {
  client: ClientWithOrders;
}

const ClientItem: React.FC<ClientItemProps> = ({ client }) => {
  return (
    <>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{client.name ?? 'N/A'}</td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{client.fantasyName ?? 'N/A'}</td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">{client.orders.length}</td>
    </>
  );
}

export default ClientItem;