import React, { useState, useEffect } from 'react';
import SeanceService from '../services/SeanceService';
import Seance from '../components/Seance.js';
import CreateSeanceModal from '../components/CreateSeanceModal.js';
import UpdateSeanceModal from '../components/UpdateSeanceModal.js';
import allCinemas from "../data-test/cinemas.json"
import allFilms from "../data-test/films.json"

const GestionCinema = () => {
    const [cinemas, setCinemas] = useState([]);
    const [films, setFilms] = useState([]);
    const [seances, setSeances] = useState([]);
    const [currentCinemaId, setCurrentCinemaId] = useState([]);
    const onCinemaTabClick = (cinemaId) => {
        setCurrentCinemaId(cinemaId);
    };

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentSeance, setCurrentSeance] = useState(null);

    const handleUpdateClick = (seanceId) => {
        const seanceToUpdate = seances.find((seance) => seance.idSeance === seanceId);
        setCurrentSeance(seanceToUpdate);
        setShowUpdateModal(true);
    };

    const handleDeleteClick = async (idSeance) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette séance ?")) {
            await SeanceService.deleteSeance(idSeance);
            // Recharger les séances après la suppression
            refreshSeances();
        }
    };

    useEffect(() => {
        setCinemas(allCinemas.data);
    }, []);

    useEffect(() => {
        setFilms(allFilms.data.allMovies);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentCinemaId || (Array.isArray(currentCinemaId) && currentCinemaId.length === 0)) {
                setCurrentCinemaId(allCinemas.data[0]?.id || null);
                return;
            }

            const seancesByCinema = await SeanceService.getSeancesByCinema(currentCinemaId);
            if (seancesByCinema) {
                setSeances(seancesByCinema);
            }
        };

        fetchData();
    }, [currentCinemaId]);

    const refreshSeances = async () => {
        const seancesByCinema = await SeanceService.getSeancesByCinema(currentCinemaId);
        if (seancesByCinema) {
            setSeances(seancesByCinema);
        }
    };

    return (
      <div className="container text-center">
          <div className="row">
              <div className="col">
                  <h1 className="justify-content-center">Gestion Cinéma</h1>
              </div>
          </div>
          <br/>
          <div className="row">
              <div className="col">
                  <ul className="nav nav-pills nav-fill justify-content-center">
                      {cinemas.map((cinema) => (
                        <li key={cinema.id} className="nav-item cursor-pointer" onClick={() => onCinemaTabClick(cinema.id)}>
                            <h1 className={`nav-link ${currentCinemaId === cinema.id ? 'active' : ''}`}>
                                {cinema.nom}
                            </h1>
                        </li>
                      ))}
                  </ul>
              </div>
          </div>
          <div className="row">
              <div className="col">
                  <table className="table table-dark table-striped">
                      <thead>
                      <tr>
                          <th>Salle</th>
                          <th>Film</th>
                          <th>Date</th>
                          <th>Début</th>
                          <th>Fin</th>
                          <th>Places disponibles</th>
                          <th>
                              <button className="btn btn-outline-info btn-sm" onClick={() => setShowCreateModal(true)}>Add</button>
                          </th>
                      </tr>
                      <tr style={{ height: "20px" }} />
                      </thead>
                      <tbody>
                      {seances
                        .sort((a, b) => {
                            // Trie d'abord par salle
                            if (a.idSalle !== b.idSalle) {
                                return a.idSalle - b.idSalle;
                            }

                            // Si les salles sont les mêmes, trie par date
                            const dateA = new Date(a.date);
                            const dateB = new Date(b.date);
                            return dateA - dateB;
                        })
                        .map((seance, index, sortedSeances) => (
                          <>
                              <Seance
                                key={seance.idSeance}
                                {...seance}
                                films={films}
                                onUpdateClick={handleUpdateClick}
                                onDeleteClick={handleDeleteClick}
                              />
                                {index < sortedSeances.length - 1 &&
                                sortedSeances[index].idSalle !== sortedSeances[index + 1].idSalle ? (
                                  <tr style={{ height: "20px" }} /> // Ajoute un espace entre les groupes de séances d'une même salle
                                ) : null}
                          </>
                        ))}
                      </tbody>
                  </table>

                  <CreateSeanceModal
                    show={showCreateModal}
                    onHide={() => setShowCreateModal(false)}
                    currentCinemaId={currentCinemaId}
                    cinemas={cinemas}
                    films={films}
                    onSeanceCreated={refreshSeances}
                  />
                  <UpdateSeanceModal
                    show={showUpdateModal}
                    onHide={() => setShowUpdateModal(false)}
                    currentSeance={currentSeance}
                    cinemas={cinemas}
                    films={films}
                    onSeanceUpdated={refreshSeances}
                  />
              </div>
          </div>
      </div>

    );
};

export default GestionCinema;