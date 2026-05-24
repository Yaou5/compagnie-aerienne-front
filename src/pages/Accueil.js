import React from "react";
import { useNavigate } from "react-router-dom";
import "./Accueil.css";

function Accueil() {
  const navigate = useNavigate();

  return (
    <div className="accueil">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Bienvenue sur Air Niger</h1>
          <p>Voyagez en toute sérénité vers les plus belles destinations</p>
          <div className="hero-buttons">
            <button className="btn-orange" onClick={() => navigate("/vols")}>
              Rechercher un vol
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate("/register")}
            >
              S'inscrire gratuitement
            </button>
          </div>
        </div>
      </div>
      {/* Section découverte */}
      <div className="decouverte-section">
        <h2>Découvrez nos services</h2>
        <div className="decouverte-grid">
          <div
            className="decouverte-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
            url('https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800')`,
            }}
          >
            <div className="decouverte-content">
              <h3>Nos Destinations</h3>
              <p>Découvrez plus de 50 destinations à travers le monde</p>
              <button className="btn-decouvrir">En savoir plus</button>
            </div>
          </div>

          <div
            className="decouverte-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
            url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800')`,
            }}
          >
            <div className="decouverte-content">
              <h3>Nos Offres</h3>
              <p>Des tarifs compétitifs pour tous vos voyages</p>
              <button className="btn-decouvrir">En savoir plus</button>
            </div>
          </div>

          <div
            className="decouverte-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
            url('https://images.unsplash.com/photo-1540339832862-474599807836?w=800')`,
            }}
          >
            <div className="decouverte-content">
              <h3>Nos Services</h3>
              <p>Un confort optimal pour tous vos déplacements</p>
              <button className="btn-decouvrir">En savoir plus</button>
            </div>
          </div>

          <div
            className="decouverte-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
            url('https://images.unsplash.com/photo-1483450388369-9ed95738483c?w=800')`,
            }}
          >
            <div className="decouverte-content">
              <h3>Réservation facile</h3>
              <p>Réservez vos vols en quelques clics</p>
              <button className="btn-decouvrir">En savoir plus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
