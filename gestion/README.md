# NIETFLIX3000 - Seance Maker
Cette application React permet de gérer les cinémas, les films et les séances. Elle interagit avec trois serveurs backend différents pour récupérer les informations sur les cinémas, les films et les séances.

## Prérequis
Assurez-vous d'avoir les serveurs backend suivants en cours d'exécution avant de démarrer cette application :

- Serveur de gestion des séances sur le port 8080
- Serveur de gestion des films (API GraphQL) sur le port 8081
- Serveur de gestion des réservations sur le port 5000

## Installation

Installez les dépendances du projet en exécutant la commande suivante :
```bash
npm install
```

Démarrez l'application React en exécutant la commande suivante :
```bash
npm start
```
L'application devrait maintenant être accessible à l'adresse http://localhost:3000 dans votre navigateur.

## Fonctionnalités
- Gérer les cinémas : afficher la liste des cinémas et sélectionner un cinéma pour afficher ses séances.
- Gérer les films : récupérer la liste des films depuis le serveur backend de gestion des films (API GraphQL) et afficher les noms de chaque film.
- Gérer les séances : ajouter, modifier et supprimer des séances pour un cinéma spécifique. Les informations sur les séances sont récupérées depuis le serveur de gestion des séances et le serveur de gestion des réservations.