import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Erreur getUser:", error.message);
      } else {
        setUser(data.user);
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Chargement...</div>;
  }

  return (
    <section className="dashboard-page">
      <h1 className="dashboard-title">Mon Tableau de bord</h1>
      <h2 className="dashboard-greeting">
        Bonjour {user?.user_metadata?.first_name || "utilisateur"}!
      </h2>

      <div className="cardsDevoir">
        <div className="cardDevoir">
          <p>TOTAL</p>
          <span>6</span>
        </div>
        <div className="cardDevoir">
          <p>A FAIRE</p>
          <span>4</span>
        </div>
        <div className="cardDevoir">
          <p>EN COURS</p>
          <span>1</span>
        </div>
        <div className="cardDevoir">
          <p>TERMINE</p>
          <span>1</span>
        </div>
      </div>

      <div className="sectionUrgents">
        <div className="h3_btn">
          <h2>Devoirs Urgents</h2>
          <Link to="/devoirs">
            <button type="button" className="btn_see">
              Voir tous &rarr;
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
