import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MatieresList from "../components/matieres/matieresList";
import { supabase } from "../lib/supabase";
import "../styles/matieres.css";

export default function Matieres() {
  const [matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchMatieres() {
      const { data, error } = await supabase
        .from("matieres")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setMatieres(data);
      }

      setLoading(false);
    }

    fetchMatieres();
  }, []);

  async function handleDeleteMatiere(id) {
    const { error } = await supabase.from("matieres").delete().eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMatieres((currentMatieres) =>
      currentMatieres.filter((matiere) => matiere.id !== id),
    );
  }

  if (loading) {
    return <p className="matieresPage__loading">Chargement des matieres...</p>;
  }

  return (
    <div className="matieresPage">
      <h1>Mes matieres</h1>

      {errorMessage && <p className="matieresPage__error">{errorMessage}</p>}

      <MatieresList matieres={matieres} onDeleteMatiere={handleDeleteMatiere} />

      <Link className="matieresPage__add" to="/new-matieres">
        + Ajouter une matiere
      </Link>
    </div>
  );
}
