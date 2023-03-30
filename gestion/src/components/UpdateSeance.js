import React, {useState} from 'react';
import axios from "axios";

const UpdateSeance = ({ seance, onClose }) => {
    const [date, setDate] = useState(seance.date);
    const [horraireDebut, setHorraireDebut] = useState(seance.horraireDebut);
    const [horraireFin, setHorraireFin] = useState(seance.horraireFin);
    const [idFilm, setIdFilm] = useState(seance.idFilm);
    const [idCinema, setIdCinema] = useState(seance.idCinema);
    const [idSalle, setIdSalle] = useState(seance.idSalle);
    const [placeDispo, setPlaceDispo] = useState(seance.placeDispo);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/seance/update/${seance.idSeance}`, {
                date: date,
                horraireDebut: horraireDebut,
                horraireFin: horraireFin,
                idFilm: idFilm,
                idCinema: idCinema,
                idSalle: idSalle,
                placeDispo: placeDispo
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Mettez à jour la séance dans le composant parent (GestionCinema) avec la séance mise à jour
            onUpdate(response.data);

            // Fermez le modal
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la séance:", error);
        }
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Mise à jour de la séance</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} >
                            <div className="mb-3">
                                <label htmlFor="salle" className="form-label">Salle</label>
                                <input type="text" className="form-control" id="salle" defaultValue={seance.idSalle}   onChange={(e) => setIdSalle(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="film" className="form-label">Film</label>
                                <input type="text" className="form-control" id="film" defaultValue={seance.idFilm} onChange={(e) => setIdFilm(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="debut" className="form-label">Début</label>
                                <input type="text" className="form-control" id="debut" defaultValue={seance.heureDebut} onChange={(e) => setHorraireDebut(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fin" className="form-label">Fin</label>
                                <input type="text" className="form-control" id="fin" defaultValue={seance.heureFin} onChange={(e) => setHorraireFin(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input type="text" className="form-control" id="date" defaultValue={seance.dateSeance} onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="places" className="form-label">Places disponibles</label>
                            <input type="text" className="form-control" id="places" defaultValue={seance.placesDisponibles} onChange={(e) => setPlaceDispo(e.target.value)}/>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Fermer</button>
                <button type="button" className="btn btn-primary" type="submit" >Mettre à jour</button>
            </div>
        </div>
</div>
</div>
);
};

export default UpdateSeance;