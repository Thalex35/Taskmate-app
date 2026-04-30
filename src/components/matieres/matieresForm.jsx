import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function MatieresForm() {
  const [nom, setNom] = useState("");
  const [couleur, setCouleur] = useState("#2c867a");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("matieres").insert({
      user_id: user.id,
      nom: nom.trim(),
      couleur,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setNom("");
    setCouleur("#2c867a");
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nom">Nom de la matière</label>
      <input
        id="nom"
        type="text"
        placeholder="Math"
        value={nom}
        onChange={(event) => setNom(event.target.value)}
        required
      />

      <label htmlFor="couleur">Couleur</label>
      <input
        id="couleur"
        type="color"
        value={couleur}
        onChange={(event) => setCouleur(event.target.value)}
      />

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creation..." : "Créer la matière"}
      </button>
    </form>
  );
}
