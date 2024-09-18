import React, { useState, useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Prisma } from "@prisma/client";
import { Button } from "./ui/button";

type NewOrderDialog = Prisma.ProductGetPayload<{
    select: { id: true; name: true; price: true; }
}>;

interface NewOrderDialogProps {
    products: NewOrderDialog[];
    clientId: string;
}

const NewOrderDialog = ({ products, clientId }: NewOrderDialogProps) => {
    const [selectedProducts, setSelectedProducts] = useState<NewOrderDialog[]>([]);
    const [currentProduct, setCurrentProduct] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState<number>(0);

    useEffect(() => {
        if (products.length > 0 && products[0].name) {
            setCurrentProduct(products[0].name);
        }
    }, [products]);

    const calculateTotal = () => {
        const subtotal = selectedProducts.reduce((total, product) => total + Number(product.price), 0);
        const discountAmount = (subtotal * selectedDiscount) / 100;
        return subtotal - discountAmount;
    };

    const handleAddProduct = () => {
        const productToAdd = products.find(p => p.name === currentProduct);
        if (productToAdd && productToAdd.id) {
            setSelectedProducts(prev => [...prev, productToAdd]);
        } else {
            console.error('Produto não encontrado ou sem ID:', currentProduct, productToAdd);
        }
    };

    const handleRemoveProduct = (index: number) => {
        setSelectedProducts(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmitOrder = async () => {
        if (selectedProducts.length === 0 || !clientId) {
            return;
        }

        setIsSubmitting(true);
        try {
            const orderProducts = selectedProducts.map((product, index) => {
                if (!product.id) {
                    console.error(`Produto sem ID encontrado no índice ${index}:`, product);
                    throw new Error(`Produto sem ID encontrado: ${product.name}`);
                }
                return { id: product.id };
            });

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId,
                    products: orderProducts,
                    totalValue: calculateTotal(),
                    discount: selectedDiscount,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao salvar o pedido: ${response.statusText}. Detalhes: ${errorText}`);
            }

            alert('Pedido salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o pedido:', error);
            alert(`Ocorreu um erro ao salvar o pedido: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
        }
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
                            <option key={product.id} value={product.name || ''}>
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
                            <div className="flex space-x-2 mt-4">
                                <label htmlFor="discount" className="text-sm font-semibold">Desconto:</label>
                                <select
                                    id="discount"
                                    className="discount-select flex-grow custom-font bg-slate-900 p-2 rounded-sm border"
                                    value={selectedDiscount}
                                    onChange={(e) => setSelectedDiscount(Number(e.target.value))}
                                >
                                    <option value={0}>Sem desconto</option>
                                    <option value={5}>5% de desconto</option>
                                    <option value={10}>10% de desconto</option>
                                    <option value={15}>15% de desconto</option>
                                </select>
                            </div>
                            <div className="mt-8 text-right">
                                <h3 className="text-sm font-semibold">Total:</h3>
                                <p className="text-lg font-bold">R${calculateTotal().toLocaleString('pt-BR')}</p>
                            </div>
                            <Button
                                className="mt-8"
                                onClick={handleSubmitOrder}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Salvando...' : 'Finalizar pedido'}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </DialogContent>
    );
};

export default NewOrderDialog;
