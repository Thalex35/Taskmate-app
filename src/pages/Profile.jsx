import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("Uespoir");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Erreur getUser:", error.message);
        setLoading(false);
        return;
      }

      const u = data.user;
      setUser(u);
      setFirstName(u?.user_metadata?.first_name || "");
      setLastName(u?.user_metadata?.last_name || "");
      setEmail(u.email || "");
      setUniversity("Uespoir"); // Default, can be extended
      setLoading(false);
    }

    fetchUser();
  }, []);

  const initials = `${firstName.charAt(0) || ""}${lastName.charAt(0) || ""}` || "U";
  const fullName = `${firstName} ${lastName}`.trim() || "Utilisateur";

  const handleProfileSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const updates = {
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
        },
      };

      const { error } = await supabase.auth.updateUser(updates);
      if (error) throw error;

      setUser({ ...user, user_metadata: updates.user_metadata });
      setEditMode(false);
      setMessage("Profil mis à jour !");
    } catch (error) {
      setMessage("Erreur: " + error.message);
    }
    setSaving(false);
  };

  const handlePasswordSave = async () => {
    setSaving(true);
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      setSaving(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;

      setPasswordMode(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Mot de passe mis à jour !");
    } catch (error) {
      setMessage("Erreur: " + error.message);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="profile-page">Chargement...</div>;
  }

  return (
    <div className="profile-page">
      {message && <div className="message">{message}</div>}

      <h2 className="profile-title">Mon Profil</h2>

      {/* HEADER CARD */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{initials}</div>

          <div>
            <h3>{fullName}</h3>
            <p>{email}</p>

            <div className="tags">
              <span>Étudiant</span>
              <span>{university}</span>
            </div>
          </div>
        </div>

        {editMode ? (
          <div className="edit-buttons">
            <button onClick={handleProfileSave} disabled={saving}>
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
            <button onClick={() => setEditMode(false)}>Annuler</button>
          </div>
        ) : (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            ✏️ Modifier
          </button>
        )}
      </div>

      {/* INFOS */}
      <div className="profile-section">
        <h4>INFORMATIONS PERSONNELLES</h4>

        <div className="row">
          <span>Nom complet</span>
          {editMode ? (
            <div>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
              />
            </div>
          ) : (
            <span>{fullName}</span>
          )}
        </div>

        <div className="row">
          <span>Email</span>
          {editMode ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        <div className="row">
          <span>Université</span>
          {editMode ? (
            <input
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          ) : (
            <span>{university}</span>
          )}
        </div>
      </div>

      {/* SECURITY */}
      <div className="profile-section">
        <h4>SÉCURITÉ</h4>

        <div className="row">
          <span>Mot de passe</span>
          {passwordMode ? (
            <div className="password-form">
              <input
                type="password"
                placeholder="Mot de passe actuel"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmer nouveau"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="edit-buttons">
                <button onClick={handlePasswordSave} disabled={saving}>
                  {saving ? "Sauvegarde..." : "Changer"}
                </button>
                <button onClick={() => setPasswordMode(false)}>Annuler</button>
              </div>
            </div>
          ) : (
            <button className="btn-outline" onClick={() => setPasswordMode(true)}>
              Modifier le mot de passe
            </button>
          )}
        </div>
      </div>

      {/* PREFERENCES */}
      <div className="profile-section">
        <h4>PRÉFÉRENCES</h4>

        <div className="row">
          <div>
            <span>Mode sombre</span>
            <p className="sub">Personnalisez votre expérience</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
