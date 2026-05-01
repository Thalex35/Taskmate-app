import { useState } from "react";
import DevoirCard from "./DevoirCard";
import "../../styles/DevoirList.css";

const initialDevoirs = [
  {
    id: 1,
    titre: "Exercices React Hooks",
    matiere: "Informatique",
    priorite: "Haute",
    statut: "A faire",
    dateLimit: "2026-04-01",
    joursRestants: 0,
  },
  {
    id: 2,
    titre: "Dissertation Marketing",
    matiere: "Business",
    priorite: "Haute",
    statut: "En cours",
    dateLimit: "2026-04-05",
    joursRestants: 2,
  },
  {
    id: 3,
    titre: "Vocabulaire Quiz",
    matiere: "Anglais",
    priorite: "Moyenne",
    statut: "A faire",
    dateLimit: "2026-04-10",
    joursRestants: 9,
  },
  {
    id: 4,
    titre: "Projet final API",
    matiere: "Informatique",
    priorite: "Haute",
    statut: "A faire",
    dateLimit: "2026-04-15",
    joursRestants: 14,
  },
];

export default function DevoirList() {
  const [devoirs, setDevoirs] = useState(initialDevoirs);
  const [recherche, setRecherche] = useState("");
  const [filtreMatiere, setFiltreMatiere] = useState("Toutes");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [filtrePriorite, setFiltrePriorite] = useState("Toutes");

  // Listes uniques pour filtres
  const matieres = ["Toutes", ...new Set(devoirs.map((d) => d.matiere))];
  const statuts = ["Tous", "A faire", "En cours", "Terminé"];
  const priorites = ["Toutes", "Haute", "Moyenne", "Basse"];

  // Changer statut
  const marquerTermine = (id) => {
    setDevoirs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, statut: "Terminé" } : d))
    );
  };

  // Filtrage
  const devoirsFiltres = devoirs.filter((d) => {
    const matchRecherche = d.titre.toLowerCase().includes(recherche.toLowerCase());
    const matchMatiere = filtreMatiere === "Toutes" || d.matiere === filtreMatiere;
    const matchStatut = filtreStatut === "Tous" || d.statut === filtreStatut;
    const matchPriorite = filtrePriorite === "Toutes" || d.priorite === filtrePriorite;
    return matchRecherche && matchMatiere && matchStatut && matchPriorite;
  });

  // Reset filtres
  const resetFiltres = () => {
    setRecherche("");
    setFiltreMatiere("Toutes");
    setFiltreStatut("Tous");
    setFiltrePriorite("Toutes");
  };

  return (
    <div className="devoir-list">
      {/* Filtres */}
      <div className="list-filtres">
        <input
          type="text"
          placeholder="🔍 Chercher..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="filtre-search"
        />

        <select
          value={filtreMatiere}
          onChange={(e) => setFiltreMatiere(e.target.value)}
          className="filtre-select"
        >
          {matieres.map((m) => (
            <option key={m} value={m}>
              {m === "Toutes" ? "Toutes les matières" : m}
            </option>
          ))}
        </select>

        <select
          value={filtreStatut}
          onChange={(e) => setFiltreStatut(e.target.value)}
          className="filtre-select"
        >
          {statuts.map((s) => (
            <option key={s} value={s}>
              {s === "Tous" ? "Tous statuts" : s}
            </option>
          ))}
        </select>

        <select
          value={filtrePriorite}
          onChange={(e) => setFiltrePriorite(e.target.value)}
          className="filtre-select"
        >
          {priorites.map((p) => (
            <option key={p} value={p}>
              {p === "Toutes" ? "Priorité" : p}
            </option>
          ))}
        </select>

        <button className="filtre-reset" onClick={resetFiltres}>
          ✕ Reset
        </button>
      </div>

      {/* Grille de cartes */}
      <div className="list-grid">
        {devoirsFiltres.length > 0 ? (
          devoirsFiltres.map((devoir) => (
            <DevoirCard
              key={devoir.id}
              devoir={devoir}
              onMarquerTermine={marquerTermine}
            />
          ))
        ) : (
          <p className="list-empty">Aucun devoir trouvé.</p>
        )}
      </div>
    </div>
  );
}
