import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import BookingForm from '../../components/BookingForm';
import { useNavigate } from 'react-router-dom';

interface Hotel {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  images: string[];
  stars: number;
  amenities?: string[];
  link?: string;
}

interface HotelsProps {
  onBookNow?: (hotel: Hotel) => void;
}

const HotelCard: React.FC<{ hotel: Hotel; onBookNow?: (hotel: Hotel) => void }> = ({ hotel, onBookNow }) => {
  const navigate = useNavigate();
  const { id, title, description, images, stars, price, amenities = [] } = hotel;

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBookNow) onBookNow(hotel);
    else navigate(`/booking/${id}`);
  };

  return (
    <div className="relative group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={images[0] || '/assets/hero/hero1.jpg'}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {price.toLocaleString()} MAD/nuit
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>

        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-xs text-gray-500 self-center">+{amenities.length - 3} plus</span>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleBookNow}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-black text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

const Hotels: React.FC<HotelsProps> = ({ onBookNow }) => {
  const [hotels, setHotels] = useState<{ [key: string]: Hotel[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>('Toutes les villes');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const handleCloseBookingForm = () => {
    setIsBookingFormOpen(false);
    setSelectedHotel(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHotels({
        'Marrakech': [
          {
            id: 'mar1',
            title: 'Hôtel Palais Royal',
            description: 'Un hôtel 5 étoiles de luxe au cœur de Marrakech, offrant des chambres élégantes, une piscine extérieure et un spa de renommée mondiale.',
            price: 2500,
            address: 'Route de la Palmeraie',
            city: 'Marrakech',
            stars: 5,
            amenities: ['Piscine', 'Spa', 'Restaurant gastronomique', 'Navette aéroport'],
            images: ['/assets/APT/IFRANE/apt1/1.jpg', '/assets/APT/IFRANE/apt1/2.jpg']
          },
          {
            id: 'mar2',
            title: 'Riad Enchanté',
            description: 'Riad traditionnel marocain avec une touche moderne. Situé dans la médina, à quelques pas de la place Jemaa el-Fna.',
            price: 1200,
            address: 'Médina',
            city: 'Marrakech',
            stars: 4,
            amenities: ['Petit-déjeuner inclus', 'Terrasse sur le toit', 'Wifi gratuit'],
            images: ['/assets/APT/MARRAKECH/apt1/1.jpg', '/assets/APT/MARRAKECH/apt1/2.jpg']
          }
        ],
        'Agadir': [
          {
            id: 'aga1',
            title: 'Resort & Spa Océan',
            description: 'Complexe hôtelier face à la mer avec accès direct à la plage. Parfait pour des vacances détente en bord de mer.',
            price: 1800,
            address: 'Boulevard du 20 Août',
            city: 'Agadir',
            stars: 5,
            amenities: ['Plage privée', '3 piscines', '4 restaurants', 'Spa', 'Club enfants'],
            images: ['/assets/APT/AGADIR/APPART1/6.jpg', '/assets/APT/AGADIR/APPART1/7.jpg']
          },
          {
            id: 'aga2',
            title: 'Hôtel Les Dunes d\'Or',
            description: 'Hôtel 4 étoiles avec vue panoramique sur la baie d\'Agadir. Piscine extérieure et animations en soirée.',
            price: 1400,
            address: 'Avenue des FAR',
            city: 'Agadir',
            stars: 4,
            amenities: ['Piscine chauffée', 'Spa', 'Restaurant à thème', 'Animation soirée'],
            images: ['/assets/APT/AGADIR/APPART2/3.jpg', '/assets/APT/AGADIR/APPART2/2.jpg']
          }
        ],
        'Casablanca': [
          {
            id: 'cas1',
            title: 'Hôtel Business Premium',
            description: 'Hôtel d\'affaires moderne situé dans le quartier des affaires de Casablanca. Idéal pour les voyageurs professionnels.',
            price: 1500,
            address: 'Anfa Place',
            city: 'Casablanca',
            stars: 4,
            amenities: ['Centre d\'affaires', 'Salle de sport', 'Room service 24/7', 'Navette aéroport'],
            images: ['/assets/APT/TANGER/apt1/1.jpg', '/assets/APT/TANGER/apt1/2.jpg']
          }
        ],
        'Fès': [
          {
            id: 'fes1',
            title: 'Riad Authentique',
            description: 'Riad traditionnel au cœur de la médina de Fès, classée au patrimoine mondial de l\'UNESCO. Décoration artisanale et atmosphère chaleureuse.',
            price: 900,
            address: 'Médina de Fès',
            city: 'Fès',
            stars: 3,
            amenities: ['Cours intérieure', 'Terrasse panoramique', 'Cuisine marocaine traditionnelle'],
            images: ['/assets/APT/TANGER/apt2/5.jpg', '/assets/APT/TANGER/apt2/6.jpg']
          }
        ]
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const allCities = ['Toutes les villes', ...Object.keys(hotels)];
  const displayedHotels = selectedCity === 'Toutes les villes'
    ? Object.values(hotels).flat()
    : hotels[selectedCity] || [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- Section de présentation touristique --- */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-16 px-6 text-center rounded-b-3xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Découvrez les plus beaux hôtels du Maroc</h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Profitez d’un séjour inoubliable dans nos hôtels et riads d’exception. Que ce soit pour un voyage romantique, des vacances en famille ou un séjour d’affaires, nous avons sélectionné pour vous les meilleures adresses à travers le Maroc.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtre par ville */}
        <div className="mb-8">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="Toutes les villes">Toutes les villes</option>
            {Object.keys(hotels).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Grid des hôtels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onBookNow={onBookNow} />
          ))}
        </div>
      </div>

      <BookingForm 
        isOpen={isBookingFormOpen} 
        onClose={handleCloseBookingForm} 
        apartment={selectedHotel} 
      />
    </div>
  );
};

export default Hotels;
