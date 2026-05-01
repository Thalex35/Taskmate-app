import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DevoirForm.css";

const matieres = ["Informatique", "Business", "Anglais", "Mathématiques", "Histoire", "Autre"];
const priorites = ["Haute", "Moyenne", "Basse"];
const statuts = ["A faire", "En cours", "Terminé"];

export default function DevoirForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titre: "",
    matiere: "",
    priorite: "",
    statut: "",
    dateLimit: "",
  });

  const [erreurs, setErreurs] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErreurs((prev) => ({ ...prev, [name]: "" }));
  };

  const valider = () => {
    const nouvellesErreurs = {};
    if (!form.titre.trim()) nouvellesErreurs.titre = "Le titre est requis.";
    if (!form.matiere) nouvellesErreurs.matiere = "La matière est requise.";
    if (!form.priorite) nouvellesErreurs.priorite = "La priorité est requise.";
    if (!form.statut) nouvellesErreurs.statut = "Le statut est requis.";
    if (!form.dateLimit) nouvellesErreurs.dateLimit = "La date limite est requise.";
    return nouvellesErreurs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nouvellesErreurs = valider();
    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
      return;
    }
    // Rediriger vers la liste après soumission
    navigate("/devoirs");
  };

  const handleAnnuler = () => {
    navigate("/devoirs");
  };

  return (
    <div className="form-page">
      <h1 className="form-titre">Nouveau Devoir</h1>

      <form className="form-container" onSubmit={handleSubmit}>

        {/* Titre */}
        <div className="form-group">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="titre"
            value={form.titre}
            onChange={handleChange}
            placeholder="Ex: Exercices React Hooks"
            className={`form-input ${erreurs.titre ? "input-erreur" : ""}`}
          />
          {erreurs.titre && <span className="form-erreur">{erreurs.titre}</span>}
        </div>

        {/* Matière */}
        <div className="form-group">
          <label className="form-label">Matière</label>
          <select
            name="matiere"
            value={form.matiere}
            onChange={handleChange}
            className={`form-input ${erreurs.matiere ? "input-erreur" : ""}`}
          >
            <option value="">Choisir une matière</option>
            {matieres.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {erreurs.matiere && <span className="form-erreur">{erreurs.matiere}</span>}
        </div>

        {/* Priorité */}
        <div className="form-group">
          <label className="form-label">Priorité</label>
          <select
            name="priorite"
            value={form.priorite}
            onChange={handleChange}
            className={`form-input ${erreurs.priorite ? "input-erreur" : ""}`}
          >
            <option value="">Choisir une priorité</option>
            {priorites.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {erreurs.priorite && <span className="form-erreur">{erreurs.priorite}</span>}
        </div>

        {/* Statut */}
        <div className="form-group">
          <label className="form-label">Statut</label>
          <select
            name="statut"
            value={form.statut}
            onChange={handleChange}
            className={`form-input ${erreurs.statut ? "input-erreur" : ""}`}
          >
            <option value="">Choisir un statut</option>
            {statuts.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {erreurs.statut && <span className="form-erreur">{erreurs.statut}</span>}
        </div>

        {/* Date limite */}
        <div className="form-group">
          <label className="form-label">Date limite</label>
          <input
            type="date"
            name="dateLimit"
            value={form.dateLimit}
            onChange={handleChange}
            className={`form-input ${erreurs.dateLimit ? "input-erreur" : ""}`}
          />
          {erreurs.dateLimit && <span className="form-erreur">{erreurs.dateLimit}</span>}
        </div>

        {/* Boutons */}
        <div className="form-btns">
          <button type="button" className="btn-annuler" onClick={handleAnnuler}>
            Annuler
          </button>
          <button type="submit" className="btn-soumettre">
            + Ajouter le devoir
          </button>
        </div>

      </form>
    </div>
  );
}
