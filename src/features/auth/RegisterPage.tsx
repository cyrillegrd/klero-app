import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../lib/auth";

export function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {
      if (!firstName.trim()) {
        alert("Ajoute ton prenom.");
        return;
      }

      if (!lastName.trim()) {
        alert("Ajoute ton nom de famille.");
        return;
      }

      if (!age.trim()) {
        alert("Ajoute ton age.");
        return;
      }

      if (!gender.trim()) {
        alert("Choisis ton sexe.");
        return;
      }

      if (password.length < 12) {
        alert("Le mot de passe doit faire au moins 12 caracteres.");
        return;
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
      });

      await sendEmailVerification(result.user);

      localStorage.setItem("klero_name", firstName.trim());
      localStorage.setItem("klero_last_name", lastName.trim());
      localStorage.setItem("klero_age", age.trim());
      localStorage.setItem("klero_gender", gender.trim());

      navigate("/verify-email");
    } catch (error) {
      console.error(error);
      alert("Impossible de creer le compte. Verifie l'email et le mot de passe.");
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <h1>Creer ton compte</h1>

        <input
          value={firstName}
          placeholder="Prenom"
          onChange={(event) => setFirstName(event.target.value)}
        />

        <input
          value={lastName}
          placeholder="Nom de famille"
          onChange={(event) => setLastName(event.target.value)}
        />

        <input
          value={age}
          type="number"
          min="0"
          placeholder="Age"
          onChange={(event) => setAge(event.target.value)}
        />

        <select
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Sexe</option>
          <option value="female">Femme</option>
          <option value="male">Homme</option>
          <option value="non_binary">Non-binaire</option>
          <option value="not_specified">Je prefere ne pas dire</option>
        </select>

        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          value={password}
          type="password"
          placeholder="Mot de passe securise"
          onChange={(event) => setPassword(event.target.value)}
        />

        <small>
          Minimum 12 caracteres avec majuscule, minuscule, chiffre et symbole.
        </small>

        <button
          type="button"
          className="primary-button"
          onClick={register}
        >
          Creer le compte
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/login")}
        >
          J'ai deja un compte
        </button>
      </section>
    </div>
  );
}
