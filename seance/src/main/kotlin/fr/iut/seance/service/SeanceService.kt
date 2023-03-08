package fr.iut.seance.service

import fr.iut.seance.model.Seance
import fr.iut.seance.repository.SeanceRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class SeanceService(val seanceRepository: SeanceRepository) {
    fun getOne(id: Long): Optional<Seance> {
        return seanceRepository.findById(id)
    }

    fun getAll(): MutableList<Seance> {
        return seanceRepository.findAll()
    }

    fun create(seance: Seance): Seance {
        val seanceToCreate = Seance(seance.date,
                                    seance.horraireDebut,
                                    seance.horraireFin,
                                    seance.idFilm,
                                    seance.idCinema,
                                    seance.idSalle,
                                    seance.placeDispo)

        return seanceRepository.save(seanceToCreate)
    }

    fun update(seance: Seance): Seance {
        val seanceToUpdate = Seance(seance.idSeance,
                                    seance.date,
                                    seance.horraireDebut,
                                    seance.horraireFin,
                                    seance.idFilm,
                                    seance.idCinema,
                                    seance.idSalle,
                                    seance.placeDispo)
        return seanceRepository.saveAndFlush(seanceToUpdate)
    }

    fun delete(idSeance: Long): Boolean {
        seanceRepository.deleteById(idSeance)
        return seanceRepository.existsById(idSeance)
    }
}