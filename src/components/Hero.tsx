import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Découvrez les merveilles du Maroc",
    subtitle: "Des paysages à couper le souffle vous attendent",
    image: "/assets/hero/A.jpg",
    cta: "Explorer maintenant"
  },
  {
    id: 2,
    title: "Séjours inoubliables",
    subtitle: "Trouvez l'hébergement parfait pour vos vacances",
    image: "/assets/hero/B.jpg",
    cta: "Voir les offres"
  },
  {
    id: 3,
    title: "Aventures en plein air",
    subtitle: "Découvrez des expériences uniques",
    image: "/assets/hero/C.jpg",
    cta: "Découvrir"
  },
  {
    id: 4,
    title: "Culture et traditions",
    subtitle: "Plongez dans l'authenticité marocaine",
    image: "/assets/hero/D.jpg",
    cta: "En savoir plus"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setTimeout(() => {
      nextSlide();
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Rediriger vers la page de recherche avec le terme de recherche
      window.location.href = `/recherche?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: slides[currentSlide] ? `url(${slides[currentSlide].image})` : 'none' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button 
        onClick={() => {
          setIsAutoPlaying(false);
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-primary transition-colors"
        aria-label="Précédent"
      >
        <FiChevronLeft size={24} />
      </button>
      
      <button 
        onClick={() => {
          setIsAutoPlaying(false);
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-primary transition-colors"
        aria-label="Suivant"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              goToSlide(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {slides[currentSlide] ? slides[currentSlide].title : ''}
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
              {slides[currentSlide] ? slides[currentSlide].subtitle : ''}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un service, une destination..."
                className="flex-grow px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-colors whitespace-nowrap"
              >
                Rechercher
              </button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <a 
              href="#services" 
              className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              {slides[currentSlide] ? slides[currentSlide].cta : ''}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;