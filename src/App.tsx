import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

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

// Configuration de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Composant de chargement pour le Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />}>
              <Route path="appartements" element={<Appartements />} />
              <Route path="tourisme" element={<Tourisme />} />
              <Route path="voitures" element={<Voitures />} />
              <Route path="villas" element={<Villas />} />
              <Route path="hotels" element={<Hotels />} />
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
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}

export default App;
