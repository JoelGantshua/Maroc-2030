import React, { useState, useEffect } from 'react';
import ServiceCard from '../../components/ServiceCard';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Villa {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

const Villas: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Toutes les villes');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [villas, setVillas] = useState<{ [key: string]: Villa[] }>({});

  useEffect(() => {
    // Simulation d'un chargement asynchrone
    const timer = setTimeout(() => {
      setVillas({
        'Marrakech': [
          {
            id: 'mar1',
            title: 'Villa de luxe avec piscine',
            description: 'Magnifique villa de luxe avec piscine privée, jardin paysagé et vue sur l\'Atlas. Parfaite pour des vacances inoubliables en famille ou entre amis.',
            price: 2500,
            address: 'Quartier Palmeraie',
            city: 'Marrakech',
            bedrooms: 5,
            bathrooms: 4,
            area: 350,
            images: ['/assets/hero/hero1.jpg', '/assets/hero/hero2.jpg']
          },
          {
            id: 'mar2',
            title: 'Villa moderne avec jardin',
            description: 'Villa moderne et élégante avec jardin privatif et terrasse ensoleillée. À quelques minutes des principaux sites touristiques.',
            price: 1800,
            address: 'Quartier Hivernage',
            city: 'Marrakech',
            bedrooms: 4,
            bathrooms: 3,
            area: 280,
            images: ['/assets/hero/hero3.jpg', '/assets/hero/hero4.jpg']
          }
        ],
        'Agadir': [
          {
            id: 'aga1',
            title: 'Villa face à la mer',
            description: 'Splendide villa avec vue directe sur l\'océan. Accès privé à la plage et piscine à débordement.',
            price: 3000,
            address: 'Quartier Founty',
            city: 'Agadir',
            bedrooms: 6,
            bathrooms: 5,
            area: 400,
            images: ['/assets/APT/AGADIR/APPART1/6.jpg', '/assets/APT/AGADIR/APPART1/7.jpg']
          }
        ],
        'Essaouira': [
          {
            id: 'ess1',
            title: 'Villa typique en médina',
            description: 'Villa traditionnelle marocaine entièrement rénovée dans la médina d\'Essaouira. Décoration soignée et charme authentique.',
            price: 1500,
            address: 'Médina',
            city: 'Essaouira',
            bedrooms: 3,
            bathrooms: 2,
            area: 200,
            images: ['/assets/hero/hero5.jpg', '/assets/hero/hero6.jpg']
          }
        ]
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const allCities = ['Toutes les villes', ...Object.keys(villas)];
  const displayedVillas = selectedCity === 'Toutes les villes'
    ? Object.values(villas).flat()
    : villas[selectedCity] || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-primary">Nos Villas</h2>
      <p className="mb-6 text-gray-600">
        Louez une villa de luxe pour vos vacances ou événements privés.
      </p>

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

      <div className="grid md:grid-cols-2 gap-6">
        {displayedVillas.length > 0 ? (
          displayedVillas.map((villa) => (
            <ServiceCard 
              key={villa.id}
              title={villa.title}
              description={villa.description}
              image={villa.images[0] || ''}
              link={`/villas/${villa.id}`}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Aucune villa disponible pour le moment dans cette ville.
          </div>
        )}
      </div>
    </section>
  );
};

export default Villas;
