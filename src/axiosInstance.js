import axios from 'axios'


const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"
const axiosInstance =axios.create({
    baseURL : URL,
    withCredentials:true
});

axiosInstance.interceptors.response.use(
    response => (response), 
    error => (Promise.reject(error.response.data.err))
)
export default axiosInstance