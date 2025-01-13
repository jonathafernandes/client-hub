"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import React, { useState } from "react"
import { Card, CardContent } from "./ui/card";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleLoginWithGoogle = () => {
    setLoading(true);
    signIn("google");
  };

  return (
    <Card className="bg-card p-4 m-8 rounded-sm sm:w-1/2 sm:my-0 sm:mx-auto">
      <CardContent className="flex flex-col items-center">
        <p className="text-gray-300">
          Faça o login na plataforma
        </p>
        <p className="text-gray-500 mb-4">
          Conecte-se usando sua conta do Google.
        </p>
        <Button
          variant="outline"
          disabled={loading}
          className="gap-1 flex justify-center font-bold p-2 w-full"
          onClick={handleLoginWithGoogle}
        >
          <Image src="/google.svg" alt="Google" width={18} height={18} />
          {loading ? "Aguarde..." : "Entrar com Google"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default SignIn;