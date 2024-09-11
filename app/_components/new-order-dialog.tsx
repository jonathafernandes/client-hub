import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Prisma } from "@prisma/client";
import { Button } from "./ui/button";

type NewOrderDialog = Prisma.ProductGetPayload<{
    select: { name: true; price: true; }
}>;

interface NewOrderDialogProps {
    products: NewOrderDialog[];
}

const NewOrderDialog = ({ products }: NewOrderDialogProps) => {
    const [selectedProducts, setSelectedProducts] = useState<NewOrderDialog[]>([]);
    const [currentProduct, setCurrentProduct] = useState<string>(products[0]?.name || "");

    const calculateTotal = () => {
        return selectedProducts.reduce((total, product) => total + Number(product.price), 0);
    };

    const handleAddProduct = () => {
        const productToAdd = products.find(p => p.name === currentProduct);
        if (productToAdd) {
            setSelectedProducts([...selectedProducts, productToAdd]);
        }
    };

    const handleRemoveProduct = (index: number) => {
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    };

    return (
        <DialogContent className="p-4 rounded-sm font-[family-name:var(--font-geist-sans)] max-h-[90%] w-11/12 overflow-x-auto">
            <DialogHeader>
                <DialogTitle className="text-base uppercase">Novo pedido</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <div className="flex space-x-2">
                    <select
                        name="product"
                        className="product-item flex-grow custom-font bg-slate-900 p-2 rounded-sm border"
                        value={currentProduct}
                        onChange={(e) => setCurrentProduct(e.target.value)}
                    >
                        {products.map((product) => (
                            <option key={product.name!} value={product.name!}>
                                {product.name} - R${Number(product.price).toLocaleString('pt-BR')}
                            </option>
                        ))}
                    </select>
                    <Button onClick={handleAddProduct}>Adicionar</Button>
                </div>
                <div className="mt-4">
                    {selectedProducts.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhum produto adicionado</p>
                    ) : (
                        <>
                            <h3 className="text-sm font-semibold mb-2">Produtos selecionados:</h3>
                            <ul className="space-y-2">
                                {selectedProducts.map((product, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span>{product.name} - R${Number(product.price).toLocaleString('pt-BR')}</span>
                                        <Button variant="destructive" size="sm" onClick={() => handleRemoveProduct(index)}>Remover</Button>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 text-right">
                                <h3 className="text-sm font-semibold">Total:</h3>
                                <p className="text-lg font-bold">R${calculateTotal().toLocaleString('pt-BR')}</p>
                            </div>
                            <Button className="mt-8" onClick={() => console.log(selectedProducts)}>Finalizar pedido</Button>
                        </>
                    )}
                </div>
            </div>
        </DialogContent>
    );
};

export default NewOrderDialog;
