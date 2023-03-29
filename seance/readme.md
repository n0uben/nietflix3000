# POUR CONFIGURER LE PROJET :

## Prérequis :
- Creer un nouveau schéma de base de donnée sur votre serveur.
- Dans le dossier ./src/main/ressources créer un fichier nommé `application.properties`.
- Copier/coller le contenu du template `application.properties_template` du dossier templates.
- Remplacer l'url, l'username et le password par ceux votre base de donnée.
- ▶️ Run le fichier `SeanceApplication.kt`, le serveur REST se lance et créera/mettra à jour les tables de votre base de donnée.

# Chemins de l'API : 
##GET ALL
`/seance`

## GET ONE
`/seance/{id}` <br>
{id} correspond à l'id de la séance

## CREATE
`/seance/create`

**JSON Body :**
```json
{
  "date": "03/03/2023",
  "horraireDebut": "20:30",
  "horraireFin": "22:15",
  "idFilm":1,
  "idCinema":1,
  "idSalle":1,
  "placeDispo":250
}
  ```

## UPDATE
`/seance/update/{id}` <br>
{id} correspond à l'id de la séance

**JSON Body :**
```json
{
  "date": "03/03/2023",
  "horraireDebut": "20:30",
  "horraireFin": "22:15",
  "idFilm":2,
  "idCinema":2,
  "idSalle":2,
  "placeDispo":250
}
  ```

## UPDATE PLACE NUMBER
`/seance/updatePlace/{id}/{nbPlace}` <br>
{id} correspond à l'id de la séance <br>
{nbPlace} correspond aux nombre de places qui viennent d'être réservée et qu'il faut donc soustraire aux places disponibles

## DELETE
`/seance/delete/{id}` <br>
{id} correspond à l'id de la séance <br>


