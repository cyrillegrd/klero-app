import logoKlero from "../../assets/logos/logo_klero.png";

export function Header() {
  return (
    <header className="header">
      <img
        src={logoKlero}
        alt="Logo Klero"
        className="header__logo"
      />

      <div>
        <h1 className="header__title">
          Bonjour 👋
        </h1>

        <p className="header__subtitle">
          Kléo est avec toi aujourd'hui.
        </p>
      </div>
    </header>
  );
}