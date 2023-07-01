import axios from "../config/axios";

export class baaniaService {
    headers_JSON = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    getHome(params) {
        return axios.get(`/home${params}`);
    }

    createHome(body) {
        return axios.post(`/home`, body, this.headers_JSON);
    }

    updateHome(id, body) {
        return axios.patch(`/home/${id}`, body, this.headers_JSON);
    }

    deleteHome(id) {
        return axios.delete(`/home/${id}`);
    }

    getPostCode() {
        return axios.get(`/postCode`);
    }

    getPostCodeValue(id) {
        return axios.get(`/postCode/${id}`);
    }
}

export default new baaniaService()