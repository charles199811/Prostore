"use client";

import { Review } from "@/types";
import { useState } from "react";

const ReviewList = ({ userId, productId, productSlug }: {
    userId: string;
    productId: string;
    productSlug: string;
}) => {
    const [reviews, setReviews] = useState<Review[]>([])
    return ( <div className="space-y-4">
        
    </div> );
}
 
export default ReviewList;