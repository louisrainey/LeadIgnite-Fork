import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { PropertyDetails } from '@/types/maps';
const PropertyCard: React.FC<{ property: PropertyDetails }> = ({
  property
}) => {
  const altPhotos = property.alt_photos.split(', ');

  return (
    <Card className="mx-auto max-w-lg">
      <CardContent className="p-4">
        <div className="mb-4">
          <Carousel className="w-full">
            <CarouselContent className="w-full">
              {[property.primary_photo, ...altPhotos].map((photo, index) => (
                <CarouselItem key={index} className="w-full">
                  <Image
                    src={photo}
                    alt={`Property Image ${index + 1}`}
                    width={600}
                    height={400}
                    className="h-full w-full rounded-md object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div>
          <h4 className="font-semibold">
            {property.street}, {property.city}, {property.state}{' '}
            {property.zip_code}
          </h4>
          <p>Est. Value: ${property.list_price.toLocaleString()}</p>
          <p>Last Sale: {property.last_sold_date}</p>
          <p>Sold Price: ${property.sold_price.toLocaleString()}</p>
          <p>
            {property.beds} bed | {property.full_baths} full bath |{' '}
            {property.sqft} sqft
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
