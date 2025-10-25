import ServiceCard from "../../components/ServiceCard";

const Voitures = () => {
  const voitures = [
    {
      title: "Renault Clio",
      description: "Économique, parfaite pour la ville.",
      image: "/assets/voiture.jpg",
    },
    {
      title: "Dacia Duster",
      description: "Confortable et robuste pour vos trajets.",
      image: "/assets/voiture2.jpg",
    },
    {
      title: "Peugeot 3008",
      description: "SUV premium pour un confort optimal.",
      image: "/assets/voiture3.jpg",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Location de voitures
      </h2>
      <p className="mb-6 text-gray-600">
        Choisissez parmi une large gamme de véhicules disponibles à la location
        partout au Maroc.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {voitures.map((v, i) => (
          <ServiceCard key={i} {...v} />
        ))}
      </div>
    </section>
  );
};

export default Voitures;
