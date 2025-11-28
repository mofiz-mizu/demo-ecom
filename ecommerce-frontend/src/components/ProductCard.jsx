import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({product}){
  return (
    <div className="border rounded-lg p-4 flex flex-col bg-white dark:bg-gray-700">
      <div className="h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="max-h-44 object-contain" />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">{product.description?.slice(0, 80)}...</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
        <Link to={`/products/${product._id}`} className="text-sm text-blue-600">View</Link>
      </div>
    </div>
  )
}
