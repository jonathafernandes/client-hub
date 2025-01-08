"use client"

import React from "react";
import { signOut } from "next-auth/react"
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";

const LogOut = () => {
    const handleLogOutClick = () => signOut();

    return (
        <Button variant="outline" className="flex w-full items-center gap-2" onClick={handleLogOutClick}>
            <LogOutIcon size={16} />
                Sair
        </Button>
    );
}

export default LogOut;  