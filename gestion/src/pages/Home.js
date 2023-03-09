import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import allCinemas from "../data-test/cinemas.json"
import {NavLink} from "react-router-dom";

const Home = () => {
  const[cinemas, setCinemas] = useState([])

  useEffect(() => {
    return () => {
      // axios
      //   .get ("https://urlAPI/cinema/all")
      //   .then ((res) => setCinemas (res.data));
      setCinemas(allCinemas.data)
    }
  })

  const listCinemas = cinemas.map((cinema) =>
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <NavLink to={"/gestionCinema/" + cinema.id}>
          <button className="btn btn-primary">
            {cinema.nom}
          </button>
        </NavLink>
    </div>
  )



  return (
    <div>
      <NavBar/>
        {listCinemas}

      <h1>HELLO le World tavu !</h1>
    </div>
  );
};

export default Home;
