import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder } from '../api/orderApi'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const qc = useQueryClient()
  const navigate = useNavigate()
  const create = useMutation(() => createOrder().then(r=>r.data), { onSuccess: () => { qc.invalidateQueries(['cart']); navigate('/orders') } })

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div className="border p-4 rounded">
        <p>Simple checkout scaffold — integrate Stripe/Payment here.</p>
        <button onClick={() => create.mutate()} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Create Order</button>
      </div>
    </div>
  )
}
