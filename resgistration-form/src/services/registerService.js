import api from '../api/axiosInstance';

export const registerUser = (data) => api.post('/api/register', data); 