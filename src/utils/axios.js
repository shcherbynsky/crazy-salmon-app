import axios from "axios";

const baseUrl = 'http://localhost:5000/api'

const instance = axios.create({
    baseURL: baseUrl
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')

    return config
})

export default instance