import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  link = '#',
  className = '',
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg ${className}`}>
      <a
        href={link}
        className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
        aria-label={`En savoir plus sur ${title}`}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary-700">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <span 
            className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-800"
            aria-hidden="true"
          >
            Découvrir plus
            <svg 
              className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </a>
    </div>
  );
};

export default ServiceCard;
