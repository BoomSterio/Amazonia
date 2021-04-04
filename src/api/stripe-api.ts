import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://us-central1-ia-291a4.cloudfunctions.net/api',
})
