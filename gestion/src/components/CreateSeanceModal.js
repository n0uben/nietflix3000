import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import SeanceService from '../services/SeanceService';

const CreateSeanceModal = ({ show, onHide, currentCinemaId, cinemas, films }) => {
  const [selectedSalle, setSelectedSalle] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const currentCinema = cinemas.find(cinema => cinema.id === currentCinemaId);

  const handleSubmit = async () => {
    const seance = {
      idCinema: currentCinemaId,
      idSalle: selectedSalle,
      idFilm: selectedFilm,
      date: selectedDate,
      horraireDebut: selectedStartTime,
      horraireFin: selectedEndTime,
      placeDispo: currentCinema.salles.find(salle => salle.id === selectedSalle).placeDispo
    };

    await SeanceService.createSeance(seance);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une séance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="salleSelect">Salle</label>
            <select
              className="form-control"
              id="salleSelect"
              value={selectedSalle}
              onChange={e => setSelectedSalle(Number(e.target.value))}
            >
              <option value="">Sélectionner une salle</option>
              {currentCinema?.salles.map(salle => (
                <option key={salle.id} value={salle.id}>
                  {salle.id}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="filmSelect">Film</label>
            <select
              className="form-control"
              id="filmSelect"
              value={selectedFilm}
              onChange={e => setSelectedFilm(Number(e.target.value))}
            >
              <option value="">Sélectionner un film</option>
              {films.map(film => (
                <option key={film.id} value={film.id}>
                  {film.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="datePicker">Date</label>
            <input
              type="date"
              className="form-control"
              id="datePicker"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTimePicker">Heure de début</label>
            <input
              type="time"
              className="form-control"
              id="startTimePicker"
              step="300"
              value={selectedStartTime}
              onChange={e => setSelectedStartTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTimePicker">Heure de fin</label>
            <input
              type="time"
              className="form-control"
              id="endTimePicker"
              step="300"
              value={selectedEndTime}
              onChange={e => setSelectedEndTime(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Annuler
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={
            !selectedSalle ||
            !selectedFilm ||
            !selectedDate ||
            !selectedStartTime ||
            !selectedEndTime
          }
        >
          Ajouter
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSeanceModal;