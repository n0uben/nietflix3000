import React, { useState, useEffect } from 'react';
import SeanceService from '../services/SeanceService';
import Seance from '../components/Seance.js';
import allCinemas from "../data-test/cinemas.json"

const GestionCinema = () => {
    const[cinemas, setCinemas] = useState([])
    const [seances, setSeances] = useState([]);
    const [currentCinemaId, setCurrentCinemaId] = useState([]);
    const onCinemaTabClick = (cinemaId) => {
        setCurrentCinemaId(cinemaId);
    };

    useEffect(() => {
        // axios
        //   .get ("https://urlapi/cinema/all%22)
        //   .then ((res) => setCinemas (res.data));
        setCinemas(allCinemas.data);
        setCurrentCinemaId(allCinemas.data[0]?.id || null);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const seancesByCinema = await SeanceService.getSeancesByCinema(currentCinemaId);
            if (seancesByCinema) {
                setSeances(seancesByCinema);
            }
        };

        fetchData();
    }, [currentCinemaId]);

    return (
        <div>
            <h1>Gestion Cinéma</h1>

            <div>
                <ul className="nav nav-pills justify-content-center">
                    {cinemas.map((cinema) => (
                      <li key={cinema.id} className="nav-item cursor-pointer" onClick={() => onCinemaTabClick(cinema.id)}>
                          <h1 className={`nav-link ${currentCinemaId === cinema.id ? 'active' : ''}`}>
                              {cinema.nom}
                          </h1>
                      </li>
                    ))}
                </ul>
            </div>

            <table className="table table-dark table-striped">
                <thead>
                <tr>
                    <th>Salle</th>
                    <th>Film</th>
                    <th>Début</th>
                    <th>Fin</th>
                    <th>Date</th>
                    <th>Places disponibles</th>
                    <th>
                        <button className="btn btn-outline-info btn-sm">Add</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {seances.map((seance) => (
                    <Seance key={seance.idSeance} {...seance}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionCinema;