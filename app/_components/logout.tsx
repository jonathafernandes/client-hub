"use client"

import React from "react";
import { signOut } from "next-auth/react"
import { LogOutIcon } from "lucide-react";

const LogOut = () => {
    const handleLogOutClick = () => signOut();

    return (
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogOutClick}>
            <LogOutIcon size={16} />
                Sair
        </div>
    );
}

export default LogOut;