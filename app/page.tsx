import Header from "./_components/header";
import Footer from "./_components/footer";
import SignIn from "./_components/sign-in";

import React from "react";
import Dashboard from "./_components/dashboard";
import { authOptions } from "./_lib/auth";
import { getServerSession } from "next-auth";
import { db } from "./_lib/prisma";

export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
    select: {
      isAdmin: true,
    },
  });

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-grow">
        {session?.user ? (
          user?.isAdmin ? (
            <Dashboard />
          ) : (
            <div className="text-center text-gray-300 mt-[20vh] p-4">
              <h1 className="text-2xl font-bold mt-10 mb-2">Acesso restrito!</h1>
              <p>
                Você não tem permissão para acessar esta área.
              </p>
              <br />
              <p className="text-zinc-500 text-sm">
                Entre em contato com o administrador do sistema para solicitar acesso.
              </p>
            </div>
          )
        ) : (
          <>
            <div className="text-center text-gray-300 mb-4">
              <h1 className="text-2xl font-bold mt-10 mb-2">Bem-vindo(a) ao ClientHub!</h1>
              <p>Comece a usar.</p>
            </div>

            <SignIn />

            <p className="text-gray-300 mt-16 text-center">
              Gerencie seus clientes.
            </p>
            <p className="text-center text-gray-500 m-2">
              Aqui você pode gerenciar seus clientes de forma simples e eficiente.
            </p>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
