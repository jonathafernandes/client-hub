import Image from "next/image"
import { Button } from "./ui/button"
import React from "react"
import { Card, CardContent } from "./ui/card";

const SignInDialog = () => {
  return (
    <Card className="bg-card mx-4 mt-8 rounded-sm">
      <CardContent className="flex flex-col items-center">
        <p className="text-gray-300">
          Faça o login na plataforma
        </p>
        <p className="text-gray-500 mb-4">
          Conecte-se usando sua conta do Google.
        </p>
        <Button
          variant="outline"
          className="gap-1 flex justify-center font-bold p-2 w-full"
        >
          <Image src="/google.svg" alt="Google" width={18} height={18} />
          Entrar com Google
        </Button>
      </CardContent>
    </Card>
  )
}

export default SignInDialog;