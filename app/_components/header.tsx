"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { House, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import LogOut from "./logout";
import { Badge } from "./ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface User {
    email: string;
    name: string | null;
    image: string | null;
    isAdmin: boolean;
}

const Header = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user');
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        };

        fetchUser();
    }, []);

    return (
        <header>
            <Card className="rounded-sm bg-card">
                {user ? (
                    <CardContent className="py-5 sm:px-16 flex items-center justify-between">
                        <Link href="/">
                            <div className="flex flex-col gap-2 items-center">
                                <Image src="/logoipsum-280.svg" alt="ClientHub" height={30} width={30} />
                                <span className="text-sm">
                                    ClientHub
                                </span>
                                <Badge variant="outline" className="text-zinc-400">
                                    Beta
                                </Badge>
                            </div>
                        </Link>
                        <div className="flex gap-2 items-center">
                            <Link href="/">
                                <Button variant="ghost" asChild>
                                    <div className="flex items-center gap-1">
                                        <House size={16} />
                                        <span>
                                            Início
                                        </span>
                                    </div>
                                </Button>
                            </Link>
                            {user?.isAdmin ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar className="border border-primary">
                                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="mx-4 w-60">
                                        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <Link href="/profile">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <User />
                                                Perfil
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem>
                                            <div className="flex items-center gap-2 cursor-not-allowed">
                                                <Settings />
                                                Configurações
                                                <Badge variant="outline" className="text-zinc-400 text-xs">
                                                    Em breve
                                                </Badge>
                                            </div>
                                        </DropdownMenuItem>
                                        <Separator className="my-1" />
                                        <DropdownMenuItem>
                                            <LogOut />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <LogOut />
                            )}
                        </div>
                    </CardContent>
                ) : (
                    <CardContent className="py-5 sm:px-16">
                        <Link href="/">
                            <div className="flex flex-col gap-2 items-center">
                                <Image src="/logoipsum-280.svg" alt="ClientHub" height={30} width={30} />
                                <span className="text-sm text-zinc-400">
                                    ClientHub
                                </span>
                                <Badge variant="outline">
                                    Beta
                                </Badge>
                            </div>
                        </Link>
                    </CardContent>
                )}
            </Card>
        </header>
    );
};

export default Header;
