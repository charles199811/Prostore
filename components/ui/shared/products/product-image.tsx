'use client';
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProductImages = ({ image }: { image: string[] }) => {
    const [current, setCurrent] = useState(0);

    return <div className="space-y-4">
        <Image
            src={image[current]}
            alt='product image'
            width={1000}
            height={1000}
            className="min-h-[300px] object-cover object-center"/>

            <div className="flex">
                {image.map((image, index) => (
                    <div key = {image} onClick={() => setCurrent(index)} className={cn(
                        'border mr-2 cursor-pointer hover:border-orange-600', 
                        current === index && 'border-orange-500'
                )}>
                        <Image
                            src={image}
                            alt= 'image'
                            width={100}
                            height={100}
                            />
                    </div>
                ))}
            </div>
    </div>;
};

export default ProductImages;