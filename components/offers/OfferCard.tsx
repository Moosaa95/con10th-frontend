import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IOffer } from '@/types/expert';

interface OfferCardProps {
  offer: IOffer;
  className?: string;
}

export default function OfferCard({ offer, className = "" }: OfferCardProps) {
  // Calculate average rating
  const avgRating = offer.ratings.reduce((acc, curr) => acc + curr.rating, 0) / offer.ratings.length;
  
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      <div className="relative h-48 w-full">
        <Image
          src={offer.imageSrc}
          alt={offer.imageAlt || offer.title}
          fill
          className="object-cover"
        />
      </div>
      
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-2">{offer.title}</h3>
          <Badge variant="secondary" className="text-orange-500 bg-orange-50">
            ${offer.price}
          </Badge>
        </div>
        
        <Link href={`/experts/${offer.expert.expert_id}`} className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={offer.expert.profile_picture} />
            <AvatarFallback>{offer.expert.first_name[0]}{offer.expert.last_name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{offer.expert.first_name} {offer.expert.last_name}</span>
            <span className="text-xs text-muted-foreground">{offer.expert.title}</span>
          </div>
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {offer.description}
        </p>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{avgRating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({offer.ratings.length} reviews)
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Link href={`/offers/${offer.id}`} className="w-[48%]">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        {/* <Button variant="outline" className="w-[48%]">
          View Details
        </Button> */}
        <Button className="w-[48%] bg-orange-500 hover:bg-orange-600">
          Order Now
        </Button>
      </CardFooter>
    </Card>
  );
}
