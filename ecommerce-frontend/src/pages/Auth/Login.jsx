import React, { useState } from 'react'
import { login } from '../../api/authApi'
import { useAuthStore } from '../../store/authStore'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useAuthStore(state => state.setUser)
  const navigate = useNavigate()
  const loc = useLocation()

  const submit = async (e) => {
    e.preventDefault()
    const res = await login({ email, password })
    setUser(res.data.user, res.data.token)
    navigate(loc.state?.from?.pathname || '/')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full border px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      <div className="mt-3 text-sm">No account? <Link to="/register" className="text-indigo-600">Register</Link></div>
    </div>
  )
}
