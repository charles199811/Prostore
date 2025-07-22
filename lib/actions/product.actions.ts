'use server';

import { prisma } from '@/db/prisma';
import { convertToPlanObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

//get latest products
export async function getLatestProduct() {

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: {createdAt: 'desc'}
    });
    
    return convertToPlanObject(data);
}

//get single product by slug
export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: {slug: slug},
    });
}