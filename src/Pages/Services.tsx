import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCar, FaHome, FaUmbrellaBeach, FaHotel, FaRoute } from 'react-icons/fa';

const serviceCategories = [
  {
    id: 'voitures',
    title: 'Location de Voitures',
    icon: <FaCar className="text-4xl mb-4 text-blue-500" />,
    gradient: 'from-blue-500 to-cyan-400',
    hover: 'hover:from-blue-600 hover:to-cyan-500',
    description: 'Explorez le Maroc à votre rythme avec nos véhicules de location haut de gamme.'
  },
  {
    id: 'appartements',
    title: 'Appartements',
    icon: <FaHome className="text-4xl mb-4 text-green-500" />,
    gradient: 'from-green-500 to-emerald-400',
    hover: 'hover:from-green-600 hover:to-emerald-500',
    description: 'Découvrez des appartements confortables au cœur des villes impériales.'
  },
  {
    id: 'villas',
    title: 'Villas de Luxe',
    icon: <FaUmbrellaBeach className="text-4xl mb-4 text-amber-500" />,
    gradient: 'from-amber-500 to-yellow-400',
    hover: 'hover:from-amber-600 hover:to-yellow-500',
    description: 'Expérimentez le luxe ultime dans nos villas exclusives en bord de mer.'
  },
  {
    id: 'hotels',
    title: 'Hôtels & Riads',
    icon: <FaHotel className="text-4xl mb-4 text-rose-500" />,
    gradient: 'from-rose-500 to-pink-400',
    hover: 'hover:from-rose-600 hover:to-pink-500',
    description: 'Séjournez dans des hôtels et riads authentiques chargés d\'histoire.'
  },
  {
    id: 'tourisme',
    title: 'Tours & Excursions',
    icon: <FaRoute className="text-4xl mb-4 text-purple-500" />,
    gradient: 'from-purple-500 to-indigo-400',
    hover: 'hover:from-purple-600 hover:to-indigo-500',
    description: 'Découvrez les trésors cachés du Maroc avec nos guides experts.'
  },
];

const Services = () => {
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
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70">
          <div className="absolute inset-0 bg-[url('/assets/hero/marrakech.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="text-black"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Nos Services Exceptionnels</h1>
            <p className="text-xl md:text-2xl text-black/90 max-w-3xl mx-auto">
              Découvrez une gamme complète de services pour rendre votre séjour au Maroc inoubliable
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explorez Nos Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sélectionnez une catégorie pour découvrir nos offres exceptionnelles
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceCategories.map((service, index) => (
            <motion.div 
              key={service.id}
              variants={item}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link 
                to={service.id}
                className={`block h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`h-2 bg-gradient-to-r ${service.gradient} ${service.hover}`}></div>
                <div className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <span className={`inline-block px-6 py-2 rounded-full text-white font-medium bg-gradient-to-r ${service.gradient} ${service.hover} transition-all duration-300`}>
                    Découvrir
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[url('/assets/patterns/pattern.svg')] opacity-10"></div>
          <div className="px-8 py-10 bg-black gradient-to-r from-primary to-secondary mx-auto mt-10 text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Prêt à vivre une expérience inoubliable ?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Notre équipe est disponible 24/7 pour personnaliser votre séjour selon vos envies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-black/30 text-primary rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Contactez-nous
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                Demander un devis
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Outlet />
    </div>
  );
};

export default Services;
