import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { House } from "lucide-react";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";


const Header = async () => {
    const session = await getServerSession(authOptions);

    return (
        <header>
            <Card className="rounded-sm bg-secondary">
                {session?.user ? (
                    <CardContent className="py-5 sm:px-16 flex items-center justify-between">
                        <Link href="/">
                            <div className="flex flex-col gap-2 items-center">
                                <Image src="/logoipsum-280.svg" alt="ClientHub" height={18} width={50} />
                                <span className="text-sm text-zinc-400">
                                    ClientHub
                                </span>
                            </div>
                        </Link>
                        <Link href="/">
                            <Button variant="ghost" className="p-2" asChild>
                                <div className="flex items-center gap-2">
                                    <House size={16} />
                                    <span>
                                        Início
                                    </span>
                                </div>
                            </Button>
                        </Link>
                    </CardContent>
                ) : (
                    <CardContent className="py-5 sm:px-16">
                        <Link href="/">
                            <div className="flex flex-col gap-2 items-center">
                                <Image src="/logoipsum-280.svg" alt="ClientHub" height={18} width={50} />
                                <span className="text-sm text-zinc-400">
                                    ClientHub
                                </span>
                            </div>
                        </Link>
                    </CardContent>
                )
                }
            </Card>
        </header>
    );
};

export default Header;