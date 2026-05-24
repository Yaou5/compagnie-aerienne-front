import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.log("Erreur logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        Air Niger
      </div>

      <div className="navbar-links">
        <span onClick={() => navigate("/vols")}>Vols</span>

        {user ? (
          <>
            <span onClick={() => navigate("/reservations")}>
              Mes Réservations
            </span>

            {user.role === "admin" && (
              <span onClick={() => navigate("/admin")}>Admin</span>
            )}

            <div className="navbar-user">
              <span className="user-name">Bonjour, {user.name}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Déconnexion
              </button>
            </div>
          </>
        ) : (
          <>
            <span onClick={() => navigate("/login")}>Connexion</span>
            <button
              className="btn-inscription"
              onClick={() => navigate("/register")}
            >
              S'inscrire
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
