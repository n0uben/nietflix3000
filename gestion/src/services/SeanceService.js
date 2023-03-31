import axios from 'axios';

const localhost = `http://localhost:8080/`;

class SeanceService {

  async getSeancesByCinema(cinemaId) {
    if (!cinemaId) {
      console.error("getSeancesByCinema appelée sans idCinema", new Error().stack);
      return null;
    } else {
      try {
        const response = await axios.get(`${localhost}seance/byCinema/${cinemaId}`);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des séances:', error);
        return null;
      }
    }
  }

  async getAllSeances() {
    try {
      const response = await axios.get(`${localhost}seance`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les séances:', error);
      return [];
    }
  }

  async getSeanceById(id) {
    try {
      const response = await axios.get(`${localhost}seance/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la séance ${id}:`, error);
      return null;
    }
  }

  async createSeance(seance) {
    try {
      const response = await axios.post(`${localhost}seance/create`, seance);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création d\'une séance:', error);
      return null;
    }
  }

  async updateSeance(id, seance) {
    try {
      const response = await axios.put(`${localhost}seance/update/${id}`, seance);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la séance ${id}:`, error);
      return null;
    }
  }

  async updatePlaceNumber(id, nbPlace) {
    try {
      const response = await axios.put(`${localhost}seance/updatePlace/${id}/${nbPlace}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du nombre de places pour la séance ${id}:`, error);
      return null;
    }
  }

  async deleteSeance(id) {
    try {
      const response = await axios.delete(`${localhost}seance/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la séance ${id}:`, error);
      return null;
    }
  }
}

const seanceServiceInstance = new SeanceService();
export default seanceServiceInstance;