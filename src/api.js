import axios from 'axios';

const API_URL = 'https://localhost:7150/api';

export const api = axios.create({
    baseURL: API_URL,
});
