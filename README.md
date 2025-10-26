# Maroc 2030 - Plateforme de Tourisme et Services au Maroc

Application web moderne pour les services de voyage au Maroc : location de voitures, réservation d'hôtels, appartements, villas et tourisme.

## 🚀 Technologies Utilisées

- **React 19** avec TypeScript
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS 4** - Framework CSS utility-first
- **React Router 7** - Navigation et routing
- **TanStack React Query** - Gestion de l'état serveur
- **Framer Motion** - Animations fluides
- **React Hot Toast** - Notifications élégantes
- **Lucide React** & **React Icons** - Icônes modernes

## ⚠️ Problèmes Identifiés et Corrigés

### ✅ Problèmes Corrigés

1. **Double configuration de QueryClient** 
   - ❌ Le `QueryClientProvider` était défini à la fois dans `App.tsx` et `main.tsx`
   - ✅ Corrigé : Maintenant uniquement dans `main.tsx`

2. **Service Worker manquant**
   - ❌ Le code tentait d'enregistrer un service worker inexistant
   - ✅ Corrigé : Code du service worker retiré de `main.tsx`

### 🔧 Configuration

Le projet est configuré avec :
- TypeScript strict mode
- ESLint pour la qualité du code
- Tailwind CSS 4 avec plugins personnalisés
- Lazy loading des routes pour les performances
- Optimisation des images et assets

## 📦 Installation

### Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn** ou **pnpm**

### Étapes d'installation

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement
npm run dev

# 3. Ouvrir le navigateur à l'adresse
# http://localhost:3000
```

## 🛠️ Scripts Disponibles

```bash
# Développement (avec hot reload)
npm run dev

# Build de production
npm run build

# Prévisualiser le build de production
npm run preview

# Linter le code
npm run lint
```

## 📁 Structure du Projet

```
Maroc-2030/
├── public/                    # Assets statiques
│   ├── assets/
│   │   ├── APT/              # Images des appartements
│   │   ├── events/           # Images des événements
│   │   └── hero/             # Images du hero section
│   └── about/                # Images à propos
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ApartmentCard.tsx
│   │   ├── HotelCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── BookingForm.tsx
│   │   └── LoadingSpinner.tsx
│   ├── Pages/                # Pages de l'application
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Evenements.tsx
│   │   ├── Imam.tsx
│   │   ├── Annonces.tsx
│   │   ├── Apropos.tsx
│   │   ├── Contact.tsx
│   │   ├── Inscription.tsx
│   │   ├── PageNotFound.tsx
│   │   └── services/         # Sous-pages de services
│   │       ├── Tourisme.tsx
│   │       ├── Voitures.tsx
│   │       ├── Appartements.tsx
│   │       ├── Villas.tsx
│   │       └── Hotels.tsx
│   ├── App.tsx              # Composant principal avec routes
│   ├── main.tsx             # Point d'entrée de l'application
│   └── index.css            # Styles globaux
├── tailwind.config.js       # Configuration Tailwind
├── vite.config.ts           # Configuration Vite
└── package.json             # Dépendances du projet
```

## 🎨 Personnalisation

### Couleurs

Les couleurs personnalisées sont définies dans `tailwind.config.js` :

- **Primary** : Bleu (#0ea5e9)
- **Secondary** : Violet (#8b5cf6)
- **Success** : Vert (#22c55e)
- **Warning** : Orange (#f59e0b)
- **Error** : Rouge (#ef4444)

### Police

Les polices sont configurées avec Google Fonts :
- **Inter** : Police principale
- **Poppins** : Police de titre
- **Scheherazade New** : Police pour l'arabe

## 🌐 Routes Disponibles

- `/` - Accueil
- `/services` - Page principale des services
  - `/services/appartements` - Location d'appartements
  - `/services/tourisme` - Services touristiques
  - `/services/voitures` - Location de voitures
  - `/services/villas` - Location de villas
  - `/services/hotels` - Réservation d'hôtels
- `/evenements` - Événements au Maroc
- `/imam` - Services d'imam
- `/annonces` - Annonces
- `/apropos` - À propos
- `/contact` - Contact
- `/inscription` - Inscription

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

### Déploiement sur Vercel, Netlify, ou autre plateforme

1. Connectez votre repository GitHub
2. Configurez la commande de build : `npm run build`
3. Définissez le dossier de sortie : `dist`
4. Déployez !

## 📝 Notes Importantes

- Assurez-vous que Node.js version 18+ est installé
- Le projet utilise React 19 (version récente)
- TypeScript est configuré en mode strict
- Les images sont optimisées pour le web
- Le lazy loading est activé pour les routes

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre feature
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Maroc 2030** - Plateforme de services touristiques au Maroc
