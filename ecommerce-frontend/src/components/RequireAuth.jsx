import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function RequireAuth({ children, adminOnly=false }){
  const user = useAuthStore(state => state.user)
  const loc = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />
  return children
}
