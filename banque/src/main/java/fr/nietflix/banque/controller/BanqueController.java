package fr.nietflix.banque.controller;

import fr.nietflix.banque.CreditCard;
import fr.nietflix.banque.service.BanqueService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/banque")
public class BanqueController {

    private BanqueService banqueService;

    public BanqueController(BanqueService banqueService) {
        this.banqueService = banqueService;
    }

    @PostMapping
    public boolean test(@RequestBody CreditCard creditCard) {
        return this.banqueService.isVisaOrMastercard(creditCard.getNumber());
    }
}
