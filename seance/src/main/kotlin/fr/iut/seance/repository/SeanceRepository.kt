package fr.iut.seance.repository

import fr.iut.seance.model.Seance
import org.springframework.data.jpa.repository.JpaRepository

interface SeanceRepository : JpaRepository<Seance, Long> {
}