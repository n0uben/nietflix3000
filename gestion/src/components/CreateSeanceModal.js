import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import SeanceService from '../services/SeanceService';

const CreateSeanceModal = ({ show, onHide, currentCinemaId, cinemas, films, onSeanceCreated }) => {
  const [selectedSalle, setSelectedSalle] = useState('');
  const [selectedFilm, setSelectedFilm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const currentCinema = cinemas.find(cinema => cinema.id === currentCinemaId);

  const calculateEndTime = (startTime, duration) => {
    // Convertir la chaîne de caractères startTime en minutes
    const [hours, minutes] = startTime.split(':');
    const startTimeInMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

    // Ajouter la durée du film
    const endTimeInMinutes = startTimeInMinutes + duration;

    // Arrondir à un multiple de 5 supérieur
    const roundedEndTimeInMinutes = Math.ceil(endTimeInMinutes / 5) * 5;

    // Convertir les minutes en chaîne de caractères au format HH:mm
    const roundedEndHours = Math.floor(roundedEndTimeInMinutes / 60);
    const roundedEndMinutes = roundedEndTimeInMinutes % 60;
    const endTimeString = `${roundedEndHours.toString().padStart(2, '0')}:${roundedEndMinutes.toString().padStart(2, '0')}`;

    return endTimeString;
  };

  const updateEndTime = (startTime, filmId) => {
    // eslint-disable-next-line
    const selectedFilmObject = films.find(film => film.id == filmId);
    if (selectedFilmObject && startTime) {
      const filmDuration = selectedFilmObject.duree;
      setSelectedEndTime(calculateEndTime(startTime, filmDuration));
    } else {
      setSelectedEndTime('');
    }
  };

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
    onSeanceCreated();
    resetForm();
    onHide();
  };

  const resetForm = () => {
    setSelectedSalle('');
    setSelectedFilm('');
    setSelectedDate('');
    setSelectedStartTime('');
    setSelectedEndTime('');
  };

  return (
    <Modal show={show} onHide={onHide} onExit={resetForm}>
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
              onChange={e => {
                setSelectedFilm(Number(e.target.value));
                updateEndTime(selectedStartTime, Number(e.target.value));
              }}
            >
              <option value="">Sélectionner un film</option>
              {films.map(film => (
                <option key={film.id} value={film.id}>
                  {film.nom}
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
              onChange={e => {
                setSelectedStartTime(e.target.value);
                updateEndTime(e.target.value, selectedFilm);
              }}
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
              readOnly
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={() => { resetForm(); onHide(); }}>
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