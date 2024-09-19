import { db } from '../../_lib/prisma';
import { NextResponse } from "next/server";

export const GET = async () => {
    const products = await db.product.findMany();
    return NextResponse.json(products, { status: 201 });
}