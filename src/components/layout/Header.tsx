import logoKlero from "../../assets/logos/logo_klero.png";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src={logoKlero}
        alt="Logo Klero"
        className="header__logo"
      />

      <button
        type="button"
        className="header__profile"
        onClick={() => navigate("/profil")}
        aria-label="Ouvrir le profil"
      >
        👤
      </button>
    </header>
  );
}
