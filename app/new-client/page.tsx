"use client";

import React from "react";
import Header from "../_components/header";
import Footer from "../_components/footer";
import { Button } from "../_components/ui/button";
import { useForm } from "react-hook-form";
import { saveClient } from "../_actions/save-client";
import { ClientParams } from "../_actions/save-client";

const NewClientPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ClientParams>();

    const onSubmit = async (data: ClientParams) => {
        try {
            await saveClient({
                name: data.name ?? "",
                fantasyName: data.fantasyName ?? "",
                corporateName: data.corporateName ?? "",
                email: data.email ?? "",
                address: data.address ?? "",
                phone: data.phone ?? "",
                zipCode: data.zipCode ?? "",
                district: data.district ?? "",
                city: data.city ?? "",
                cnpjOrCpf: data.cnpjOrCpf ?? "",
            });

            setTimeout(() => {
                alert("Cliente cadastrado com sucesso!");
                reset();
            }, 500);
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            alert("Erro ao cadastrar cliente!");
        }
    };


    return (
        <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
            <Header />
            <h1 className="text-lg font-bold border-b p-5">Novo cliente</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg p-6 my-0 mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                        className="bg-gray-900 mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
                    />
                </div>

                <Button
                    variant="default"
                    type="submit"
                >
                    Salvar
                </Button>
            </form>
            <Footer />
        </div>
    );
};

export default NewClientPage;
