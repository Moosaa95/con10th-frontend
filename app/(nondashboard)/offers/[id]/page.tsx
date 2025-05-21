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

export default function OfferPage({ params }: { params: { id: string } }) {
  const [offer, setOffer] = useState<IOffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchOffer = () => {
      const foundOffer = offersData.find(o => o.id === params.id);
      setOffer(foundOffer || null);
      setIsLoading(false);
    };
    fetchOffer();
  }, [params.id]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image and Basic Info */}
            <Card>
              <div className="relative h-[400px] w-full rounded-t-lg overflow-hidden">
                <Image
                  src={offer.imageSrc}
                  alt={offer.imageAlt || offer.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">{offer.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">
                          {(offer.ratings.reduce((acc, curr) => acc + curr.rating, 0) / offer.ratings.length).toFixed(1)}
                        </span>
                        <span className="ml-1">({offer.ratings.length} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{offer.expert.response_time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg">
                    ${offer.price}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs Section */}
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="description" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-4">
                    <p className="text-gray-600">{offer.description}</p>
                  </TabsContent>

                  <TabsContent value="requirements">
                    <ul className="space-y-3">
                      {offer.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-6">
                    {offer.ratings.map((rating, index) => (
                      <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={rating.client.profile_picture} />
                              <AvatarFallback>
                                {rating.client.first_name[0]}{rating.client.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {rating.client.first_name} {rating.client.last_name}
                              </p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < rating.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-200 text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(rating.date).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-600">{rating.review}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expert Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Expert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={offer.expert.profile_picture} />
                    <AvatarFallback>
                      {offer.expert.first_name[0]}{offer.expert.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {offer.expert.first_name} {offer.expert.last_name}
                    </h3>
                    <p className="text-sm text-gray-600">{offer.expert.title}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{offer.expert.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({offer.expert.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p>🌍 {offer.expert.location}</p>
                  <p>💼 {offer.expert.experience_level}</p>
                  <p>⚡ {offer.expert.response_time}</p>
                </div>
                <Link href={`/experts/${offer.expert.expert_id}`}>
                  <Button className="w-full mt-4" variant="outline">
                    View Full Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Action Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Order Now - ${offer.price}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Expert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}