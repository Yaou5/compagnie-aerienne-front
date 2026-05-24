import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", { name, email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/vols");
    } catch (error) {
      setErreur("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Inscription</h2>
          <p>Créez votre compte gratuitement</p>
        </div>

        {erreur && <p className="erreur">{erreur}</p>}

        <div className="auth-form">
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="exemple@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Minimum 6 caractères"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-submit" onClick={handleRegister}>
            S'inscrire
          </button>

          <p className="auth-link">
            Déjà un compte ?
            <span onClick={() => navigate("/login")}>Se connecter</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
