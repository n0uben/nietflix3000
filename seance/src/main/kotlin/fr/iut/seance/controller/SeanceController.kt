package fr.iut.seance.controller

import fr.iut.seance.model.Seance
import fr.iut.seance.service.SeanceService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/seance")
class SeanceController(val seanceService: SeanceService) {
    @GetMapping
    fun getAll() : MutableList<Seance> {
        return seanceService.getAll()
    }

    @GetMapping(value = ["{id}"])
    fun getById(@PathVariable id: Long?): ResponseEntity<Seance?>? {
        return id?.let { seanceService.getOne(it)
            .map { seance -> ResponseEntity.ok(seance) }
            .orElse(ResponseEntity.notFound().build())
        }
    }

    @PostMapping("/create")
    fun create(@RequestBody seance: Seance?): Seance? {
        return seance?.let { seanceService.create(it) }
    }

    @PutMapping("/update/{id}")
    fun update(@PathVariable id: Long?, @RequestBody seance: Seance): ResponseEntity<Seance?>? {
        return id?.let { seanceService.getOne(it)
            .map { s ->
                s.date = seance.date
                s.horraireDebut = seance.horraireDebut
                s.horraireFin = seance.horraireFin
                s.idFilm = seance.idFilm
                s.idCinema = seance.idCinema
                s.idSalle = seance.idSalle
                s.placeDispo = seance.placeDispo
                val seanceUpdated: Seance = seanceService.update(s)
                ResponseEntity.ok(seanceUpdated)
            }.orElse(ResponseEntity.notFound().build())
        }
    }

    @DeleteMapping("delete/{id}")
    fun delete(@PathVariable id: Long?): ResponseEntity<*>? {
        return id?.let { seanceService.getOne(it)
            .map { s ->
                val deletedResponse = seanceService.delete(s.idSeance)
                ResponseEntity.ok(deletedResponse)
            }.orElse(ResponseEntity.notFound().build())
        }
    }
}