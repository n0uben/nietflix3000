# Cinema API

Ce projet est une API simple pour récupérer des informations sur des cinémas et leurs salles. L'API utilise Flask et les websockets pour répondre aux requêtes des clients.


## Installation

1. Assurez-vous que Python 3 est installé sur votre système.
2. Clonez le dépôt ou téléchargez le code source et décompressez-le dans un dossier.
2. Assurez-vous d'avoir un fichier `cinemas.json` avec des données sur les cinémas et leurs salles dans le même répertoire que votre fichier Python.
4. Installez les dépendances nécessaires en exécutant la commande suivante dans votre terminal ou invite de commandes :

pip install -r requirements.txt


## Structure du fichier JSON

Le fichier `cinemas.json` contient une liste de cinémas, chacun ayant des attributs tels que l'ID, le nom, l'adresse, le code postal, la ville et une liste de salles. Voici un exemple de structure pour un cinéma :

```json
{
"id": 1,
"nom": "Kinepolis Thionville",
"adresse": "50 Route de Arlon",
"code_postal": "57100",
"ville": "Thionville",
"salles": [
 {
   "id": 1,
   "nom": "Salle 1",
   "capacite": 200
 },
 {
   "id": 2,
   "nom": "Salle 2",
   "capacite": 150
 },
 {
   "id": 3,
   "nom": "Salle 3",
   "capacite": 180
 },
 {
   "id": 4,
   "nom": "Salle 4",
   "capacite": 120
 }
]
}
```


## Utilisation

Exécutez le fichier Python pour démarrer le serveur :

python app.py

Le serveur accepte les requêtes websocket pour les méthodes suivantes :


### get_all_cinemas

Récupère la liste de tous les cinémas.

```javascript
socket.emit('get_all_cinemas');
socket.on('cinema_list', function(data) {
    console.log('Cinemas:', data.cinemas);
});
```

### get_cinema_by_id

Récupère les informations d'un cinéma spécifique en fonction de son ID.

```javascript
const cinemaId = 1; // Remplacer par l'ID du cinéma souhaité
socket.emit('get_cinema_by_id', { cinema_id: cinemaId });
socket.on('cinema_info', function(data) {
    console.log('Cinema:', data);
});
```

### get_salle_by_cinema_id

Récupère la liste des salles d'un cinéma spécifique en fonction de son ID.

```javascript
const cinemaId = 1; // Remplacer par l'ID du cinéma souhaité
socket.emit('get_salle_by_cinema_id', { cinema_id: cinemaId });
socket.on('salle_list', function(data) {
    console.log('Salles:', data.salles);
});
```

### get_salle_by_id_and_cinema_id

Récupère les informations d'une salle spécifique en fonction de son ID et de l'ID du cinéma.

```javascript
const cinemaId = 1; // Remplacer par l'ID du cinéma souhaité
const salleId = 1; // Remplacer par l'ID de la salle souhaitée
socket.emit('get_salle_by_id_and_cinema_id', { cinema_id: cinemaId, salle_id: salleId });
socket.on('salle_info', function(data) {
    console.log('Salle:', data);
});
```

### Gestions des erreurs

Si l'ID du cinéma ou de la salle n'est pas trouvé, l'API renverra un message d'erreur :

```javascript
socket.on('error', function(data) {
    console.log('Error:', data.message);
});
```

### update_place_seance

/!\ ATTENTION /!\ : Le pare-feu de votre ordinateur peut bloquer la communication locale entre cette API et l'API Séance . Si vous rencontrez des problèmes, désactivez le pare-feu temporairement.

Cette fonction permet de mettre à jour le nombre de places disponibles dans une séance en envoyant un événement WebSocket à l'API. L'API appellera ensuite une API REST externe pour effectuer la mise à jour.

```javascript
const seanceId = 1; // Remplacer par l'ID de la séance souhaitée
const placesAEnlever = 5; // Remplacer par le nombre de places à enlever
socket.emit('update_place_seance', { id: seanceId, places_a_enlever: placesAEnlever });
socket.on('update_success', function(data) {
    console.log('Mise à jour réussie:', data);
});
socket.on('update_error', function(data) {
    console.log('Erreur lors de la mise à jour:', data);
});
```

Utilisez ce code pour mettre à jour une séance en appelant l'API REST externe en spécifiant l'ID de la séance et le nombre de places à enlever. La fonction écoutera les événements 'update_success' et 'update_error' pour gérer les résultats de la mise à jour.

### check_bank_card

Vérifie la validité d'une carte bancaire en utilisant l'API bancaire.

```javascript
const cardNumber = "5555555555554444"; // Remplacer par le numéro de carte bancaire souhaité
socket.emit('check_bank_card', { number: cardNumber });
socket.on('card_check_result', function(data) {
    console.log('Résultat de la vérification de la carte bancaire:', data.is_valid);
});
socket.on('card_check_error', function(data) {
    console.log('Erreur lors de la vérification de la carte bancaire:', data);
});
```
