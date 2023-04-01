import React, { useState } from 'react';
import DateTools from "../tools/DateTools";

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
  const filmImageUrl = film ? film.imageUrl : '';
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);

  return (
    <tr>
      <td>{idSalle}</td>
      <td>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span>{filmName}</span>
          {filmImageUrl && (
            <div
              onMouseEnter={() => setShowEnlargedImage(true)}
              onMouseLeave={() => setShowEnlargedImage(false)}
              style={{ position: 'relative' }}
            >
              <img
                src={filmImageUrl}
                alt={`Affiche de ${filmName}`}
                style={{ width: '30px', height: '40px', objectFit: 'cover' }}
              />
              {showEnlargedImage && (
                <img
                  src={filmImageUrl}
                  alt={`Affiche de ${filmName}`}
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    width: '150px',
                    height: '200px',
                    objectFit: 'cover',
                    top: '-160px',
                    left: '-60px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    borderRadius: '5px'
                  }}
                />
              )}
            </div>
          )}
        </div>
      </td>
      <td>{DateTools.formatDate(date)}</td>
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
