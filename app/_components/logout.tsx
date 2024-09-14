"use client"

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react"
import { LogOutIcon } from "lucide-react";

const LogOut = () => {
    const handleLogOutClick = () => signOut();

    return (
        <Button variant="ghost" className="p-2" asChild onClick={handleLogOutClick}>
            <div className="flex items-center gap-2">
                <LogOutIcon size={16} />
                <span>
                    Sair
                </span>
            </div>
        </Button>
    );
}

export default LogOut;