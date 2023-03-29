import React from 'react';

const Seance = ({
                      idSeance,
                      date,
                      horraireDebut,
                      horraireFin,
                      idFilm,
                      idCinema,
                      idSalle,
                      placeDispo,
                  }) => (
    <div className="seance">
        <p>ID Séance: {idSeance}</p>
        <p>Date: {date}</p>
        <p>Horraire Début: {horraireDebut}</p>
        <p>Horraire Fin: {horraireFin}</p>
        <p>ID Film: {idFilm}</p>
        <p>ID Cinéma: {idCinema}</p>
        <p>ID Salle: {idSalle}</p>
        <p>Places Disponibles: {placeDispo}</p>
    </div>
);

export default Seance;