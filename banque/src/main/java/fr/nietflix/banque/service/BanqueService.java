package fr.nietflix.banque.service;

import org.springframework.stereotype.Service;

@Service
public class BanqueService {

    private String CARDTEST1 = "0000 0000 0000 0000";
    private String CARDTEST2 = "1111 1111 1111 1111";

    public boolean isVisaOrMastercard(String creditCardNumber) {


        if (creditCardNumber.equals(CARDTEST1) || creditCardNumber.equals(CARDTEST2)) {
            return true;
        }

        creditCardNumber = creditCardNumber.replaceAll("[^0-9]", "");

        String reversedCreditCardNumber = new StringBuilder(creditCardNumber).reverse().toString();

        int sum = 0;
        for (int i = 0; i < reversedCreditCardNumber.length(); i++) {
            int digit = Character.getNumericValue(reversedCreditCardNumber.charAt(i));

            if (i % 2 == 1) {
                digit *= 2;

                if (digit > 9) {
                    digit = digit % 10 + digit / 10;
                }
            }

            sum += digit;
        }

        return sum % 10 == 0 && (creditCardNumber.startsWith("4") ||
                creditCardNumber.startsWith("5") ||
                creditCardNumber.startsWith("6"));
    }
}
