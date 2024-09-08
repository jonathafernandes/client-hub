import Header from "./_components/header";
import Footer from "./_components/footer";
import SignInDialog from "./_components/sign-in-dialog";

import React from "react";
import Dashboard from "./_components/dashboard";

export default function Home() {
  const isSignedIn = true;

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-grow">
        {isSignedIn ? (
          <Dashboard />
        ) : (
          <>
            <p className="text-gray-300 mt-4 text-center">Gerencie seus clientes.</p><div className="text-center text-gray-300">
              <p className="text-center text-gray-500 mt-2">
                Aqui você pode gerenciar seus clientes de forma simples e eficiente.
              </p>
              <h1 className="text-2xl font-bold mt-10 mb-2">Bem-vindo(a) ao ClientHub!</h1>
              <p>Comece a usar.</p>
            </div>
            <SignInDialog />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
