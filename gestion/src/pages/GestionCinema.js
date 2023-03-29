import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Seance from '../components/Seance.js';

const GestionCinema = () => {
    let { cinemaId } = useParams();
    const [seances, setSeances] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/seance`);
                setSeances(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des séances:', error);
            }
        };

        fetchData();
    }, [cinemaId]);

    return (
        <div>
            <h1>Cinéma : {cinemaId}</h1>
            <div className="seance-list">
                {seances.map((seance) => (
                    <Seance key={seance.idSeance} {...seance} />
                ))}
            </div>
        </div>
    );
};

export default GestionCinema;