import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Hero from "../components/Hero";
import Apropos from "./Apropos";
import Contact from "./Contact";

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Home = () => {
  const [activeService, setActiveService] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const services: Service[] = [
    {
      title: "Location de voitures",
      description: "Trouvez la voiture idéale pour vos déplacements à travers le Maroc.",
      image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
      link: "/services/voitures"
    },
    {
      title: "Appartements",
      description: "Découvrez nos appartements et locations de vacances sélectionnés avec soin.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/appartements"
    },
    {
      title: "Villas",
      description: "Profitez de nos villas de luxe pour des vacances inoubliables au Maroc.",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
      link: "/services/villas"
    },
    {
      title: "Hôtels",
      description: "Découvrez nos hôtels sélectionnés pour votre confort et votre détente.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/hotels"
    },
    {
      title: "Tourisme & Excursions",
      description: "Découvrez le Maroc avec nos visites guidées et activités touristiques.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/services/tourisme"
    }
  ];

  const nextService = () => {
    setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevService = () => {
    setActiveService((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(nextService, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeService, isHovered]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const activeServiceData = services[activeService];

  return (
    <div className="overflow-x-hidden">
      <Hero />

      {/* Section Services */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services Exceptionnels</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez une gamme complète de services pour rendre votre séjour au Maroc inoubliable
            </p>
          </motion.div>

          <div 
            className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                {activeServiceData && (
                  <img 
                    src={activeServiceData.image} 
                    alt={activeServiceData.title}
                    className="w-full h-full object-cover transition-transform duration-10000 ease-linear"
                    style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1.1)' }}
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {activeServiceData && (
                      <>
                        <h3 className="text-3xl md:text-5xl font-bold mb-4">{activeServiceData.title}</h3>
                        <p className="text-xl mb-6 max-w-2xl">{activeServiceData.description}</p>
                        <a 
                          href={activeServiceData.link}
                          className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                        >
                          Découvrir <FiArrowRight className="ml-2" />
                        </a>
                      </>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button 
              onClick={prevService}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Service précédent"
            >
              <FiChevronLeft size={24} />
            </button>
            <button 
              onClick={nextService}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Service suivant"
            >
              <FiChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeService ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Aller au service ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                variants={item}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <a 
                    href={service.link}
                    className="text-primary font-medium hover:underline inline-flex items-center"
                  >
                    En savoir plus <FiArrowRight className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Événements à Venir</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les événements incontournables qui vous attendent à Meknès
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Festival des Roses",
                date: "15-17 Mai 2024",
                location: "Vallée des Roses",
                image: "https://images.unsplash.com/photo-1582722872445-44e1c56a4c3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              },
              {
                title: "Marathon des Sables",
                date: "12-22 Avril 2024",
                location: "Désert du Sahara",
                image: "https://images.unsplash.com/photo-1509316789340-9f6ddcc2548c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              },
              {
                title: "Festival des Arts",
                date: "22-30 Juin 2024",
                location: "Meknès",
                image: "https://images.unsplash.com/photo-1518544866330-95a2e724af0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              }
            ].map((event, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
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
                    <span className="text-sm text-gray-500">{event.date}</span>
                    <span className="text-sm font-medium text-primary">{event.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                  <a 
                    href="/evenements"
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Voir tous les événements <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi Nous Choisir ?</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez ce qui fait de nous le partenaire idéal pour votre voyage à Meknès
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expérience Locale",
                description: "Notre équipe locale vous fait découvrir les trésors cachés de Meknès que seuls les initiés connaissent.",
                icon: "🌍"
              },
              {
                title: "Service Personnalisé",
                description: "Nous créons des itinéraires sur mesure qui correspondent parfaitement à vos envies et à votre budget.",
                icon: "✨"
              },
              {
                title: "Engagement Qualité",
                description: "Nous sélectionnons avec soin nos partenaires pour vous garantir des prestations de qualité supérieure.",
                icon: "🏆"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="/apropos"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              En savoir plus sur nous <FiArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à vivre l'aventure à Meknès ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour créer le voyage de vos rêves à Meknès
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact"
              className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contactez-nous
            </a>
            <a 
              href="tel:+212612345678"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Appelez-nous
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
         
        </div>
      </section>
    </div>
  );
};

export default Home;
