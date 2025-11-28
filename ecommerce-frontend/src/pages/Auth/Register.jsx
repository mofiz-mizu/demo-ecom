import React, { useState } from 'react'
import { register } from '../../api/authApi'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useAuthStore(state => state.setUser)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const res = await register({ name, email, password })
    setUser(res.data.user, res.data.token)
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border px-3 py-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
        <input className="w-full border px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full border px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  )
}
