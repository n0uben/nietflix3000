package fr.iut.seance

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin
@SpringBootApplication
class SeanceApplication

fun main(args: Array<String>) {
	runApplication<SeanceApplication>(*args)
}
