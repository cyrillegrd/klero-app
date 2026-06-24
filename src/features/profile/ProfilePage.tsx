import { getRefugeStats } from "../refuge/refugeStats";
import { getBadges } from "../refuge/refugeBadges";
import { loadRoutineEntries } from "../routines/storage";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/auth";
import { useAuth } from "../../lib/useAuth";
import { saveCloudProfile } from "./profileCloud";

export function ProfilePage() {
  const stats = getRefugeStats();
  const badges = getBadges();
  const routineEntries = loadRoutineEntries();

  const unlockedBadges = badges.filter(
    (badge) => badge.unlocked
  ).length;

  const navigate = useNavigate();
const { user } = useAuth();

async function logout() {
  await signOut(auth);
  navigate("/login");
}

  return (
    <div className="page profile-page">
      <header className="page-header">
        <h1>Profil</h1>
        <p>Tes repères, ta progression et Kléo.</p>
      </header>

      <section className="card">
  <h2>🔐 Compte</h2>

  <p>
    Connecté avec : <strong>{user?.email}</strong>
  </p>

  <button
    type="button"
    className="secondary-button"
    onClick={logout}
  >
  Se déconnecter
  </button>
</section>

      <section className="card profile-card">
        <div className="profile-avatar">🦕</div>

        <div>
          <h2>Cyrille</h2>
          <p>Kléo t’accompagne à ton rythme.</p>
        </div>
      </section>

      <section className="card">
        <h2>🏝 Refuge</h2>
        <p>✨ {stats.refugePoints} points Refuge</p>
        <p>🦕 Forme actuelle : {stats.stade}</p>
        <p>🧬 Espèce : {stats.species}</p>
      </section>

      <section className="card">
        <h2>🔄 Routines</h2>
        <p>{routineEntries.length} routine(s) terminée(s)</p>
      </section>

      <section className="card">
        <h2>🏅 Badges</h2>
        <p>
          {unlockedBadges} / {badges.length} badge(s) débloqué(s)
        </p>
      </section>

      <section className="card">
        <h2>⚙️ Préférences</h2>
        <p>Réglages à venir : sons, vibration, mode calme.</p>
      </section>

<button
  type="button"
  className="primary-button"
  onClick={() => saveCloudProfile()}
>
  Sauvegarder mon profil
</button>
    </div>
  );
}
