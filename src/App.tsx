import { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import BookingForm from "./components/BookingForm"; 
// ✅ Lazy loading des pages principales
const Home = lazy(() => import("./Pages/Home"));
const Services = lazy(() => import("./Pages/Services"));
const Evenements = lazy(() => import("./Pages/Evenements"));
const Imam = lazy(() => import("./Pages/Imam"));
const Annonces = lazy(() => import("./Pages/Annonces"));
const Apropos = lazy(() => import("./Pages/Apropos"));
const Contact = lazy(() => import("./Pages/Contact"));
const Inscription = lazy(() => import("./Pages/Inscription"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

// ✅ Sous-pages services
const Tourisme = lazy(() => import("./Pages/services/Tourisme"));
const Voitures = lazy(() => import("./Pages/services/Voitures"));
const Appartements = lazy(() => import("./Pages/services/Appartements"));
const Villas = lazy(() => import("./Pages/services/Villas"));
const Hotels = lazy(() => import("./Pages/services/Hotels"));

// Composant de chargement pour le Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  // Function to open booking form with apartment data
  const handleOpenBooking = (apartment: any) => {
    setSelectedApartment(apartment);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="services">
            <Route index element={<Services />} />
            <Route path="appartements" element={<Appartements />} />
            <Route path="tourisme" element={<Tourisme />} />
            <Route path="voitures" element={<Voitures />} />
            <Route path="villas" element={<Villas />} />
            <Route path="hotels" element={<Hotels onBookNow={handleOpenBooking} />} />
          </Route>
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/imam" element={<Imam />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      
      {/* Booking Form Modal */}
      <BookingForm 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        apartment={selectedApartment}
      />
      
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'bg-white text-gray-800',
          duration: 3000,
          success: {
            className: 'bg-green-100 text-green-700',
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            className: 'bg-red-100 text-red-700',
          },
        }}
      />
    </div>
  );
}

export default App;
