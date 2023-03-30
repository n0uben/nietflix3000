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
                  }) => {

    return (
        <tr>
            <td>{idSalle}</td>
            <td>{idFilm}</td>
            <td>{horraireDebut}</td>
            <td>{horraireFin}</td>
            <td>{date}</td>
            <td>{placeDispo}</td>
            <td>
                <button className="btn btn-outline-warning btn-sm">Update</button>
                <button className="btn btn-outline-danger btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default Seance;