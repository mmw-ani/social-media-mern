import axios from 'axios'
import Cookies from 'universal-cookie'

const cookie = new Cookies()
const token = cookie.get('jwt')
const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"

    
const axiosInstance =axios.create({
    baseURL : URL,
    withCredentials:true
});

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axiosInstance.interceptors.response.use(
    response => (response), 
    error => (Promise.reject(error))
)
export default axiosInstance