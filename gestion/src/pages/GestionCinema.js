import React from 'react';
import {useParams} from "react-router-dom";

const GestionCinema = () => {
  let {cinemaId} = useParams()

  return (
    <div>
      Coucoucou : {cinemaId}
    </div>
  );
};

export default GestionCinema;

