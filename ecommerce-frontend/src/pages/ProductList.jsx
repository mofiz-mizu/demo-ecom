import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/productApi'
import ProductCard from '../components/ProductCard'

export default function ProductList(){
  const [search, setSearch] = useState('')
  const { data: products = [], isLoading } = useQuery(['products', search], () => fetchProducts({ search }).then(r=>r.data))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products" className="border rounded px-3 py-2 w-full max-w-md" />
      </div>

      {isLoading ? <div>Loading...</div> : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  )
}
