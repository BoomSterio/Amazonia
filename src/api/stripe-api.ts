import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:5001/ia-291a4/us-central1/api'
})

