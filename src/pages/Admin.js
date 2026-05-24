import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./Admin.css";

function Admin() {
  const [reservations, setReservations] = useState([]);

  const [onglet, setOnglet] = useState("vols");
  const [vols, setVols] = useState([]);
  const [users, setUsers] = useState([]);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");
  const [volModifier, setVolModifier] = useState(null);

  // Formulaire vol
  const [numeroVol, setNumeroVol] = useState("");
  const [origine, setOrigine] = useState("");
  const [destination, setDestination] = useState("");
  const [dateDepart, setDateDepart] = useState("");
  const [dateArrivee, setDateArrivee] = useState("");
  const [prix, setPrix] = useState("");
  const [placesDisponibles, setPlaces] = useState("");

  useEffect(() => {
    chargerVols();
    chargerUsers();
    chargerReservations();
  }, []);

  const chargerReservations = async () => {
    try {
      const response = await api.get("/reservations");
      setReservations(response.data);
    } catch (error) {
      setErreur("Erreur chargement réservations");
    }
  };

  const chargerVols = async () => {
    try {
      const response = await api.get("/vols");
      setVols(response.data);
    } catch (error) {
      setErreur("Erreur chargement vols");
    }
  };

  const chargerUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      setErreur("Erreur chargement utilisateurs");
    }
  };

  const viderFormulaire = () => {
    setNumeroVol("");
    setOrigine("");
    setDestination("");
    setDateDepart("");
    setDateArrivee("");
    setPrix("");
    setPlaces("");
  };

  const creerVol = async () => {
    try {
      await api.post("/vols", {
        numero_vol: numeroVol,
        origine: origine,
        destination: destination,
        date_depart: dateDepart,
        date_arrivee: dateArrivee,
        prix: prix,
        places_disponibles: placesDisponibles,
      });
      setSucces("Vol créé avec succès");
      setErreur("");
      chargerVols();
      viderFormulaire();
    } catch (error) {
      setErreur("Erreur lors de la création du vol");
    }
  };

  const ouvrirModification = (vol) => {
    setVolModifier(vol);
    setNumeroVol(vol.numero_vol);
    setOrigine(vol.origine);
    setDestination(vol.destination);
    setDateDepart(vol.date_depart);
    setDateArrivee(vol.date_arrivee);
    setPrix(vol.prix);
    setPlaces(vol.places_disponibles);
  };

  const modifierVol = async () => {
    try {
      await api.put(`/vols/${volModifier.id}`, {
        numero_vol: numeroVol,
        origine: origine,
        destination: destination,
        date_depart: dateDepart,
        date_arrivee: dateArrivee,
        prix: prix,
        places_disponibles: placesDisponibles,
      });
      setSucces("Vol modifié avec succès");
      setErreur("");
      setVolModifier(null);
      chargerVols();
      viderFormulaire();
    } catch (error) {
      setErreur("Erreur lors de la modification");
    }
  };

  const supprimerVol = async (id) => {
    try {
      await api.delete(`/vols/${id}`);
      setSucces("Vol supprimé avec succès");
      setErreur("");
      chargerVols();
    } catch (error) {
      setErreur("Erreur suppression vol");
    }
  };

  const supprimerUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setSucces("Utilisateur supprimé avec succès");
      setErreur("");
      chargerUsers();
    } catch (error) {
      setErreur("Erreur suppression utilisateur");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-titre">Tableau de bord Admin</h1>

      {erreur && <p className="erreur">{erreur}</p>}
      {succes && <p className="succes">{succes}</p>}

      {/* Onglets */}
      <div className="admin-onglets">
        <button
          className={onglet === "vols" ? "onglet actif" : "onglet"}
          onClick={() => setOnglet("vols")}
        >
          Gestion des vols
        </button>
        <button
          className={onglet === "users" ? "onglet actif" : "onglet"}
          onClick={() => setOnglet("users")}
        >
          Gestion des utilisateurs
        </button>

        <button
          className={onglet === "reservations" ? "onglet actif" : "onglet"}
          onClick={() => setOnglet("reservations")}
        >
          Réservations
        </button>
      </div>

      {/* Onglet Vols */}
      {onglet === "vols" && (
        <div>
          {/* Formulaire */}
          <div className="admin-form">
            <h2>{volModifier ? "Modifier le vol" : "Créer un vol"}</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Numéro de vol</label>
                <input
                  type="text"
                  placeholder="AF123"
                  value={numeroVol}
                  onChange={(e) => setNumeroVol(e.target.value)}
                />
              </div>
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
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Date de départ</label>
                <input
                  type="datetime-local"
                  value={dateDepart}
                  onChange={(e) => setDateDepart(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Date d'arrivée</label>
                <input
                  type="datetime-local"
                  value={dateArrivee}
                  onChange={(e) => setDateArrivee(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Prix (€)</label>
                <input
                  type="number"
                  placeholder="450"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Places disponibles</label>
                <input
                  type="number"
                  placeholder="150"
                  value={placesDisponibles}
                  onChange={(e) => setPlaces(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn-creer"
                onClick={volModifier ? modifierVol : creerVol}
              >
                {volModifier ? "Enregistrer les modifications" : "Créer le vol"}
              </button>

              {volModifier && (
                <button
                  className="btn-annuler"
                  onClick={() => {
                    setVolModifier(null);
                    viderFormulaire();
                  }}
                >
                  Annuler
                </button>
              )}
            </div>
          </div>

          {/* Liste des vols */}
          <div className="admin-table-container">
            <h2>Liste des vols</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Origine</th>
                  <th>Destination</th>
                  <th>Départ</th>
                  <th>Prix</th>
                  <th>Places</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vols.map((vol) => (
                  <tr key={vol.id}>
                    <td>{vol.numero_vol}</td>
                    <td>{vol.origine}</td>
                    <td>{vol.destination}</td>
                    <td>{vol.date_depart}</td>
                    <td>{vol.prix} €</td>
                    <td>{vol.places_disponibles}</td>
                    <td>
                      <button
                        className="btn-modifier"
                        onClick={() => ouvrirModification(vol)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn-supprimer"
                        onClick={() => supprimerVol(vol.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Onglet Users */}
      {onglet === "users" && (
        <div className="admin-table-container">
          <h2>Liste des utilisateurs</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={
                        user.role === "admin" ? "badge-admin" : "badge-user"
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-supprimer"
                      onClick={() => supprimerUser(user.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {onglet === "reservations" && (
        <div className="admin-table-container">
          <h2>Liste des réservations</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Utilisateur</th>
                <th>Vol</th>
                <th>Destination</th>
                <th>Type</th>
                <th>Date réservation</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.user.name}</td>
                  <td>{reservation.vol.numero_vol}</td>
                  <td>{reservation.vol.destination}</td>
                  <td>{reservation.type_voyage}</td>
                  <td>{reservation.date_reservation}</td>
                  <td>
                    <span
                      className={
                        reservation.statut === "confirmé"
                          ? "badge-admin"
                          : "badge-user"
                      }
                    >
                      {reservation.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
