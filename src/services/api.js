import axios from 'axios'

// Cambia esta URL cuando tu compañero despliegue el backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_URL,
})

export const getProductos = () => api.get('/api/productos')
export const createProducto = (data) => api.post('/api/productos', data)
export const updateProducto = (id, data) => api.put(`/api/productos/${id}`, data)
export const deleteProducto = (id) => api.delete(`/api/productos/${id}`)