from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
socketio = SocketIO()
socketio.init_app(app, cors_allowed_origins="*")

# Charger les données à partir d'un fichier JSON
with open('cinemas.json', 'r') as f:
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

@socketio.on('get_all_cinemas')
def get_all_cinemas():
    emit('cinema_list', {'cinemas': cinemas})

@socketio.on('get_salle_by_cinema_id')
def get_salle_by_cinema_id(data):
    cinema_id = data['cinema_id']
    for cinema in cinemas:
        if cinema['id'] == cinema_id:
            salles = [{'id': salle['id'], 'nom': salle['nom'], 'capacite': salle['capacite']} for salle in cinema['salles']]
            emit('salle_list', {'salles': salles})
            return
    emit('error', {'message': 'Cinema not found'})

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
            emit('error', {'message': 'Salle not found'})
            return
    emit('error', {'message': 'Cinema not found'})

if __name__ == '__main__':
    socketio.run(app)