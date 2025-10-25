import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Création d'un client React Query avec des options par défaut
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Récupération de l'élément racine
const container = document.getElementById('root');

if (!container) {
  throw new Error("L'élément racine 'root' est introuvable dans le DOM");
}

// Création de la racine de rendu
const root = createRoot(container);

// Rendu de l'application avec les fournisseurs nécessaires
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  </React.StrictMode>
);

// Enregistrement du service worker pour le PWA (optionnel)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker enregistré avec succès :', registration.scope);
      })
      .catch((error) => {
        console.error("Échec de l'enregistrement du ServiceWorker :", error);
      });
  });
}
