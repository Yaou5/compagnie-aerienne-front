import React, { useState, useEffect } from "react";
import api from "../services/api";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  useEffect(() => {
    chargerReservations();
  }, []);

  const chargerReservations = async () => {
    try {
      const response = await api.get("/mes-reservations");
      setReservations(response.data);
    } catch (error) {
      setErreur("Erreur lors du chargement des réservations");
    }
  };

  const annulerReservation = async (id) => {
    try {
      await api.delete(`/reservations/${id}`);
      setSucces("Réservation annulée avec succès");
      chargerReservations();
    } catch (error) {
      setErreur("Erreur lors de l'annulation");
    }
  };

  return (
    <div>
      <h2>Mes Réservations</h2>

      {erreur && <p style={{ color: "red" }}>{erreur}</p>}
      {succes && <p style={{ color: "green" }}>{succes}</p>}

      {reservations.length === 0 ? (
        <p>Aucune réservation pour le moment</p>
      ) : (
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>Réservation #{reservation.id}</h3>

            {/* Vérification que vol existe */}
            {reservation.vol ? (
              <>
                <p>Vol : {reservation.vol.numero_vol}</p>
                <p>Origine : {reservation.vol.origine}</p>
                <p>Destination : {reservation.vol.destination}</p>
                <p>Départ : {reservation.vol.date_depart}</p>
              </>
            ) : (
              <p>Vol non disponible</p>
            )}

            <p>Type : {reservation.type_voyage}</p>
            <p>Statut : {reservation.statut}</p>

            {/* Vol retour si aller_retour */}
            {reservation.vol_retour_id && reservation.volRetour && (
              <div>
                <h4>Vol retour</h4>
                <p>Numéro : {reservation.volRetour.numero_vol}</p>
                <p>Départ : {reservation.volRetour.date_depart}</p>
              </div>
            )}

            {reservation.statut === "confirmé" && (
              <button
                onClick={() => annulerReservation(reservation.id)}
                style={{ color: "red" }}
              >
                Annuler
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Reservations;
