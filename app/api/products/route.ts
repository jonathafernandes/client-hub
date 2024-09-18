import {db} from '../../_lib/prisma';
import { NextResponse } from "next/server";

export const getProducts = async () => {
    const products =  await db.product.findMany();
    return NextResponse.json(products, { status: 201 });

}

export { getProducts as GET }
