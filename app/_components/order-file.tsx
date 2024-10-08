"use client"

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";
import { Client, OrderProduct, Orders, Product } from "@prisma/client";

interface OrderFileProps {
    order: Orders & {
        orderProducts: (OrderProduct & { product: Product })[];
    };
    client: Client;
}

const OrderFile = ({ order, client }: OrderFileProps) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        const appName = "ClientHub";
        const pageWidth = doc.internal.pageSize.width;

        doc.setFont('courier', 'normal');
        doc.setFontSize(14);
        doc.text(appName, pageWidth - 20, 20, { align: "right" });

        doc.setFillColor(162, 11, 21);
        doc.rect(20, 25, pageWidth - 40, 10, 'F');

        doc.setTextColor(255, 255, 255);

        doc.setFont('helvetica', 'normal');
        doc.text(`PEDIDO 00${order.registerNumber}`, 20, 30);

        doc.setFont('courier', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`Data: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 40);
        doc.text(`Cliente: ${client.name} - 00${client.registerNumber}`, 20, 60);
        doc.text(`Empresa: ${client.fantasyName} - ${client.corporateName}`, 20, 70);
        doc.text(`CNPJ/CPF: ${client.cnpjOrCpf}`, 20, 80);
        doc.text(`${client.address}. ${client.district} - ${client.city}`, 20, 90);
        doc.text(`Ponto de referência: ${client.referencePoint}`, 20, 100);
        doc.text(`Telefone: ${client.phone}`, 20, 110);

        autoTable(doc, {
            startY: 120,
            head: [['PRODUTO', 'QUANTIDADE', 'PREÇO UNITÁRIO']],
            body: order?.orderProducts?.map(orderProduct => [
                orderProduct.product?.name?.toUpperCase() || '', orderProduct.quantity,
                `R$${orderProduct.product?.price || '0'}`
            ]),
            theme: 'striped',
            margin: { left: 20, right: 20 },
            headStyles: {
                fillColor: [220, 220, 255],
                textColor: [0, 0, 0]
            },
            didDrawPage: (data) => {
                if (data.cursor) {
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(10);
                    doc.text(`DESCONTO: ${order.discount}%`, 20, data.cursor.y + 10);
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`TOTAL: R$${order.totalValue}`, 150, data.cursor.y + 10);
                }
            }
        });

        doc.save(`pedido_${order.id}.pdf`);
    };

    return (
        <div>
            <Button variant="default" className="p-2" onClick={generatePDF}>
                <FileDown size={16} />
            </Button>
        </div>
    );
};

export default OrderFile;
