"use client"

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";
import { Client, Orders, Product } from "@prisma/client";

interface OrderFileProps {
    order: Orders;
    products: Product[];
    client: Client;
}

const OrderFile = ({ order, products, client }: OrderFileProps) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        const appName = "ClientHub";
        const pageWidth = doc.internal.pageSize.width;

        // Definir fonte padrão
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
        doc.text(`${client.address}. ${client.district} - ${client.city}`, 20, 80);
        doc.text(`Ponto de referência: ${client.referencePoint}`, 20, 90);
        doc.text(`Telefone: ${client.phone}`, 20, 100);

        autoTable(doc, {
            startY: 110,
            head: [['PRODUTO', 'PREÇO']],
            body: products.map(product => [product.name?.toUpperCase() || '', `R$${product.price}`]),
            theme: 'striped',
            margin: { left: 20, right: 20 },
            headStyles: { 
                fillColor: [220, 220, 255],
                textColor: [0, 0, 0]
            },
            didDrawPage: (data) => {
                if (data.cursor) {
                    doc.setFont('helvetica', 'bold');
                    doc.text(`TOTAL: R$${order.totalValue}`, 20, data.cursor.y + 10);
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
