import React, { useState, useEffect } from "react";
import api from "../services/api";
import VolCard from "../components/VolCard";
import "./Vols.css";

function Vols() {
  const [vols, setVols] = useState([]);
  const [origine, setOrigine] = useState("");
  const [destination, setDest] = useState("");
  const [date, setDate] = useState("");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerVols();
  }, []);

  const chargerVols = async () => {
    try {
      const response = await api.get("/vols");
      setVols(response.data);
    } catch (error) {
      setErreur("Erreur lors du chargement des vols");
    }
  };

  const rechercherVols = async () => {
    try {
      const response = await api.get("/vols/search", {
        params: { origine, destination, date_depart: date },
      });
      setVols(response.data);
    } catch (error) {
      setErreur("Aucun vol trouvé");
    }
  };

  return (
    <div className="vols-container">
      {/* Barre de recherche */}
      <div className="recherche-section">
        <h2>Rechercher un vol</h2>
        <div className="recherche-form">
          <div className="form-group">
            <label>Origine</label>
            <input
              type="text"
              placeholder="Ville de départ"
              value={origine}
              onChange={(e) => setOrigine(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              placeholder="Ville d'arrivée"
              value={destination}
              onChange={(e) => setDest(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Date de départ</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="recherche-buttons">
            <button className="btn-recherche" onClick={rechercherVols}>
              Rechercher
            </button>
            <button className="btn-reset" onClick={chargerVols}>
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Liste des vols */}
      <div className="vols-section">
        <h2>Vols disponibles</h2>

        {erreur && <p className="erreur">{erreur}</p>}

        {vols.length === 0 ? (
          <p className="aucun-vol">Aucun vol disponible</p>
        ) : (
          <div className="vols-liste">
            {vols.map((vol) => (
              <VolCard key={vol.id} vol={vol} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Vols;
