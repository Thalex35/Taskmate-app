import MatieresCard from "./matieresCard";

export default function MatieresList({ matieres }) {
  if (matieres.length === 0) {
    return <p>Aucune matière pour le moment.</p>;
  }

  return (
    <div>
      {matieres.map((mat) => (
        <MatieresCard key={mat.id} matiere={mat} />
      ))}
    </div>
  );
}
