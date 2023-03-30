from flask import Flask
from flask_socketio import SocketIO, emit
import json
import os 
import requests

app = Flask(__name__)
socketio = SocketIO()
socketio.init_app(app, cors_allowed_origins="*")

# Charger les données à partir d'un fichier JSON
cinemas_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cinemas.json')

with open(cinemas_file_path, 'r') as f:
    raw_data = json.load(f)
    raw_cinemas = raw_data["cinemas"]
    cinemas = []
    for cinema in raw_cinemas:
        formatted_cinema = {
            'id': int(cinema['id']),
            'nom': cinema['nom'],
            'adresse': cinema['adresse'],
            'code_postal': cinema['code_postal'],
            'ville': cinema['ville'],
            'salles': [
                {
                    'id': int(salle['id']),
                    'nom': salle['nom'],
                    'capacite': salle['capacite']
                }
                for salle in cinema['salles']
            ]
        }
        cinemas.append(formatted_cinema)

# Récupérer la liste de tous les cinémas
@socketio.on('get_all_cinemas')
def get_all_cinemas():
    emit('cinema_list', {'cinemas': cinemas})

# Récupérer les informations d'un cinéma spécifique en fonction de son identifiant
@socketio.on('get_cinema_by_id')
def get_cinema_by_id(data):
    cinema_id = data['cinema_id']
    for cinema in cinemas:
        if cinema['id'] == cinema_id:
            emit('cinema_info', {'id': cinema['id'], 'nom': cinema['nom'], 'adresse': cinema['adresse'], 'code_postal': cinema['code_postal'], 'ville': cinema['ville']})
            return
    emit('error', {'message': 'Cinema introuvable'})

# Récupérer la liste des salles d'un cinéma spécifique en fonction de son identifiant
@socketio.on('get_salle_by_cinema_id')
def get_salle_by_cinema_id(data):
    cinema_id = data['cinema_id']
    for cinema in cinemas:
        if cinema['id'] == cinema_id:
            salles = [{'id': salle['id'], 'nom': salle['nom'], 'capacite': salle['capacite']} for salle in cinema['salles']]
            emit('salle_list', {'salles': salles})
            return
    emit('error', {'message': 'Cinema introuvable'})

# Récupérer les informations d'une salle spécifique en fonction de son identifiant et de l'identifiant du cinéma
@socketio.on('get_salle_by_id_and_cinema_id')
def get_salle_by_id_and_cinema_id(data):
    cinema_id = data['cinema_id']
    salle_id = data['salle_id']
    for cinema in cinemas:
        if cinema['id'] == cinema_id:
            for salle in cinema['salles']:
                if salle['id'] == salle_id:
                    emit('salle_info', {'id': salle['id'], 'nom': salle['nom'], 'capacite': salle['capacite'], 'cinema': {'id': cinema['id'], 'nom': cinema['nom']}})
                    return
            emit('error', {'message': 'Salle introuvable'})
            return
    emit('error', {'message': 'Cinema introuvable'})

# Mettre à jour une seance en appelant une API REST extern
@socketio.on('update_place_seance')
def update_seance(data):
    seance_id = data['id']
    places_a_enlever = data['places_a_enlever']
    api_url = f'https://localhost:8080/seance/updatePlace/{seance_id}/{places_a_enlever}'

    # Appeler l'API REST en utilisant la méthode PUT
    response = requests.put(api_url)

    # Vérifier si la requête a réussi
    if response.status_code == 200:
        emit('update_success', {'message': 'Mise à jour réussie'})
    else:
        emit('update_error', {'error': 'Une erreur s\'est produite lors de la mise à jour de l\'API REST.'})


# Vérifier la validité d'une carte bancaire en utilisant l'API bancaire
@socketio.on('check_bank_card')
def check_bank_card(data):
    card_number = data['number']
    api_url = 'http://localhost:8082/banque'

    # Préparer les données à envoyer à l'API bancaire
    payload = {'number': card_number}

    # Appeler l'API bancaire en utilisant la méthode POST
    response = requests.post(api_url, json=payload)

    # Vérifier si la requête a réussi
    if response.status_code == 200:
        result = response.json()
        emit('card_check_result', {'is_valid': result['valid']})
    else:
        emit('card_check_error', {'error': "Une erreur s'est produite lors de la vérification de la carte bancaire"})


if __name__ == '__main__':
    socketio.run(app)