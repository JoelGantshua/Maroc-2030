import { useState } from 'react';
import ApartmentCard from '../../components/ApartmentCard';
import BookingForm from '../../components/BookingForm';

interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  images: string[];
}

const Appartements = () => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Sample data - replace with your actual image paths from public/assets/APT/
  const apartmentsByCity: Record<string, Apartment[]> = {
    'Agadir': [
      {
        id: 'aga1',
        title: 'Appartement moderne avec vue sur mer',
        description: 'Magnifique appartement 2 chambres avec vue sur l\'océan, proche de la plage et des commodités. Parfait pour des vacances en famille ou entre amis.',
        price: 800,
        address: 'Boulevard du 20 Août',
        city: 'Agadir',
        images: ['/assets/APT/AGADIR/APPART1/6.jpg', '/assets/APT/AGADIR/APPART1/7.jpg', '/assets/APT/AGADIR/APPART1/8.jpg', 'assets/APT/AGADIR/APPART1/9.jpg']
      },
      {
        id: 'aga2',
        title: 'Studio cosy en centre-ville',
        description: 'Studio moderne et confortable idéalement situé à proximité du centre commercial et des restaurants. Parfait pour les voyageurs en solo ou les couples.',
        price: 500,
        address: 'Avenue Hassan II',
        city: 'Agadir',
        images: ['/assets/APT/AGADIR/APPART2/3.jpg', '/assets/APT/AGADIR/APPART2/2.jpg', '/assets/APT/AGADIR/APPART2/1.jpg']
      }
    ],
    'Al Hoceima': [
      {
        id: 'alh1',
        title: 'Appartement vue sur la baie',
        description: 'Superbe appartement avec vue imprenable sur la baie d\'Al Hoceima. Idéal pour des vacances reposantes au bord de la Méditerranée.',
        price: 700,
        address: 'Quartier Mohammed V',
        city: 'Al Hoceima',
        images: ['/assets/APT/ALHOCEIMA/APPART1/IM1.jpg', '/assets/APT/ALHOCEIMA/APPART1/IM2.jpg', '/assets/APT/ALHOCEIMA/APPART1/IM3.jpg', '/assets/APT/ALHOCEIMA/APPART1/IM4.jpg']
      },
      {
        id: 'alh2',
        title: 'Résidence calme proche plage',
        description: 'Résidence calme à deux pas des plages de sable fin. Appartement lumineux et fonctionnel pour un séjour réussi.',
        price: 650,
        address: 'Quartier Sfiha',
        city: 'Al Hoceima',
        images: ['/assets/APT/ALHOCEIMA/APPART2/Img1.jpg', '/assets/APT/ALHOCEIMA/APPART2/Img2.jpg', '/assets/APT/ALHOCEIMA/APPART2/Img3.jpg', '/assets/APT/ALHOCEIMA/APPART2/Img4.jpg', '/assets/APT/ALHOCEIMA/APPART2/Img5.jpg']
      }
    ],
    'Casablanca': [
      {
        id: 'casa1',
        title: 'Appartement de luxe en centre-ville',
        description: 'Appartement spacieux et moderne au cœur de Casablanca, à proximité de la mosquée Hassan II et de la corniche. Vue imprenable sur la ville.',
        price: 1200,
        address: 'Avenue des FAR',
        city: 'Casablanca',
        images: ['/assets/APT/CASABLANCA/APPART1/ca1.jpg', '/assets/APT/CASABLANCA/APPART1/ca2.jpg','/assets/APT/CASABLANCA/APPART1/ca3.jpg']
      },
      {
        id: 'casa2',
        title: 'Appartement moderne à Maarif',
        description: 'Bel appartement 2 chambres dans le quartier branché de Maarif, à deux pas des boutiques et restaurants. Idéal pour un séjour professionnel ou touristique.',
        price: 950,
        address: 'Quartier Maarif',
        city: 'Casablanca',
        images: ['/assets/APT/CASABLANCA/APPART2/cas1.jpg', '/assets/APT/CASABLANCA/APPART2/cas2.jpg','/assets/APT/CASABLANCA/APPART2/cas3.jpg',]
      },
      {
        id: 'casa3',
        title: 'Duplex avec terrasse à Ain Diab',
        description: 'Magnifique duplex avec grande terrasse et vue sur mer. Proche de la plage et des animations de la corniche. Parfait pour des vacances inoubliables.',
        price: 1500,
        address: 'Corniche d\'Ain Diab',
        city: 'Casablanca',
        images: ['/assets/APT/CASABLANCA/APPART3/casa.jpg', '/assets/APT/CASABLANCA/APPART3/casa.jpg']
      }
    ],
    'Fès': [
      {
        id: 'fes1',
        title: 'Riad traditionnel en médina',
        description: 'Authentique riad marocain au cœur de la médina de Fès, classée au patrimoine mondial de l\'UNESCO. Décoration traditionnelle et cadre enchanteur.',
        price: 900,
        address: 'Médina de Fès',
        city: 'Fès',
        images: ['/assets/APT/FES/apt1/1.jpg', '/assets/APT/FES/apt1/2.jpg','/assets/APT/FES/apt1/3.jpg', '/assets/APT/FES/apt1/4.jpg']
      },
      {
        id: 'fes2',
        title: 'Appartement moderne à Fès Jdid',
        description: 'Appartement moderne et confortable dans le quartier de Fès Jdid, à proximité du palais royal et du Mellah. Idéal pour découvrir la ville impériale.',
        price: 750,
        address: 'Quartier Fès Jdid',
        city: 'Fès',
        images: ['/assets//APT/FES/apt2/6.jpg', '/assets/APT/FES/apt2/7.jpg', '/assets/APT/FES/apt2/8.jpg', '/assets/APT/FES/apt2/9.jpg','/assets/APT/FES/apt2/10.jpg']
      }
    ],
    'Marrakech': [
      {
        id: 'mar1',
        title: 'Riad traditionnel en médina',
        description: 'Authentique riad marocain au cœur de la médina, à quelques pas de la place Jemaa el-Fna. Décoration traditionnelle et cadre enchanteur.',
        price: 1000,
        address: 'Médina',
        city: 'Marrakech',
        images: ['/assets/APT/MARRAKECH/apt1/1.jpg', '/assets/APT/MARRAKECH/apt1/2.jpg','/assets/APT/MARRAKECH/apt1/3.jpg',]
      },
      {
        id: 'mar2',
        title: 'Appartement moderne à Guéliz',
        description: 'Appartement moderne et lumineux dans le quartier de Guéliz, à proximité des commerces et restaurants. Idéal pour découvrir Marrakech en toute tranquillité.',
        price: 850,
        address: 'Quartier Guéliz',
        city: 'Marrakech',
        images: ['/assets/APT/MARRAKECH/apt2/4.jpg', '/assets/APT/MARRAKECH/apt2/5.jpg','/assets/APT/MARRAKECH/apt2/6.jpg', '/assets/APT/MARRAKECH/apt2/7.jpg']
      }
    ],
    'Meknès': [
      {
        id: 'mek1',
        title: 'Appartement vue sur la médina',
        description: 'Bel appartement avec vue imprenable sur la médina de Meknès, classée au patrimoine mondial de l\'UNESCO. Proche des sites historiques et des souks.',
        price: 700,
        address: 'Médina de Meknès',
        city: 'Meknès',
        images: ['/assets/APT/Meknès/apt1/1.jpg', '/assets/APT/Meknès/apt1/2.jpg','/assets/APT/Meknès/apt1/3.jpg', '/assets/APT/Meknès/apt1/4.jpg']
      },
      {
        id: 'mek2',
        title: 'Appartement moderne à Hamria',
        description: 'Appartement moderne et fonctionnel dans le quartier résidentiel de Hamria. Calme et bien situé pour découvrir la ville impériale de Meknès.',
        price: 650,
        address: 'Quartier Hamria',
        city: 'Meknès',
        images: ['/assets/APT/Meknès/apt2/1.jpg', '/assets/APT/Meknès/apt2/2.jpg','/assets/APT/Meknès/apt2/3.jpg']
      }
    ],
    'Ifrane': [
      {
        id: 'ifr1',
        title: 'Chalet de montagne à Ifrane',
        description: 'Chalet chaleureux et confortable à Ifrane, la petite Suisse du Maroc. Idéal pour des vacances au calme dans un cadre naturel exceptionnel.',
        price: 1100,
        address: 'Station de Michlifen',
        city: 'Ifrane',
        images: ['/assets/APT/IFRANE/apt1/1.jpg', '/assets/APT/IFRANE/apt1/2.jpg','/assets/APT/IFRANE/apt1/3.jpg']
      },
      {
        id: 'ifr2',
        title: 'Appartement avec vue sur les cèdres',
        description: 'Bel appartement avec vue sur la forêt de cèdres d\'Ifrane. Proche des pistes de ski en hiver et des randonnées en été.',
        price: 950,
        address: 'Quartier Résidentiel',
        city: 'Ifrane',
        images: ['/assets/APT/IFRANE/apt2/1.jpg', '/assets/APT/IFRANE/apt2/2.jpg','/assets/APT/IFRANE/apt2/3.jpg']
      },
      {
        id: 'ifr3',
        title: 'Villa de charme avec jardin',
        description: 'Jolie villa avec jardin privatif à Ifrane. Parfaite pour les familles ou les groupes d\'amis souhaitant profiter de la fraîcheur de la montagne.',
        price: 1300,
        address: 'Quartier des Cèdres',
        city: 'Ifrane',
        images: ['/assets/APT/IFRANE/apt3/1.jpg', '/assets/APT/IFRANE/apt3/2.jpg']
      }
    ],
    'Nador': [
      {
        id: 'nad1',
        title: 'Appartement vue sur la lagune',
        description: 'Appartement lumineux avec vue sur la lagune de Nador. Proche des plages et des commodités pour un séjour agréable au bord de la Méditerranée.',
        price: 600,
        address: 'Quartier Lagouira',
        city: 'Nador',
        images: ['/assets/APT/NADOR/apt1/1.jpg', '/assets/APT/NADOR/apt1/2.jpg','/assets/APT/NADOR/apt1/3.jpg','/assets/APT/NADOR/apt1/4.jpg','/assets/APT/NADOR/apt1/5.jpg']
      },
      {
        id: 'nad2',
        title: 'Résidence moderne à Bouarg',
        description: 'Résidence moderne et sécurisée dans le quartier de Bouarg. Appartement fonctionnel et bien équipé pour un séjour confortable à Nador.',
        price: 550,
        address: 'Quartier Bouarg',
        city: 'Nador',
        images: ['/assets/APT/NADOR/apt2/6.jpg', '/assets/APT/NADOR/apt2/7.jpg','/assets/APT/NADOR/apt2/8.jpg','/assets/APT/NADOR/apt2/9.jpg','/assets/APT/NADOR/apt2/10.jpg','/assets/APT/NADOR/apt2/11.jpg']
      }
    ],
    'Oujda': [
      {
        id: 'ouj1',
        title: 'Appartement centre-ville',
        description: 'Appartement spacieux et moderne en plein cœur d\'Oujda. Idéalement situé à proximité des commerces, restaurants et sites touristiques de la ville.',
        price: 650,
        address: 'Boulevard Mohammed V',
        city: 'Oujda',
        images: ['/assets/APT/OUJDA/apt2/6.jpg', '/assets/APT/OUJDA/apt2/5.jpg','/assets/APT/OUJDA/apt2/7.jpg','/assets/APT/OUJDA/apt2/8.jpg']
      },
      {
        id: 'ouj2',
        title: 'Résidence calme à Al Qods',
        description: 'Résidence calme et sécurisée dans le quartier d\'Al Qods. Appartement fonctionnel et bien équipé pour un séjour agréable à Oujda.',
        price: 600,
        address: 'Quartier Al Qods',
        city: 'Oujda',
        images: ['/assets/APT/OUJDA/apt1/1.jpg', '/assets/APT/OUJDA/apt1/2.jpg','/assets/APT/OUJDA/apt1/3.jpg','/assets/APT/OUJDA/apt1/4.jpg']
      }
    ],
    'Rabat': [
      {
        id: 'rab1',
        title: 'Appartement vue sur mer à Agdal',
        description: 'Magnifique appartement avec vue sur l\'océan dans le quartier huppé de l\'Agdal. Proche des ambassades et du centre-ville de Rabat.',
        price: 1100,
        address: 'Quartier Agdal',
        city: 'Rabat',
        images: ['/assets/APT/RABAT/apt1/1.jpg', '/assets/APT/RABAT/apt1/2.jpg']
      },
      {
        id: 'rab2',
        title: 'Appartement moderne à Hay Riad',
        description: 'Appartement moderne et fonctionnel dans le quartier résidentiel de Hay Riad. Proche des administrations et des commodités.',
        price: 950,
        address: 'Quartier Hay Riad',
        city: 'Rabat',
        images: ['/assets/APT/RABAT/apt2/3.jpg', '/assets/APT/RABAT/apt2/4.jpg','/assets/APT/RABAT/apt2/5.jpg','/assets/APT/RABAT/apt2/6.jpg']
      }
    ],
    'Tanger': [
      {
        id: 'tan1',
        title: 'Appartement vue sur le détroit',
        description: 'Superbe appartement avec vue imprenable sur le détroit de Gibraltar. Idéal pour des vacances inoubliables entre mer et montagne.',
        price: 1000,
        address: 'Quartier Malabata',
        city: 'Tanger',
        images: ['/assets/APT/TANGER/apt1/1.jpg', '/assets/APT/TANGER/apt1/2.jpg','/assets/APT/TANGER/apt1/3.jpg']
      },
      {
        id: 'tan2',
        title: 'Appartement moderne à Tanger City Center',
        description: 'Appartement moderne et design en plein cœur de Tanger, à deux pas du port et de la médina. Idéal pour un séjour urbain réussi.',
        price: 850,
        address: 'Boulevard Mohammed VI',
        city: 'Tanger',
        images: ['/assets/APT/TANGER/apt2/4.jpg', '/assets/APT/TANGER/apt2/5.jpg','/assets/APT/TANGER/apt2/6.jpg','/assets/APT/TANGER/apt2/7.jpg']
      }
    ],
    'Tétouan': [
      {
        id: 'tet1',
        title: 'Appartement vue sur la médina',
        description: 'Bel appartement avec vue sur la médina blanche de Tétouan, classée au patrimoine mondial de l\'UNESCO. Proche des plages de la Méditerranée.',
        price: 750,
        address: 'Quartier M\'Sallah',
        city: 'Tétouan',
        images: ['/assets/APT/TETOUAN/apt1/1.jpg', '/assets/APT/TETOUAN/apt1/2.jpg','/assets/APT/TETOUAN/apt1/3.jpg', '/assets/APT/TETOUAN/apt1/4.jpg','/assets/APT/TETOUAN/apt1/5.jpg']
      },
      {
        id: 'tet2',
        title: 'Résidence calme à Tétouan Marina',
        description: 'Résidence calme et sécurisée à proximité de la marina de Tétouan. Appartement moderne et fonctionnel pour un séjour agréable.',
        price: 700,
        address: 'Quartier Marina Smir',
        city: 'Tétouan',
        images: ['/assets/APT/TETOUAN/apt2/8.jpg', '/assets/APT/TETOUAN/apt2/7.jpg','/assets/APT/TETOUAN/apt2/6.jpg','/assets/APT/TETOUAN/apt2/9.jpg']
      }
    ],
    'Chefchaouen': [
      {
        id: 'chef1',
        title: 'Riad bleu en médina',
        description: 'Authentique riad bleu au cœur de la médina de Chefchaouen. Décoration traditionnelle et cadre enchanteur pour des vacances inoubliables.',
        price: 900,
        address: 'Médina de Chefchaouen',
        city: 'Chefchaouen',
        images: ['/assets/APT/chef/APPAR1/.jpg', '/assets/chef/APPAR1/ch1.jpg','/assets/APT/chef/APPAR1/ch3.jpg','/assets/APT/chef/APPAR1/ch4.jpg']
      },
      {
        id: 'chef2',
        title: 'Appartement avec vue sur les montagnes',
        description: 'Appartement chaleureux avec vue imprenable sur les montagnes du Rif. Idéal pour les amoureux de la nature et des randonnées.',
        price: 800,
        address: 'Quartier Ras El Maa',
        city: 'Chefchaouen',
        images: ['/assets/APT/chef/APPART2/ch1.jpg', '/assets/APT/chef/APPART2/ch.jpg','/assets/APT/chef/APPART2/ch2.jpg']
      }
    ],
    'Essaouira': [
      {
        id: 'ess1',
        title: 'Riad typique en médina',
        description: 'Charmant riad typique dans la médina d\'Essaouira, classée au patrimoine mondial de l\'UNESCO. À deux pas de la plage et des remparts portugais.',
        price: 950,
        address: 'Médina d\'Essaouira',
        city: 'Essaouira',
        images: ['/assets/APT/Essaouira/apt1/6.jpg', '/assets/APT/Essaouira/apt1/2.jpg','/assets/APT/Essaouira/apt1/3.jpg', '/assets/APT/Essaouira/apt1/4.jpg','/assets/APT/Essaouira/apt1/5.jpg','/assets/APT/Essaouira/apt1/1.jpg']
      },
      {
        id: 'ess2',
        title: 'Appartement vue sur le port',
        description: 'Appartement lumineux avec vue sur le port de pêche d\'Essaouira. Parfait pour des vacances entre mer et culture.',
        price: 850,
        address: 'Quartier du Port',
        city: 'Essaouira',
        images: ['/assets/APT/Essaouira/apt2/7.jpg', '/assets/APT/Essaouira/apt2/8.jpg','/assets/APT/Essaouira/apt2/9.jpg','/assets/APT/Essaouira/apt2/10.jpg','/assets/APT/Essaouira/apt2/11.jpg']
      }
    ]
  };

  const cities = Object.keys(apartmentsByCity);
  const displayedApartments = selectedCity ? (apartmentsByCity[selectedCity] || []) : [];

  const handleBookClick = (apartmentId: string) => {
    const apartment = displayedApartments.find(apt => apt.id === apartmentId);
    if (apartment) {
      setSelectedApartment(apartment);
      setIsBookingOpen(true);
    }
  };
  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedApartment(null);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Appartements</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection d'appartements de qualité dans les plus belles villes du Maroc
          </p>
        </div>

        {/* Filtres de ville */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCity(null)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCity === null 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes les villes
          </button>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCity === city 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Affichage des appartements */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {(selectedCity
    ? apartmentsByCity[selectedCity] || []
    : Object.values(apartmentsByCity).flat()
  ).map((apartment) => (
    <ApartmentCard
      key={apartment.id}
      id={apartment.id}
      title={apartment.title}
      description={apartment.description}
      price={apartment.price}
      address={apartment.address}
      city={apartment.city}
      images={apartment.images}
      onBook={() => handleBookClick(apartment.id)}
    />
  ))}
</div>

      {isBookingOpen && selectedApartment && (
        <BookingForm
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          apartment={selectedApartment}
        />
      )}
    </div>
  </div>
);
};

export default Appartements;
