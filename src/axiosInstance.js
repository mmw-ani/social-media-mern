import axios from 'axios'

axios.defaults.withCredentials = true;
const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"
const axiosInstance =axios.create({
    baseURL : URL,
});

export default axiosInstance