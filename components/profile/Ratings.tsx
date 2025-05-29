import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";


const getRatingCount = (ratings: Array<{ rating: number }>, stars: number) => {
  return ratings.filter(r => Math.floor(r.rating) === stars).length;
};

function Ratings({ ratings }: { ratings: any[] }) {
  const [visibleReviews, setVisibleReviews] = useState(2);
  return (
    <section>
      <section>
        <h2 className="text-xl font-bold text-blue-900">Rating and Review</h2>
        <div className="text-blue-800 font-semibold">
          {ratings.length} Reviews
        </div>
        <div className="space-y-2 w-1/2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = getRatingCount(ratings, stars);
            const percentage = (count / ratings.length) * 100 || 0;
            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-16 text-sm text-gray-700">
                  {stars} Stars
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-gray-600 text-right">
                  ({count})
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-blue-900">
          Real experiences with expert
        </h3>
        <div className="space-y-4">
          {ratings.slice(0, visibleReviews).map((review, idx) => (
            <Card key={idx} className="p-4 border-none">
              <CardContent className="border-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-blue-700">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        fill={
                          i < Math.round(review.rating) ? "#2563eb" : "none"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
                <p className="text-sm text-gray-800 mt-2">{review.review}</p>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-blue-900">
                      {review.client.first_name}
                    </div>
                    <div className="text-xs text-gray-500">Client</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {ratings.length > visibleReviews && (
          <Button
            variant="link"
            className="text-blue-700 mt-2"
            onClick={() =>
              setVisibleReviews((prev) =>
                prev === ratings.length ? 3 : ratings.length
              )
            }
          >
            {visibleReviews === ratings.length
              ? "Show less"
              : "Show more"}
          </Button>
        )}
      </section>
    </section>
  );
}

export default Ratings;
