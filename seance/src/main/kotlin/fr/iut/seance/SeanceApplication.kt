package fr.iut.seance

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SeanceApplication

fun main(args: Array<String>) {
	runApplication<SeanceApplication>(*args)
}
