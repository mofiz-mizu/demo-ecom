import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCart } from '../api/cartApi'
import { Link } from 'react-router-dom'

export default function CartPage(){
  const { data: cart = { items: [] }, isLoading } = useQuery(['cart'], () => getCart().then(r=>r.data))

  if (isLoading) return <div>Loading...</div>

  const total = cart.items.reduce((sum, it) => sum + (it.productId.price * it.quantity), 0)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart.items.length === 0 ? (
        <div>Your cart is empty. <Link to="/products" className="text-indigo-600">Shop now</Link></div>
      ) : (
        <div className="space-y-4">
          {cart.items.map(i => (
            <div key={i._id} className="flex items-center gap-4 border p-4 rounded">
              <img src={i.productId.images?.[0] || 'https://picsum.photos/80'} alt="" className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{i.productId.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">${i.productId.price.toFixed(2)} x {i.quantity}</div>
              </div>
              <div className="font-bold">${(i.productId.price * i.quantity).toFixed(2)}</div>
            </div>
          ))}

          <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
          <div className="text-right">
            <Link to="/checkout" className="bg-indigo-600 text-white px-4 py-2 rounded">Proceed to checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
