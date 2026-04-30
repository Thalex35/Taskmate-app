import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import MatieresList from "../components/matieres/matieresList";
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

  if (loading) {
    return <p>Chargement des matières...</p>;
  }

  return (
    <div>
      <h1>Mes matières</h1>

      {errorMessage && <p>{errorMessage}</p>}

      <MatieresList matieres={matieres} />

      <Link to="/new-matieres">
        <button>Créer une nouvelle matière</button>
      </Link>
    </div>
  );
}
