import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image?: string; // ✅ nouveau champ accepté
  images?: string[]; // toujours possible
  price: number;
  rating?: number;
  duration?: string;
  tags?: string[];
  link?: string;
  className?: string;
}

const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatImageUrl = (image: string) => {
    if (!image) return '/placeholder.jpg';
    if (image.startsWith('http')) return image;
    return `http://localhost:3000/${image.replace(/^\/+/, '')}`;
  };

  return (
    <div className="relative h-48 w-full overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={formatImageUrl(image)}
          alt={`${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.jpg';
          }}
        />
      ))}

      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  image,
  images = [],
  price,
  rating,
  duration,
  tags,
  link = '#',
  className = '',
}) => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/contact', {
      state: { serviceType: title.toLowerCase(), serviceId: id, serviceTitle: title, servicePrice: price },
    });
  };

  const handleCloseBooking = () => setIsBookingOpen(false);

  // ✅ On convertit "image" unique en tableau si besoin
  const safeImages = images.length > 0 ? images : image ? [image] : ['/placeholder.jpg'];

  return (
    <div className={`group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg ${className}`}>
      <Link
        to={link}
        className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
        aria-label={`En savoir plus sur ${title}`}
      >
        <ImageSlider images={safeImages} />

        <div className="p-4">
          <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary-700">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          <div className="mt-4 flex justify-between items-center">
            <div>
              <span className="text-lg font-bold">{price} MAD</span>
              {duration && <span className="ml-2 text-sm text-gray-500">• {duration}</span>}
            </div>

            <button
              onClick={handleBookNow}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Réserver
            </button>
          </div>

          {rating && (
            <div className="mt-2 flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <BookingForm
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        apartment={{ id, title, price }}
      />
    </div>
  );
};

export default ServiceCard;
