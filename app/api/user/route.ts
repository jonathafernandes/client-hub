import { NextResponse } from 'next/server';
import { db } from '../../_lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../_lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email },
        select: {
            email: true,
            name: true,
            image: true,
            isAdmin: true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
}
