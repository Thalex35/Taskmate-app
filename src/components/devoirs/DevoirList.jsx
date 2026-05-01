import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import DevoirCard from "./DevoirCard";
import "../../styles/DevoirList.css";

function calculerJoursRestants(dateLimite) {
  const aujourdhui = new Date();
  const limite = new Date(`${dateLimite}T00:00:00`);

  aujourdhui.setHours(0, 0, 0, 0);

  return Math.ceil((limite - aujourdhui) / (1000 * 60 * 60 * 24));
}

function afficherPriorite(priorite) {
  const value = priorite?.toLowerCase();

  if (["haute", "high", "urgent"].includes(value)) return "Haute";
  if (["basse", "low", "faible"].includes(value)) return "Basse";

  return "Moyenne";
}

function afficherStatut(statut) {
  const value = statut?.toLowerCase();

  if (["termine", "done"].includes(value)) return "Termine";
  if (["en_cours", "en cours", "in progress"].includes(value))
    return "En cours";

  return "A faire";
}

function getPrioriteClass(priorite) {
  if (priorite === "Haute") return "badge badge-haute";
  if (priorite === "Basse") return "badge badge-basse";
  return "badge badge-moyenne";
}

function getStatutClass(statut) {
  if (statut === "Termine") return "badge badge-termine";
  if (statut === "En cours") return "badge badge-encours";
  return "badge badge-afaire";
}

function formatDevoir(devoir) {
  return {
    id: devoir.id,
    titre: devoir.titre,
    description: devoir.description,
    matiere: devoir.matieres?.nom || "Sans matiere",
    priorite: afficherPriorite(devoir.priorite),
    statut: afficherStatut(devoir.statut),
    dateLimit: devoir.date_limite,
    joursRestants: calculerJoursRestants(devoir.date_limite),
  };
}

export default function DevoirList() {
  const [devoirs, setDevoirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [recherche, setRecherche] = useState("");
  const [filtreMatiere, setFiltreMatiere] = useState("Toutes");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [filtrePriorite, setFiltrePriorite] = useState("Toutes");
  const [selectedDevoir, setSelectedDevoir] = useState(null);

  useEffect(() => {
    async function fetchDevoirs() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("devoirs")
        .select(
          `
          id,
          titre,
          description,
          date_limite,
          priorite,
          statut,
          matieres (
            nom,
            couleur
          )
        `
        )
        .order("date_limite", { ascending: true });

      if (error) {
        console.error("Erreur fetch devoirs:", error.message);
        setErrorMessage("Impossible de charger les devoirs.");
      } else {
        setDevoirs(data.map(formatDevoir));
      }

      setLoading(false);
    }

    fetchDevoirs();
  }, []);

  const matieres = useMemo(
    () => ["Toutes", ...new Set(devoirs.map((d) => d.matiere))],
    [devoirs]
  );
  const statuts = ["Tous", "A faire", "En cours", "Termine"];
  const priorites = ["Toutes", "Haute", "Moyenne", "Basse"];

  const marquerTermine = async (id) => {
    const { error } = await supabase
      .from("devoirs")
      .update({ statut: "termine" })
      .eq("id", id);

    if (error) {
      console.error("Erreur update devoir:", error.message);
      setErrorMessage("Impossible de mettre le devoir a jour.");
      return;
    }

    setDevoirs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, statut: "Termine" } : d))
    );
  };

  const devoirsFiltres = devoirs.filter((d) => {
    const matchRecherche = d.titre
      .toLowerCase()
      .includes(recherche.toLowerCase());
    const matchMatiere =
      filtreMatiere === "Toutes" || d.matiere === filtreMatiere;
    const matchStatut = filtreStatut === "Tous" || d.statut === filtreStatut;
    const matchPriorite =
      filtrePriorite === "Toutes" || d.priorite === filtrePriorite;

    return matchRecherche && matchMatiere && matchStatut && matchPriorite;
  });

  const resetFiltres = () => {
    setRecherche("");
    setFiltreMatiere("Toutes");
    setFiltreStatut("Tous");
    setFiltrePriorite("Toutes");
  };

  if (loading) {
    return <p className="list-state">Chargement des devoirs...</p>;
  }

  return (
    <div className="devoir-list">
      {errorMessage && <p className="list-error">{errorMessage}</p>}

      <div className="list-filtres">
        <input
          type="text"
          placeholder="Chercher..."
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
              {m === "Toutes" ? "Toutes les matieres" : m}
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
              {p === "Toutes" ? "Priorite" : p}
            </option>
          ))}
        </select>

        <button type="button" className="filtre-reset" onClick={resetFiltres}>
          Reset
        </button>
      </div>

      <div className="list-grid">
        {devoirsFiltres.length > 0 ? (
          devoirsFiltres.map((devoir) => (
            <DevoirCard
              key={devoir.id}
              devoir={devoir}
              onMarquerTermine={marquerTermine}
              onSelect={setSelectedDevoir}
            />
          ))
        ) : (
          <p className="list-empty">Aucun devoir trouve.</p>
        )}
      </div>

      {selectedDevoir && (
        <div
          className="devoir-detail-backdrop"
          onClick={() => setSelectedDevoir(null)}
        >
          <section
            className="devoir-detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="devoir-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="devoir-detail-header">
              <div>
                <h2 id="devoir-detail-title">{selectedDevoir.titre}</h2>
                <div className="devoir-detail-badges">
                  <span className="badge badge-matiere">
                    {selectedDevoir.matiere}
                  </span>
                  <span className={getPrioriteClass(selectedDevoir.priorite)}>
                    {selectedDevoir.priorite}
                  </span>
                  <span className={getStatutClass(selectedDevoir.statut)}>
                    {selectedDevoir.statut}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="devoir-detail-close"
                onClick={() => setSelectedDevoir(null)}
                aria-label="Fermer"
              >
                X
              </button>
            </div>

            <div className="devoir-detail-grid">
              <div>
                <p className="devoir-detail-label">Date limite</p>
                <p>
                  {new Date(selectedDevoir.dateLimit).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>

              <div>
                <p className="devoir-detail-label">Temps restant</p>
                <p>
                  {selectedDevoir.joursRestants === 0
                    ? "Aujourd'hui"
                    : `${selectedDevoir.joursRestants}j restants`}
                </p>
              </div>
            </div>

            <div>
              <p className="devoir-detail-label">Description</p>
              <p className="devoir-detail-description">
                {selectedDevoir.description || "Aucune description."}
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
