package fr.nietflix.banque.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BanqueServiceTest {

    private BanqueService banqueService;

    @BeforeEach
    void setUp() {
        this.banqueService = new BanqueService();
    }

    @Test
    void isVisaOrMastercardTestCARDTEST1() {
        Assertions.assertEquals(true, this.banqueService.isVisaOrMastercard("0000 0000 0000 0000"));
    }
    @Test
    void isVisaOrMastercardTestCARDTEST2() {
        Assertions.assertEquals(true, this.banqueService.isVisaOrMastercard("1111 1111 1111 1111"));
    }

    @Test
    void isVisaOrMastercardTestVALIDCARD() {
        Assertions.assertEquals(true, this.banqueService.isVisaOrMastercard("5555 5555 5555 4444"));
    }

    @Test
    void isVisaOrMastercardTestINVALIDCARD() {
        Assertions.assertEquals(false, this.banqueService.isVisaOrMastercard("5424 1802 7979 1764"));
    }

}
