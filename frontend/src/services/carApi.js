import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/cars`;

export const getCars = () => axios.get(API_URL);
export const getCar = (id) => axios.get(`${API_URL}/${id}`);
export const createCar = (data) => axios.post(API_URL, data);
export const updateCar = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCar = (id) => axios.delete(`${API_URL}/${id}`);