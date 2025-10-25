import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTripadvisor, FaYoutube, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Retour en haut"
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Fonction pour gérer le clic sur les liens
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <>
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Maroc <span className="text-primary font-bold text-2xl color-green-500">2030</span></h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Découvrez la beauté intemporelle de Meknès avec nous. Nous proposons des expériences uniques et des séjours mémorables dans la ville impériale.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                  <FaTripadvisor size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" onClick={handleLinkClick} className="text-gray-300 hover:text-primary transition-colors">Accueil</Link></li>
                <li><Link to="/services" onClick={handleLinkClick} className="text-gray-300 hover:text-primary transition-colors">Nos Services</Link></li>
                <li><Link to="/evenements" onClick={handleLinkClick} className="text-gray-300 hover:text-primary transition-colors">Événements</Link></li>
                <li><Link to="services/tourisme" onClick={handleLinkClick} className="text-gray-300 hover:text-primary transition-colors">Circuits Touristiques</Link></li>
                <li><Link to="services/Appartements" onClick={handleLinkClick} className="text-gray-300 hover:text-primary transition-colors">Hébergements</Link></li>
                <li><Link to="/galerie" onClick={handleLinkClick} className="text-gray-300 hover:text-primary transition-colors">Galerie</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contactez-nous</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                  <span className="text-gray-300">Avenue Mohammed VI, Meknès 50000, Maroc</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-3 text-primary" />
                  <a href="tel:+212612345678" className="text-gray-300 hover:text-primary transition-colors">+212 6 12 34 56 78</a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 text-primary" />
                  <a href="mailto:contact@maroc2030.ma" className="text-gray-300 hover:text-primary transition-colors">contact@maroc2030.ma</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Newsletter</h4>
              <p className="text-gray-300 text-sm mb-4">
                Abonnez-vous à notre newsletter pour recevoir nos offres spéciales et actualités.
              </p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  S'abonner
                </button>
              </form>
            </div>
          </div>

          {/* Copyright and Legal */}
          <div className="border-t border-gray-800 pt-6 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                {currentYear} Maroc 2030. Tous droits réservés.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/mentions-legales" onClick={handleLinkClick} className="text-gray-400 hover:text-primary text-sm transition-colors">Mentions Légales</Link>
                <Link to="/confidentialite" onClick={handleLinkClick} className="text-gray-400 hover:text-primary text-sm transition-colors">Politique de Confidentialité</Link>
                <Link to="/cgv" onClick={handleLinkClick} className="text-gray-400 hover:text-primary text-sm transition-colors">CGV</Link>
                <Link to="/contact" onClick={handleLinkClick} className="text-gray-400 hover:text-primary text-sm transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </>
  );
};

export default Footer;