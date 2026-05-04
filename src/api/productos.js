import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
})

export const getProductos = () => API.get('/productos')
export const createProducto = (data) => API.post('/productos', data)
export const updateProducto = (id, data) => API.put(`/productos/${id}`, data)
export const deleteProducto = (id) => API.delete(`/productos/${id}`)