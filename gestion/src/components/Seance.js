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
                      films,
                      onUpdateClick,
                      onDeleteClick
                  }) => {
  // eslint-disable-next-line
  const film = films.find((film) => film.id == idFilm);
  const filmName = film ? film.nom : '';

    return (
        <tr>
            <td>{idSalle}</td>
            <td>{filmName}</td>
            <td>{date}</td>
            <td>{horraireDebut}</td>
            <td>{horraireFin}</td>
            <td>{placeDispo}</td>
            <td>
                <button className="btn btn-outline-warning btn-sm" onClick={() => onUpdateClick(idSeance)}>Update</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDeleteClick(idSeance)}>Delete</button>
            </td>
        </tr>
    );
};

export default Seance;