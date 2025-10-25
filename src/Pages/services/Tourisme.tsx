import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../../components/ServiceCard';

// No need for dynamic import with Vite
import SearchBar from '../../components/SearchBar';

interface Voyage {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  duration: string;
  tags: string[];
}

const Tourisme = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Données des voyages
  const [voyages] = useState<Voyage[]>([
    {
      id: '1',
      title: 'Désert de Merzouga',
      description: 'Aventure inoubliable au cœur des dunes du Sahara avec nuit en bivouac sous les étoiles.',
      image: '/assets/tourisme/merzouga.jpg',
      price: 1200,
      rating: 4.8,
      duration: '3 jours / 2 nuits',
      tags: ['aventure', 'désert', 'randonnée']
    },
    {
      id: '2',
      title: 'Chefchaouen',
      description: 'Découverte de la perle bleue nichée dans les montagnes du Rif, célèbre pour ses ruelles bleues et son ambiance paisible.',
      image: '/assets/tourisme/chefchaouen.jpg',
      price: 850,
      rating: 4.7,
      duration: '2 jours / 1 nuit',
      tags: ['culture', 'montagne', 'photographie']
    },
    {
      id: '3',
      title: 'Essaouira',
      description: 'Détente dans cette ville côtière connue pour ses remparts portugais, ses plages et sa médina classée au patrimoine de l\'UNESCO.',
      image: '/assets/tourisme/essaouira.jpg',
      price: 950,
      rating: 4.6,
      duration: '3 jours / 2 nuits',
      tags: ['plage', 'culture', 'détente']
    },
    {
      id: '4',
      title: 'Vallée du Dadès',
      description: 'Exploration des paysages spectaculaires des gorges du Dadès et de la vallée des Roses.',
      image: '/assets/tourisme/dades.jpg',
      price: 1100,
      rating: 4.9,
      duration: '4 jours / 3 nuits',
      tags: ['aventure', 'nature', 'randonnée']
    },
    {
      id: '5',
      title: 'Fès Médina',
      description: 'Immersion dans la plus grande médina du monde arabe, découverte de l\'artisanat traditionnel et des médersas historiques.',
      image: '/assets/tourisme/fes.jpg',
      price: 780,
      rating: 4.5,
      duration: '2 jours / 1 nuit',
      tags: ['culture', 'histoire', 'artisanat']
    },
    {
      id: '6',
      title: 'Atlas Film Studio',
      description: 'Visite des studios de cinéma en plein désert où de nombreux films hollywoodiens ont été tournés.',
      image: '/assets/tourisme/atlas-studio.jpg',
      price: 650,
      rating: 4.3,
      duration: '1 jour',
      tags: ['cinéma', 'désert', 'culture']
    },
  ]);

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filtrage des voyages
  const filteredVoyages = voyages.filter(voyage => {
    const matchesSearch = voyage.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         voyage.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || voyage.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Récupération de tous les tags uniques
  const allTags = Array.from(new Set(voyages.flatMap(voyage => voyage.tags)));

  // Animation des cartes
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <title>Tourisme au Maroc | Découvrez nos circuits exclusifs</title>
      <meta name="description" content="Découvrez les plus beaux sites touristiques du Maroc avec nos circuits organisés. Des déserts aux montagnes en passant par les villes impériales." />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Découvrez le Maroc</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez la richesse culturelle et la beauté naturelle du Maroc à travers nos circuits touristiques exceptionnels.
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8">
          <div className="mb-6">
            <SearchBar 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une destination..."
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedTag 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tous
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  tag === selectedTag
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Résultats */}
        {filteredVoyages.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVoyages.map((voyage) => (
              <motion.div key={voyage.id} variants={item}>
                <ServiceCard 
                  title={voyage.title}
                  description={`${voyage.description} (${voyage.duration})`}
                  image={voyage.image}
                  link={`/tourisme/${voyage.id}`}
                  className="h-full"
                />
                <div className="mt-2 flex justify-between items-center px-2">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{voyage.rating}</span>
                  </div>
                  <span className="text-lg font-bold text-primary-600">
                    {voyage.price.toLocaleString()} MAD
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun résultat trouvé</h3>
            <p className="mt-1 text-gray-500">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tourisme;
