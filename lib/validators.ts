// import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z
    .string()
    .refine(
        (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
        'Price must have exactly two decimal places'
    );

// schema for inserting products
export const insertProductSchema = z.object({

    name: z.string().min(3, 'Name must be at least 3 characters long'),
    slug: z.string().min(3, 'Slug must be at least 3 characters long'),
    category: z.string().min(3, 'Category must be at least 3 characters long'),
    brand: z.string().min(3, 'Brand must be at least 3 characters long'),
    description: z.string().min(3, 'Description must be at least 3 characters long'),
    stock: z.coerce.number(),
    image: z.array(z.string()).min(1, 'At least one image is required'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
});

//schema for signin user
export const signInFormScema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 charachters')
});
