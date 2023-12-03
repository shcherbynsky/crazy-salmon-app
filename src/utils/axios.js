import axios from "axios";

// const baseUrl = 'http://localhost:5000/api'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')

    return config
})

export default instance