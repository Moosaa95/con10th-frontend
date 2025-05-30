"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent} from "@/components/ui/card";
import { offersData } from '@/testData';
import { IOffer } from '@/types/expert';
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star as StarIcon } from 'lucide-react';
import { MessageCircle, Bookmark, ThumbsUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Arrow } from '@radix-ui/react-select';
import Ratings from '@/components/profile/Ratings';

// const calculateAverage = (numbers: number[]): number => {
//   return numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
// };

// const getRatingCount = (ratings: Array<{ rating: number }>, stars: number) => {
//   return ratings.filter(r => Math.floor(r.rating) === stars).length;
// };


// const RatingBar = ({ stars, count }) => (
//   <div className="flex items-center space-x-2 text-sm">
//     <span>{stars} Stars</span>
//     <div className="flex-1 h-2 bg-gray-200 rounded">
//       <div className="h-2 bg-blue-600 rounded" style={{ width: `${(count / 54) * 100}%` }}></div>
//     </div>
//     <span>({count})</span>
//   </div>
// );

export default function OfferPage() {
  const [offer, setOffer] = useState<IOffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [visibleReviews, setVisibleReviews] = useState(2);
  const params = useParams();
  const router = useRouter()

  // const Stars = ({ rating }: { rating: number }) => {
  //   return (
  //     <div className="flex items-center">
  //       {[1, 2, 3, 4, 5].map((star) => (
  //         <StarIcon
  //           key={star}
  //           className={`h-5 w-5 ${star <= rating
  //               ? 'text-black fill-gray-800'
  //               : star - rating < 1
  //                 ? 'text-black fill-gray-800/50'
  //                 : 'text-gray-300'
  //             }`}
  //         />
  //       ))}
  //       <span className="font-semibold ml-2">
  //         {rating.toFixed(1)}
  //       </span>
  //     </div>
  //   );
  // };

  useEffect(() => {
    // Simulate API call
    const fetchOffer = () => {
      const foundOffer = offersData.find(o => o.id === params.id);
      setOffer(foundOffer || null);
      setIsLoading(false);
    };
    fetchOffer();
  }, [params]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 animate-pulse">
        <div className="h-96 bg-gray-200 rounded-lg mb-8" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Offer Not Found</h2>
            <p className="text-gray-600 mb-4">The offer you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/offers">
              <Button>Browse Other Offers</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pl-24">
      <Button variant="link" onClick={() => router.back()}  className='p-2 flex items-center gap-2 text-orange-500 cursor-pointer'>
        <ArrowLeft size={20} />
        <p>Back</p>
      </Button>
      <div className="container grid grid-cols-12 mx-auto">
        <section className='col-span-8 flex flex-col gap-4'>
          <div className="relative h-[500px] w-full rounded-t-lg overflow-hidden">
            <Image
              src={offer.imageSrc}
              alt={offer.imageAlt || offer.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold text-blue-900">About</h2>
              <p>
                {offer.description}
              </p>
              <Button variant="link" className="text-blue-700">Show more</Button>
            </section>

            <section>
              <h2 className="text-xl font-bold text-blue-900">What the Expert Needs to Start the Work</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {offer.requirements.map((req, idx) => (
                  <li key={idx}><strong>📌</strong> { req}</li>
                ))}
               
              </ul>
            </section>

            {/* <section>
              <h2 className="text-xl font-bold text-blue-900">Rating and Review</h2>
              <div className="text-blue-800 font-semibold">{ offer.ratings.length} Reviews</div>
              <div className="space-y-2 w-1/2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = getRatingCount(offer.ratings, stars);
                  const percentage = (count / offer.ratings.length) * 100 || 0;
                  return (<div key={stars} className="flex items-center gap-2">
                    <span className="w-16 text-sm text-gray-700">{stars} Stars</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-600 text-right">({count})</span>
                  </div>)
                })}
                
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-blue-900">Real experiences with expert</h3>
              <div className="space-y-4 w-1/2">
                {offer.ratings.slice(0, visibleReviews).map((review, idx) => (
                  <Card key={idx} className="shadow p-4 border-none">
                    <CardContent className='border-none'>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-blue-700">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} size={16} fill={i < Math.round(review.rating) ? '#2563eb' : 'none'} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-800 mt-2">{review.review}</p>
                      <div className="flex items-center mt-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-blue-900">{review.client.first_name}</div>
                          <div className="text-xs text-gray-500">Client</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {offer.ratings.length > visibleReviews && (
                <Button 
                  variant="link" 
                  className="text-blue-700 mt-2"
                  onClick={() => setVisibleReviews(prev => 
                    prev === offer.ratings.length ? 3 : offer.ratings.length
                  )}
                >
                  {visibleReviews === offer.ratings.length ? 'Show less' : 'Show more'}
                </Button>
              )}
            </section> */}
            <Ratings ratings={offer.ratings} />
          </div>
        </section>
        <section className='col-span-4 bg-white rounded-2xl shadow-xl p-4 text-center text-gray-800'> 
            <h2 className="text-xl font-bold text-blue-900">{offer.title}</h2>
            <p className="text-green-600 text-2xl font-semibold my-2">${ offer.price}</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full rounded-full py-2 mb-4">
              Request this service
            </Button>

            <div className="flex justify-around text-sm text-gray-600 mb-4">
              <div>
                <p>Response time</p>
                <p className="font-semibold text-blue-900">1 day</p>
              </div>
              <div>
                <p>Rating</p>
                <p className="font-semibold text-blue-900">99% <span className="text-gray-500">(120 reviews)</span></p>
              </div>
              <div>
                <p>Delivery in</p>
                <p className="font-semibold text-blue-900">1 day</p>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col items-center">
              <Image
                src="/assets/images/experts/expert.png"
                alt="Expert profile"
                className="w-16 h-16 rounded-full mb-2"
                width={60}
                height={60}
              />
              <p className="text-orange-600 font-bold">Muhammad Basheer</p>
              <p className="text-green-600 text-sm">✅ Verified Expert in Design</p>
              <p className="text-gray-600 text-sm">Product Designer</p>
              <p className="text-gray-600 text-sm">📍 Nigeria</p>

              <div className="flex gap-4 my-4">
                <button className="bg-gray-100 p-2 rounded-full shadow-md">
                  <MessageCircle className="text-gray-700" size={20} />
                </button>
                <button className="bg-gray-100 p-2 rounded-full shadow-md">
                  <Bookmark className="text-gray-700" size={20} />
                </button>
                <button className="bg-gray-100 p-2 rounded-full shadow-md">
                  <ThumbsUp className="text-gray-700" size={20} />
                </button>
              </div>
            </div>

            <div className="text-left text-sm text-gray-800">
              <h3 className="text-blue-900 font-semibold mb-1">About this expert</h3>
              <p>⭐ Freelance Designer - January 2025</p>
              <p>⭐ Top 10% In Design - 2024</p>
              <p>
                Offering freelance design services for clients. I’m a freelance designer
                with 3 years of experience in the industry, dedicated to helping businesses….
              </p>
              <button className="text-orange-600 mt-2">Show more</button>
            </div>

            <div className="flex justify-between text-xs text-gray-600 mt-4">
              <p><strong>VIEWS</strong> 63,509</p>
              <p><strong>ORDERS</strong> 1,156</p>
              <p><strong>SAVE</strong> 800</p>
            </div>
        </section>
      </div>
    </div>
  );
  
}