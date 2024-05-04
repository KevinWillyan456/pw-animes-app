import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        api_key: import.meta.env.VITE_API_KEY,
    },
})

export default api
