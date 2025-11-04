import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavLink {
  name: string;
  path?: string;
  submenu?: Array<{ name: string; path: string }>;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [servicesOpen, setServicesOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = (): void => setIsOpen(!isOpen);
  
  // Handle navigation for programmatic navigation if needed
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setServicesOpen(false);
  };
  
  const toggleServices = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setServicesOpen(!servicesOpen);
  };

  // Fermer le menu déroulant quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node) && 
          servicesButtonRef.current && !servicesButtonRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const navLinks: NavLink[] = [
    { name: 'Accueil', path: '/' },
    {
      name: 'Services',
      submenu: [
        { name: 'Tourisme', path: '/services/tourisme' },
        { name: 'Location de voitures', path: '/services/voitures' },
        { name: 'Appartements', path: '/services/appartements' },
        { name: 'Villas', path: '/services/villas' },
        { name: 'Hôtels', path: '/services/hotels' },
      ],
    },
    { name: 'Événements', path: '/evenements' },
    { name: 'Imam', path: '/imam' },
    { name: 'Annonces', path: '/annonces' },
    { name: 'À propos', path: '/apropos' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-green-500 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center p-0">
              <h1 className="text-primary m-0 text-xl font-bold" style={{ fontSize: '1.6rem' }}>
                <i className="fa fa-map-marker-alt mr-2"></i>Maroc2030
              </h1>
            </Link>
          </div>

          {/* Navigation pour desktop */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {navLinks.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div className="relative" ref={servicesRef}>
                    <button
                      ref={item.name === 'Services' ? servicesButtonRef : null}
                      onClick={toggleServices}
                      className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${servicesOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    {servicesOpen && (
                      <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path || '#'}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/inscription"
              className="ml-4 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              S'inscrire
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <Link
              to="/inscription"
              className="mr-4 bg-primary text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              S'inscrire
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((item) => (
              <div key={item.name} className="px-2">
                {item.submenu ? (
                  <div>
                    <button
                      onClick={toggleServices}
                      className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    {servicesOpen && (
                      <div className="pl-4 py-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.path}
                            onClick={() => handleNavigation(subItem.path)}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => item.path && handleNavigation(item.path)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'text-primary bg-gray-50'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
