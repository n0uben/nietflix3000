package fr.nietflix.banque.controller;

import fr.nietflix.banque.service.BanqueService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/banque")
public class BanqueController {

    private BanqueService banqueService;

    public BanqueController(BanqueService banqueService) {
        this.banqueService = banqueService;
    }

    @GetMapping
    public String test() {
        return this.banqueService.test();
    }
}
