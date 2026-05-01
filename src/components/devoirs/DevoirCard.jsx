import "../../styles/DevoirCard.css";

export default function DevoirCard({ devoir, onMarquerTermine, onSelect }) {
  const { id, titre, matiere, priorite, statut, dateLimit, joursRestants } =
    devoir;

  const statutClass =
    statut === "Termine"
      ? "badge badge-termine"
      : statut === "En cours"
        ? "badge badge-encours"
        : "badge badge-afaire";

  const prioriteClass =
    priorite === "Haute"
      ? "badge badge-haute"
      : priorite === "Moyenne"
        ? "badge badge-moyenne"
        : "badge badge-basse";

  const joursTexte =
    joursRestants === 0 ? "Aujourd'hui !" : `${joursRestants}j restants`;

  const joursClass = joursRestants <= 2 ? "card-jours urgent" : "card-jours";
  const statutTexte = statut === "Termine" ? "Termine" : statut;

  return (
    <article
      className="devoir-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(devoir)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(devoir);
        }
      }}
    >
      <div className="card-header">
        <h3 className="card-titre">{titre}</h3>
        <div className="card-icons" onClick={(event) => event.stopPropagation()}>
          <span>Modifier</span>
          <span>Supprimer</span>
        </div>
      </div>

      <div className="card-badges">
        <span className="badge badge-matiere">{matiere}</span>
        <span className={prioriteClass}>{priorite}</span>
        <span className={statutClass}>{statutTexte}</span>
      </div>

      <div className="card-footer">
        <span className="card-date">
          {new Date(dateLimit).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <span className={joursClass}>{joursTexte}</span>
      </div>

      {statut !== "Termine" ? (
        <button
          className="card-btn-terminer"
          onClick={(event) => {
            event.stopPropagation();
            onMarquerTermine(id);
          }}
        >
          Marquer comme termine
        </button>
      ) : (
        <div className="card-termine-label">Termine</div>
      )}
    </article>
  );
}
