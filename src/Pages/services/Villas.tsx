import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import ServiceDetail from "../../components/ServiceDetail";
import BookingForm from "../../components/BookingForm";

interface Villa {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities?: string[];
  link?: string;
}

const Villas: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Toutes les villes');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [villas, setVillas] = useState<{ [key: string]: Villa[] }>({});
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVillas({
        'Marrakech': [
          {
            id: 'mar1',
            title: 'Villa de luxe avec piscine',
            description: 'Magnifique villa de luxe avec piscine privée, jardin paysagé et vue sur l\'Atlas.',
            price: 2500,
            address: 'Quartier Palmeraie',
            city: 'Marrakech',
            bedrooms: 5,
            bathrooms: 4,
            area: 350,
            images: ['/assets/APT/MARRAKECH/apt1/1.jpg','/assets/APT/MARRAKECH/apt1/2.jpg']
          },
          {
            id: 'mar2',
            title: 'Villa moderne avec jardin',
            description: 'Villa moderne et élégante avec jardin privatif et terrasse ensoleillée.',
            price: 1800,
            address: 'Quartier Hivernage',
            city: 'Marrakech',
            bedrooms: 4,
            bathrooms: 3,
            area: 280,
            images: ['/assets/APT/MARRAKECH/apt2/1.jpg', '/assets/APT/MARRAKECH/apt2/2.jpg']
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
            images: ['/assets/APT/AGADIR/APPART1/6.jpg', '/assets/APT/AGADIR/APPART1/7.jpg', '/assets/APT/AGADIR/APPART1/8.jpg']
          }
        ],
        'Essaouira': [
          {
            id: 'ess1',
            title: 'Villa typique en médina',
            description: 'Villa traditionnelle marocaine entièrement rénovée dans la médina d\'Essaouira.',
            price: 1500,
            address: 'Médina',
            city: 'Essaouira',
            bedrooms: 3,
            bathrooms: 2,
            area: 200,
            images: ['/assets/APT/ESSAOUIRA/APPART1/1.jpg', '/assets/APT/ESSAOUIRA/APPART1/2.jpg']
          }
        ]
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const allCities = ['Toutes les villes', ...Object.keys(villas)];
  const displayedVillas =
    selectedCity === 'Toutes les villes'
      ? Object.values(villas).flat()
      : villas[selectedCity] || [];

  const handleBookVilla = (villa: Villa) => {
    setSelectedVilla(villa);
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedVilla(null);
  };

  const handleBookingSubmit = (bookingData: any) => {
    console.log('Booking data:', {
      ...bookingData,
      villa: selectedVilla?.title
    });
    setShowBookingForm(false);
  };

  const villasList = displayedVillas.map((villa) => ({
    id: villa.id,
    title: villa.title,
    description: villa.description,
    images: villa.images,
    price: villa.price,
    address: villa.address || '',  
    city: villa.city || '',        
    bedrooms: villa.bedrooms || 0, 
    bathrooms: villa.bathrooms || 0, 
    area: villa.area || 0,         
    onBook: () => handleBookVilla(villa),
    bookingLabel: "Réserver cette villa"
  }));

  const features = [
    "Services de ménage quotidien inclus",
    "Piscine privée ou partagée selon la villa",
    "Cuisine entièrement équipée",
    "Conciergerie 24/7",
    "Option petit déjeuner disponible"
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ServiceDetail
        title="Nos Villas et Riads d'Exception"
        description="Découvrez notre sélection exclusive de villas et riads haut de gamme à travers le Maroc."
        items={villasList.map(villa => ({
          ...villa,
          image: villa.images[0]
        }))}
        image={villasList[0]?.images[0] || "/assets/APT/FES/apt2/6.jpg"}
        features={features}
        bookingAction={
          <button
            onClick={() => {
              if (villasList[0]) {
                handleBookVilla(villasList[0]);
              } else {
                // Handle the case when there are no villas
                console.error('No villas available to book');
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Réserver maintenant
          </button>
        }
      />

      {showBookingForm && selectedVilla && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Réserver {selectedVilla.title}
                </h3>
                <button
                  onClick={handleCloseBookingForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <BookingForm
                isOpen={showBookingForm}
                onClose={handleCloseBookingForm}
                apartment={{
                  id: selectedVilla.id,
                  title: selectedVilla.title,
                  price: selectedVilla.price
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Villas;
