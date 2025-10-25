import React, { useState, useEffect } from 'react';
import ApartmentCard from '../../components/ServiceCard';
import LoadingSpinner from '../../components/LoadingSpinner';

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
}

const Hotels: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Toutes les villes');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hotels, setHotels] = useState<{ [key: string]: Hotel[] }>({});

  useEffect(() => {
    // Simulation d'un chargement asynchrone
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
            images: ['/assets/hero/hero1.jpg', '/assets/hero/hero2.jpg']
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
            images: ['/assets/hero/hero3.jpg', '/assets/hero/hero4.jpg']
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
            images: ['/assets/hero/hero5.jpg', '/assets/hero/hero6.jpg']
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
            images: ['/assets/hero/hero1.jpg', '/assets/hero/hero2.jpg']
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nos Hôtels de Charme</h1>
      
      <div className="mb-8 flex justify-center">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {allCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedHotels.length > 0 ? (
          displayedHotels.map((hotel) => (
            <div key={hotel.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={hotel.images[0]} 
                  alt={hotel.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{hotel.title}</h3>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < hotel.stars ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{hotel.address}</p>
                <p className="text-gray-700 mb-3 line-clamp-2">{hotel.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {hotel.amenities?.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-primary">{hotel.price} DH <span className="text-sm text-gray-500">/nuit</span></span>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Aucun hôtel disponible pour le moment dans cette ville.
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
