import React, { useState } from "react";
import { Client } from "@prisma/client";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { ClientParams, updateClient } from "../_actions/update-client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface EditClientDialogProps {
    client: Client;
}

const EditClientDialog = ({ client }: EditClientDialogProps) => {
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ClientParams>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: ClientParams) => {
        setIsSubmitting(true);

        try {
            await updateClient({
                name: data.name,
                fantasyName: data.fantasyName,
                corporateName: data.corporateName,
                email: data.email,
                address: data.address,
                phone: data.phone,
                zipCode: data.zipCode,
                district: data.district,
                city: data.city,
                cnpjOrCpf: data.cnpjOrCpf,
                id: client.id,
            });

            setTimeout(() => {
                toast.success("Cliente salvo com sucesso!");
                reset();
                setIsSubmitting(false);
                queryClient.invalidateQueries({
                    queryKey: ['clients'],
                });
            }, 500);
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            toast.error("Erro ao cadastrar cliente! Tente novamente.");
            setIsSubmitting(false);
        }
    };

    return (
        <DialogContent className="p-4 rounded-sm font-[family-name:var(--font-geist-sans)] max-h-[90%] w-11/12 overflow-x-auto">
            <DialogHeader>
                <DialogTitle className="text-base uppercase">Editar cliente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        defaultValue={client.name?.toString()}
                    />
                    {errors?.name?.type === "required" && <span className="text-red-500 text-sm">Campo obrigatório!</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="fantasyName" className="block text-sm font-medium text-gray-300">
                        Nome fantasia
                    </label>
                    <input
                        type="text"
                        id="fantasyName"
                        {...register("fantasyName")}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        defaultValue={client.fantasyName?.toString()}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="corporateName" className="block text-sm font-medium text-gray-300">
                        Razão social
                    </label>
                    <input
                        type="text"
                        id="corporateName"
                        {...register("corporateName")}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        defaultValue={client.corporateName?.toString()}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cnpjOrCpf" className="block text-sm font-medium text-gray-300">
                        CPF/CNPJ
                    </label>
                    <input
                        type="text"
                        id="cnpjOrCpf"
                        {...register("cnpjOrCpf")}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        defaultValue={client.cnpjOrCpf?.toString()}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                        Telefone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        {...register("phone")}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        defaultValue={client.phone?.toString()}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        defaultValue={client.email?.toString()}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                        Endereço
                    </label>
                    <input
                        type="text"
                        id="address"
                        {...register("address")}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        defaultValue={client.address?.toString()}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-300">
                            Bairro
                        </label>
                        <input
                            type="text"
                            id="district"
                            {...register("district")}
                            className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                            defaultValue={client.district?.toString()}
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                            Cidade
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register("city")}
                            className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                            defaultValue={client.city?.toString()}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300">
                        CEP
                    </label>
                    <input
                        type="text"
                        id="zipCode"
                        {...register("zipCode")}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        defaultValue={client.zipCode?.toString()}
                    />
                </div>

                <Button
                    variant="default"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                >
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
            </form>
        </DialogContent>
    )
};

export default EditClientDialog;