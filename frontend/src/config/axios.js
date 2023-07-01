import axios from "axios";

axios.defaults.baseURL = process.env.baseURL || "https://test-backend.baania.dev";

export default axios;