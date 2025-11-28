import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchProduct } from '../api/productApi'
import { addToCart } from '../api/cartApi'

export default function ProductDetails(){
  const { id } = useParams()
  const qc = useQueryClient()
  const { data: product, isLoading } = useQuery(['product', id], () => fetchProduct(id).then(r=>r.data))

  const addMutation = useMutation((payload) => addToCart(payload).then(r=>r.data), { onSuccess: () => qc.invalidateQueries(['cart']) })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="h-96 bg-gray-100 flex items-center justify-center rounded">
          {product.images?.[0] ? <img src={product.images[0]} alt={product.name} className="max-h-80 object-contain" /> : <div>No Image</div>}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{product.description}</p>
        <div className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</div>
        <div className="mt-6">
          <button onClick={() => addMutation.mutate({ productId: product._id, quantity: 1 })} className="bg-indigo-600 text-white px-4 py-2 rounded">Add to cart</button>
        </div>
      </div>
    </div>
  )
}
