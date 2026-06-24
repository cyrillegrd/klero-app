import { bootstrapUserData } from "../../lib/cloudBootstrap";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../lib/auth";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const result =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      if (!result.user.emailVerified) {
        alert(
          "Tu dois vérifier ton email avant de te connecter."
        );
        return;
      }

      await bootstrapUserData();
navigate("/");
    } catch (error) {
      console.error(error);
      alert("Email ou mot de passe incorrect.");
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <h1>Connexion</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="button"
          className="primary-button"
          onClick={login}
        >
          Se connecter
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/register")}
        >
          Créer un compte
        </button>
      </section>
    </div>
  );
}
