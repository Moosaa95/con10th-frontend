"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { offersData } from '@/testData';
import { IOffer } from '@/types/expert';
import { useParams } from "next/navigation";
import { Star as StarIcon } from 'lucide-react';

const calculateAverage = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
};

const getRatingCount = (ratings: Array<{ rating: number }>, stars: number) => {
  return ratings.filter(r => Math.floor(r.rating) === stars).length;
};

export default function OfferPage() {
  const [offer, setOffer] = useState<IOffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const Stars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-5 w-5 ${star <= rating
                ? 'text-black fill-gray-800'
                : star - rating < 1
                  ? 'text-black fill-gray-800/50'
                  : 'text-gray-300'
              }`}
          />
        ))}
        <span className="font-semibold ml-2">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

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
      <div className='p-2'>Back</div>
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
          <div id='education-section' className='p-5 flex flex-col  gap-4'>
            <div>
              <h1 className='font-bold'>About</h1>
              <p className='font-light text-sm'>{ offer.description}</p>
            </div>
            <div>
              <h1 className="font-bold">What the Expert Needs to Start the Work</h1>
              <p className="font-normal text-sm" >To ensure a smooth process, please provide:</p>
              <ul className="space-y-1 text-sm">
                {offer.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="font-bold mb-4">Rating and Review</h1>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">{offer.ratings.length} Reviews</p>
                <span className="text-gray-600">•</span>
                <Stars rating={calculateAverage(offer.ratings.map(r => r.rating))} />
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2 w-1/2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = getRatingCount(offer.ratings, stars);
                  const percentage = (count / offer.ratings.length) * 100 || 0;

                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="w-16 text-sm text-gray-700">{stars} Stars</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-sm text-gray-600 text-right">({count})</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="font-bold">Real Experiance with Expert</h1>
            </div>
          </div>
        </section>
        <section className='col-span-4'> 
          User
        </section>
      </div>
    </div>
  );
  
}