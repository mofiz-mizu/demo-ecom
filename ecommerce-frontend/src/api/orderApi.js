import api from './api'

export const createOrder = () => api.post('/orders')
export const getOrders = () => api.get('/orders')
