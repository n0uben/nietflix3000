// import http from "axios";
import axios from "axios";

class UploadService {

    upload(formData) {
        return axios.post("http://localhost:8081/upload", formData)
    }
}

export default new UploadService();