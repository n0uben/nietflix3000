import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import SeanceService from '../services/SeanceService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { components } from 'react-select';

const UpdateSeanceModal = ({ show, onHide, currentSeance, currentFilm, cinemas, films, onSeanceUpdated }) => {
  const [selectedSalle, setSelectedSalle] = useState('');
  const [selectedFilm, setSelectedFilm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [imageFilmURL, setImageFilmURL] = useState(null);

  // eslint-disable-next-line
  const currentCinema = currentSeance ? cinemas.find(cinema => cinema.id == currentSeance.idCinema) : null;

  const getSelectedFilmImage = (filmId) => {
    const selectedFilmOption = filmOptions.find(option => option.value == filmId);
    setImageFilmURL(selectedFilmOption.imageUrl);
  };

  const filmOptions = films.map(film => ({
    value: film.id,
    label: film.nom,
    imageUrl: film.imageUrl
  }));

  const Option = (props) => {
    const onMouseEnter = () => {
      setImageFilmURL(props.data.imageUrl);
    };

    const onMouseLeave = () => {
    };

    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <components.Option {...props} />
      </div>
    );
  };

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

  const resetForm = () => {
    setSelectedSalle('');
    setSelectedFilm('');
    setSelectedDate('');
    setSelectedStartTime('');
    setSelectedEndTime('');
  };

  const onSubmitClick = async () => {
    const updatedSeance = {
      idCinema: currentSeance.idCinema,
      idSalle: selectedSalle,
      idFilm: selectedFilm,
      date: selectedDate,
      horraireDebut: selectedStartTime,
      horraireFin: selectedEndTime,
      placeDispo: currentSeance.placeDispo
    };

    await SeanceService.updateSeance(currentSeance.idSeance, updatedSeance);
    onSeanceUpdated();
    resetForm();
    onHide();
  };

  useEffect(() => {
    if (currentSeance) {
      setSelectedSalle(currentSeance.idSalle);
      setSelectedFilm(currentSeance.idFilm);
      setSelectedDate(currentSeance.date);
      setSelectedStartTime(currentSeance.horraireDebut);
      setSelectedEndTime(currentSeance.horraireFin);
    }
  }, [currentSeance]);

  useEffect(() => {
    if (currentFilm) {
      setSelectedFilm(currentFilm.id);
    }
  }, [currentFilm]);

  useEffect(() => {
    if (selectedFilm) {
      getSelectedFilmImage(selectedFilm);
    }
  }, [selectedFilm]);

  return (
    <Modal show={show} onHide={onHide} onExit={resetForm}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier une séance</Modal.Title>
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
              {currentCinema && currentCinema.salles.map(salle => (
                <option key={salle.id} value={salle.id}>
                  {salle.id}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="filmSelect">Film</label>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ width: "50%" }}>
                { <Select
                    value={filmOptions.find(option => option.value == selectedFilm)}
                    options={filmOptions}
                    components={{ Option }}
                    onChange={option => {
                      setSelectedFilm(option.value);
                      updateEndTime(selectedStartTime, option.value);
                    }}
                  />
                }
              </div>
              <div style={{ width: "50%" }}>
                  <img
                    src={imageFilmURL}
                    alt="Affiche du film"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
              </div>

            </div>
          </div>
          <div className="form-group">
            <label htmlFor="datePicker">Date</label>
            <DatePicker
              className="form-control"
              id="datePicker"
              dateFormat="dd/MM/yyyy"
              selected={selectedDate ? new Date(selectedDate) : null}
              onChange={date => setSelectedDate(date.toISOString().slice(0, 10))}
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
          onClick={onSubmitClick}
          disabled={
            !selectedSalle ||
            !selectedFilm ||
            !selectedDate ||
            !selectedStartTime ||
            !selectedEndTime
          }
        >
          Modifier
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSeanceModal;