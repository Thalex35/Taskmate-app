import { Trash } from "lucide-react";

export default function MatieresCard({ matiere }) {
  return (
    <div>
      <p>{matiere.nom}</p>
      <p>
        <Trash size={15} />
      </p>
    </div>
  );
}
