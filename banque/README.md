# BANQUE API

Cette documentation explique le fonctionnement de l'API bancaire de Nietflix3000.

## Endpoint
- endpoint : http://localhost:8082/banque
- method : POST
- request body attendu :

```
{
"number": "5555555555554444"
}
```

## Exemples de cartes bancaires

Exemples de numéro de carte bancaires :
- "5555555555554444" : valide
- "5424180279791764" : invalide

Deux numéros de carte de test ont été rajoutés comme exceptions :
- "0000 0000 0000 0000" 
- "1111 1111 1111 1111"

