package fr.iut.seance.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.math.BigInteger
import java.util.Date

@Entity
class Seance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var idSeance: Long = 0

    @Column
    lateinit var date: String

    @Column
    lateinit var horraireDebut: String

    @Column
    lateinit var horraireFin: String

    @Column
    lateinit var idFilm: BigInteger

    @Column
    lateinit var idCinema: BigInteger

    @Column
    lateinit var idSalle: BigInteger

    @Column
    lateinit var placeDispo: Integer

    constructor()

    constructor(date: String, horraireDebut: String, horraireFin: String, idFilm: BigInteger, idCinema: BigInteger, idSalle: BigInteger, placeDispo: Integer) {
        this.date = date
        this.horraireDebut = horraireDebut
        this.horraireFin = horraireFin
        this.idFilm = idFilm
        this.idCinema = idCinema
        this.idSalle = idSalle
        this.placeDispo = placeDispo
    }

    constructor(idSeance: Long, date: String, horraireDebut: String, horraireFin: String, idFilm: BigInteger, idCinema: BigInteger, idSalle: BigInteger, placeDispo: Integer) {
        this.idSeance = idSeance
        this.date = date
        this.horraireDebut = horraireDebut
        this.horraireFin = horraireFin
        this.idFilm = idFilm
        this.idCinema = idCinema
        this.idSalle = idSalle
        this.placeDispo = placeDispo
    }
}