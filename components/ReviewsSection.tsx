import { starRatings } from "@/lib/RatingStars";
import { Separator } from "./ui/separator";
import { ArrowDown } from "lucide-react";

interface Review {
    id: string;
    review: string;
    rating: number;
    user: {
        firstName: string;
        lastName: string;
    },
    createdAt: string;
}

const ReviewsSection = ({reviews}: {reviews: Review[]}) => {
    return (
        <section className="pt-24 pb-8">
            <Separator className="my-12"/>
            {/* Header */}
            <div className="flex flex-col gap-2 items-center text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl italic">The Atelier Voice</h2>
                <p className="text-gray-500">{reviews.length} Reviews</p>
            </div>
            {/* Reviews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
                {reviews.map(review => (
                    <div className="flex flex-col items-start gap-4 border-t-2 border-gray-200" key={review.id}>
                        <div className="flex items-center mt-6">
                            {starRatings(review.rating)}
                            <p className="text-gray-500 pl-3 font-bold">{review.rating}</p>
                        </div>
                        <blockquote className="text-gray-500 italic font-semibold">
                            "{review.review}"
                        </blockquote>
                        <footer className="flex flex-col items-start gap-2">
                            <p className="text-gray-500">{review.user.firstName} {review.user.lastName}</p>
                            <p className="text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </footer>
                    </div>
                ))}
            </div>
            {reviews.length === 0 && (
                <p className="text-gray-500 text-center mt-12">No reviews found</p>
            )}
            {reviews.length > 4 && (
                <div className="flex items-center justify-center mt-6">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#111827] text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
                        Load More Reviews
                        <ArrowDown className="size-4"/>
                    </button>
                </div>
            )}
            <Separator className="my-12"/>
        </section>
    )
}

export default ReviewsSection