import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useUIStore } from '../store/uiStore'

export default function Navbar(){
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const toggleDark = useUIStore(state => state.toggleDark)
  const navigate = useNavigate()

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold">Shop</Link>

        <nav className="space-x-4 flex items-center">
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
          <button onClick={toggleDark} className="ml-2 px-2 py-1 border rounded text-sm">Toggle</button>
          {user ? (
            <>
              <span className="ml-2">Hello, {user.name}</span>
              {user.role === 'admin' && <Link to="/admin" className="ml-3">Admin</Link>}
              <button onClick={()=>{ logout(); navigate('/') }} className="ml-3 text-sm text-red-600">Logout</button>
            </>
          ) : (
            <Link to="/login" className="ml-3">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
