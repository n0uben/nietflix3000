import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Seance from '../components/Seance.js';
import allCinemas from "../data-test/cinemas.json"
import UpdateSeance from '../components/UpdateSeance.js';

const GestionCinema = () => {
    const [showUpdateSeanceModal, setShowUpdateSeanceModal] = useState(false);
    const [selectedSeance, setSelectedSeance] = useState(null);
    const handleUpdateSeance = (seance) => {
        setSelectedSeance(seance);
        setShowUpdateSeanceModal(true);
    };
    const[cinemas, setCinemas] = useState([])
    let { cinemaId } = useParams();
    const [seances, setSeances] = useState([]);

    useEffect(() => {
        // axios
        //   .get ("https://urlapi/cinema/all%22)
        //   .then ((res) => setCinemas (res.data));
        setCinemas(allCinemas.data);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/seance/byCinema/${parseInt(cinemaId)}`);
                setSeances(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des séances:', error);
            }
        };

        fetchData();
    }, [cinemaId]);


    const currentCinema = cinemas.find((cinema) => cinema.id === parseInt(cinemaId));
    return (
        <div>
            <h1>Gestion Cinéma</h1>
            {currentCinema && <h2>{currentCinema.nom}</h2>}
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
                    <Seance key={seance.idSeance} {...seance} onUpdate={() => handleUpdateSeance(seance)} />
                ))}
                </tbody>
            </table>
            {showUpdateSeanceModal && (
                    <UpdateSeance
                        seance={selectedSeance}
                        onClose={() => setShowUpdateSeanceModal(false)}
                    />
                )
            }
        </div>
    );
};

export default GestionCinema;