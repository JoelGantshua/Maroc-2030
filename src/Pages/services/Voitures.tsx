import { useNavigate } from 'react-router-dom';
import ServiceDetail from "../../components/ServiceDetail";

interface Voiture {
  id: string;
  title: string;
  description: string;
  image: string; // ✅ correction ici
  price: number;
  onBook: () => void;
  bookingLabel?: string;
}

const Voitures = () => {
  const navigate = useNavigate();

  const handleBookCar = (carTitle: string) => {
    navigate('/contact', { state: { service: 'Location de voiture', details: carTitle } });
  };

  const voitures: Voiture[] = [
    {
      id: '1',
      title: "Renault Clio",
      description: "Économique, parfaite pour la ville.",
      image: "/VOITURE/1.jpg", // ✅ sans /public et renommé
      price: 200,
      onBook: () => handleBookCar("Renault Clio"),
      bookingLabel: "Réserver cette voiture"
    },
    {
      id: '2',
      title: "BMW Série 3",
      description: "Luxe et performance allemande.",
      image: "/VOITURE/BMW.jpg",
      price: 500,
      onBook: () => handleBookCar("BMW Série 3"),
      bookingLabel: "Réserver cette voiture"
    },
    {
      id: '3',
      title: "Hyundai Tucson",
      description: "SUV moderne et spacieux.",
      image: "/VOITURE/HYUNDAI.jpg",
      price: 350,
      onBook: () => handleBookCar("Hyundai Tucson"),
      bookingLabel: "Réserver cette voiture"
    },
    {
      id: '4',
      title: "Dacia Duster",
      description: "Robuste et économique.",
      image: "/VOITURE/DACIA.jpg",
      price: 250,
      onBook: () => handleBookCar("Dacia Duster"),
      bookingLabel: "Réserver cette voiture"
    },
    {
      id: '5',
      title: "Mercedes Classe A",
      description: "Élégance et technologie.",
      image: "/VOITURE/MERCEDES.jpg", 
      price: 450,
      onBook: () => handleBookCar("Mercedes Classe A"),
      bookingLabel: "Réserver cette voiture"
    },
    {
      id: '6',
      title: "Peugeot 3008",
      description: "SUV français élégant et confortable.",
      image: "/VOITURE/PEUGEOT.jpg",
      price: 400,
      onBook: () => handleBookCar("Peugeot 3008"),
      bookingLabel: "Réserver cette voiture" 
      
    }
  ];

  const features = [
    "Assurance tous risques incluse",
    "Kilométrage illimité",
    "Service 24/7",
    "Véhicules récents et entretenus",
    "Options avec ou sans chauffeur"
  ];

  const handleBookNow = (carTitle: string) => {
    navigate('/contact', { state: { service: 'Location de voiture', details: carTitle } });
  };

  return (
    <ServiceDetail
      title="Location de voitures"
      description="Choisissez parmi une large gamme de véhicules disponibles à la location partout au Maroc."
      items ={voitures}
      image="/VOITURE/DACIA.jpg" // ✅ aussi sans /public
      features={features}
      bookingAction={
        <button
          onClick={() => handleBookNow('')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Réserver maintenant
        </button>
      }
    />
  );
};

export default Voitures;
