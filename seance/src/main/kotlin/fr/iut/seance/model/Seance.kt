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

    @Column(nullable = true)
    var date: String? = null

    @Column(nullable = true)
    var horraireDebut: String? = null

    @Column(nullable = true)
    var horraireFin: String? = null

    @Column(nullable = true)
    var idFilm: Int? = null

    @Column(nullable = true)
    var idCinema: Int? = null

    @Column(nullable = true)
    var idSalle: Int? = null

    @Column(nullable = true)
    var placeDispo: Int? = null

    constructor()

    constructor(date: String?, horraireDebut: String?, horraireFin: String?, idFilm: Int?, idCinema: Int?, idSalle: Int?, placeDispo: Int?) {
        this.date = date
        this.horraireDebut = horraireDebut
        this.horraireFin = horraireFin
        this.idFilm = idFilm
        this.idCinema = idCinema
        this.idSalle = idSalle
        this.placeDispo = placeDispo
    }

    constructor(idSeance: Long, date: String?, horraireDebut: String?, horraireFin: String?, idFilm: Int?, idCinema: Int?, idSalle: Int?, placeDispo: Int?) {
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