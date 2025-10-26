import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  description: string;
  image: string;
  category: string;
}

const Evenements = () => {
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "Festival des Roses à Kelaa M'Gouna",
      date: "15-17 Mai 2024",
      location: "Vallée des Roses, Maroc",
      time: "Toute la journée",
      description: "Célébrez la récolte des roses dans la magnifique vallée du Dadès avec des défilés, des danses traditionnelles et des expositions d'artisanat local.",
      image: "./assets/events/T0.jpeg",
      category: "Festival"
    },
    {
      id: 2,
      title: "Marathon des Sables",
      date: "12-22 Avril 2024",
      location: "Désert du Sahara, Maroc",
      time: "06:00 - 18:00",
      description: "Participez à l'une des courses à pied les plus difficiles au monde à travers les paysages époustouflants du désert marocain.",
      image: "./assets/events/1.jpg",
      category: "Sport"
    },
    {
      id: 3,
      title: "Festival des Arts Populaires de Marrakech",
      date: "22-30 Juin 2024",
      location: "Marrakech, Maroc",
      time: "18:00 - Minuit",
      description: "Découvrez la richesse du patrimoine culturel marocain à travers des spectacles de musique, de danse et d'art traditionnels.",
      image: "./assets/events/2.jpg",
      category: "Culture"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(./assets/events/mrkc.jpg)' }}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Événements au Maroc</h1>
            <p className="text-xl md:text-2xl">Découvrez les événements les plus captivants à travers le royaume</p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Événements à Venir</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vivez des expériences uniques à travers les festivals, concerts et événements culturels du Maroc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {event.category}
                  </span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FiMapPin className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FiClock className="mr-2" />
                  <span>{event.time}</span>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  En savoir plus
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="px-15 py-5 bg-black/30 text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors mx-auto mt-10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ne manquez aucun événement</h3>
            <p className="text-black/90 mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir les dernières actualités sur les événements à venir au Maroc.
            </p>
            <div className="flex flex-col md:flex-row gap-5 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evenements;