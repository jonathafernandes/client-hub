"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";


const Header = () => {
    return (
        <header>
            <Card className="rounded-sm bg-secondary">
                <CardContent className="p-5">
                    <Link href="/">
                        <div className="flex flex-col gap-2 items-center">
                            <Image src="/logoipsum-280.svg" alt="ClientHub" height={18} width={50} />
                            <span className="text-sm text-zinc-400">
                                ClientHub
                            </span>
                        </div>
                    </Link>
                </CardContent>
            </Card>
        </header>
    );
};

export default Header;