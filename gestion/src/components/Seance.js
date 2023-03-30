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
                      onUpdate,
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
                <button className="btn btn-outline-warning btn-sm" onClick={() => setShowUpdateModal(true)}>
                    Update
                </button>
                <button className="btn btn-outline-danger btn-sm">Delete</button>
                {showUpdateModal && (
                    <UpdateSeance seance={{ idSeance, idFilm, idCinema, idSalle, date, horraireDebut, horraireFin, placeDispo }} onUpdate={onUpdate} onClose={() => setShowUpdateModal(false)} />
                )}
            </td>
        </tr>
    );
};

  
export default Seance;