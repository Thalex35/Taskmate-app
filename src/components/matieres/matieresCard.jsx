import { Trash } from "lucide-react";
import "../../styles/matiereCard.css";

export default function MatieresCard({ matiere, onDelete }) {
  const initials = matiere.nom
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <article className="cardMat">
      <div
        className="cardMat__logo"
        style={{ backgroundColor: matiere.couleur || "var(--btn_color)" }}
      >
        {initials}
      </div>

      <div className="cardMat__content">
        <h2>{matiere.nom}</h2>
        <p>0 devoir - 0 termine</p>
      </div>

      <button className="cardMat__delete" type="button" onClick={onDelete}>
        <Trash size={14} />
        <span>Supprimer</span>
      </button>
    </article>
  );
}
