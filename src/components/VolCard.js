import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./VolCard.css";

function VolCard({ vol }) {
  const [typeVoyage, setTypeVoyage] = useState("aller_simple");
  const [volRetourId, setVolRetourId] = useState("");
  const [volsRetour, setVolsRetour] = useState([]);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");
  const navigate = useNavigate();

  const handleTypeVoyage = async (e) => {
    setTypeVoyage(e.target.value);

    if (e.target.value === "aller_retour") {
      try {
        const response = await api.get("/vols/retour", {
          params: {
            origine: vol.destination,
            destination: vol.origine,
          },
        });
        setVolsRetour(response.data);
      } catch (error) {
        setErreur("Aucun vol retour disponible");
      }
    } else {
      setVolsRetour([]);
      setVolRetourId("");
    }
  };

  const reserver = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/reservations", {
        vol_id: vol.id,
        type_voyage: typeVoyage,
        vol_retour_id: typeVoyage === "aller_retour" ? volRetourId : null,
      });
      setSucces("Réservation confirmée !");
      setErreur("");
    } catch (error) {
      setErreur("Erreur lors de la réservation");
      setSucces("");
    }
  };

  return (
    <div className="vol-card">
      {/* Header */}
      <div className="vol-card-header">
        <span className="vol-numero">{vol.numero_vol}</span>
        <span className="vol-prix">{vol.prix} €</span>
      </div>

      {/* Trajet */}
      <div className="vol-trajet">
        <div className="vol-ville">
          <p className="ville-nom">{vol.origine}</p>
          <p className="ville-date">{vol.date_depart}</p>
        </div>

        <div className="vol-fleche">
          <div className="ligne"></div>
          <p>➯</p>
          <div className="ligne"></div>
        </div>

        <div className="vol-ville">
          <p className="ville-nom">{vol.destination}</p>
          <p className="ville-date">{vol.date_arrivee}</p>
        </div>
      </div>

      <div className="vol-separateur"></div>

      {/* Places */}
      <div className="vol-places">
        <p>{vol.places_disponibles} places disponibles</p>
      </div>

      {/* Réservation */}
      <div className="vol-reservation">
        {/* Type de voyage */}
        <select className="type-voyage" onChange={handleTypeVoyage}>
          <option value="aller_simple">Aller simple</option>
          <option value="aller_retour">Aller retour</option>
        </select>

        {/* Liste des vols retour */}
        {typeVoyage === "aller_retour" && (
          <select
            className="type-voyage"
            onChange={(e) => setVolRetourId(e.target.value)}
          >
            <option value="">Choisir un vol retour</option>
            {volsRetour.length === 0 ? (
              <option disabled>Aucun vol retour disponible</option>
            ) : (
              volsRetour.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.numero_vol} — {v.origine} → {v.destination} —{" "}
                  {v.date_depart} — {v.prix}€
                </option>
              ))
            )}
          </select>
        )}

        {erreur && <p className="erreur">{erreur}</p>}
        {succes && <p className="succes">{succes}</p>}

        <button className="btn-reserver" onClick={reserver}>
          Réserver
        </button>
      </div>
    </div>
  );
}

export default VolCard;
