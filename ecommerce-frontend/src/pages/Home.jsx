import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8">
        <div className="container grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome to the store</h1>
            <p className="mt-2">Shop the best products — responsive UI, fast API.</p>
            <Link to="/products" className="inline-block mt-4 bg-white text-indigo-600 px-4 py-2 rounded">Browse Products</Link>
          </div>
          <div className="hidden md:block">
            <img src="https://picsum.photos/600/400" alt="hero" className="rounded-lg shadow" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="border p-4 rounded">Sample Product</div>
          <div className="border p-4 rounded">Sample Product</div>
          <div className="border p-4 rounded">Sample Product</div>
        </div>
      </section>
    </div>
  )
}
