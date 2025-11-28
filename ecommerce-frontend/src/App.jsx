import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Navbar from './components/Navbar'
import { RequireAuth } from './components/RequireAuth'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 container py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<ProductList/>} />
          <Route path="/products/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<RequireAuth><Checkout/></RequireAuth>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/admin" element={<RequireAuth adminOnly><AdminDashboard/></RequireAuth>} />
        </Routes>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center">© 2025 E‑commerce</footer>
    </div>
  )
}
