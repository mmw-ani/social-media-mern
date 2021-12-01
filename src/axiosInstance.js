import axios from 'axios'
const token = localStorage.getItem('jwt')
const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"

    
const axiosInstance =axios.create({
    baseURL : URL,
    withCredentials:true
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axiosInstance.interceptors.response.use(
    response => (response), 
    error => (Promise.reject(error))
)
export default axiosInstance