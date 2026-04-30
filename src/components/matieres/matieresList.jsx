import MatieresCard from "./MatieresCard";

export default function matieresList({ matieres }) {
  if (matieres.length === 0) {
    return <p>Aucun matiere pour le moment</p>;
  }

  return (
    <div>
      {matieres.map((mat) => (
        <MatieresCard key={mat.id} matiere={mat} />
      ))}
    </div>
  );
}
