import React from 'react';
import { Session as PrismaSession } from '@prisma/client';
import Footer from '../_components/footer';
import Header from '../_components/header';
import { Avatar, AvatarFallback, AvatarImage } from '../_components/ui/avatar';
import { db } from '../_lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';
import { Badge } from '../_components/ui/badge';
import { Card, CardContent } from '../_components/ui/card';
import { TriangleAlert } from 'lucide-react';

interface User {
    email: string;
    name: string | null;
    image: string | null;
    isAdmin: boolean;
}

interface CustomSession extends PrismaSession {
    user?: {
        email?: string | null;
    };
}

const ProfilePage = async () => {
    const session: CustomSession | null = await getServerSession(authOptions);

    const user: User | null = await db.user.findUnique({
        where: {
            email: session?.user?.email || "",
        },
        select: {
            email: true,
            name: true,
            image: true,
            isAdmin: true,
        },
    });

    return (
        <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main className="flex-grow text-sm mb-16 px-4 lg:px-8">
                <h1 className="text-lg font-bold border-b p-5">Perfil</h1>
                <h4 className="uppercase m-5 font-semibold">Dados pessoais</h4>
                <Card className='bg-zinc-950 mt-8'>
                    <CardContent className='p-6 flex flex-col xs:flex-row gap-4'>
                        <Avatar className="w-24 h-24 md:w-32 md:h-32">
                            <AvatarImage src={user?.image || "https:github.com/shadcn.png"} />
                            <AvatarFallback>
                                {user?.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">{user?.name}</h2>
                            <p className="text-zinc-600 mb-2">{user?.email}</p>
                            {user?.isAdmin && (
                                <Badge className='bg-secondary'>Administrador</Badge>
                            )}
                            <p className='flex flex-col md:flex-row items-start md:items-center gap-1 mt-4 text-zinc-400'>
                                <TriangleAlert size={16} /> Para alterar os dados pessoais, entre em contato com o administrador.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;
