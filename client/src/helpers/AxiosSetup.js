import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Ensure this is correct
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    withCredentials: true 
});

export default axiosInstance;