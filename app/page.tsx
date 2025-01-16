import React from "react";
import Footer from "./_components/footer";
import SignIn from "./_components/sign-in";
import Dashboard from "./_components/dashboard";
import { authOptions } from "./_lib/auth";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import Header from "./_components/header";

export const fetchCache = "force-no-store";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-grow">
        {session?.user ? (
          session.user.isAdmin ? (
            <Dashboard />
          ) : (
            <div className="text-center text-gray-300 mt-[20vh] p-4">
              <h1 className="text-2xl font-bold mt-10 mb-2">Acesso restrito!</h1>
              <p>Você não tem permissão para acessar esta área.</p>
              <br />
              <p className="text-zinc-500 text-sm">
                Entre em contato com o administrador do sistema para solicitar
                acesso.
              </p>
            </div>
          )
        ) : (
          <>
            <div className="text-center text-gray-300 mb-4">
              <h1 className="text-2xl font-bold mt-10 mb-2">
                Bem-vindo(a) ao ClientHub!
              </h1>
            </div>

            <SignIn />

            <p className="text-center text-gray-500 mt-16">
              Plataforma de gerenciamento de clientes.
            </p>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
