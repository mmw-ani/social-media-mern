import axios from 'axios'

axios.defaults.withCredentials = true;

const axiosInstance =axios.create({
    baseURL : 'https://social-media-bkapi.herokuapp.com',
});

export default axiosInstance;