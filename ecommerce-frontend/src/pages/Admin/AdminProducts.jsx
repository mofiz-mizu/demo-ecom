import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../api/productApi'

export default function AdminProducts(){
  const { data: products = [], refetch } = useQuery(['admin-products'], () => fetchProducts().then(r=>r.data))
  const [editing, setEditing] = useState(null)

  const del = useMutation((id) => deleteProduct(id).then(r=>r.data), { onSuccess: () => refetch() })
  const up = useMutation(({id, payload}) => updateProduct(id, payload).then(r=>r.data), { onSuccess: () => refetch() })
  const create = useMutation((payload) => createProduct(payload).then(r=>r.data), { onSuccess: () => refetch() })

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <AdminForm onCreate={(payload)=>create.mutate(payload)} />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded bg-white dark:bg-gray-700">
            <div className="flex items-start gap-4">
              <img src={p.images?.[0] || 'https://picsum.photos/80'} alt="" className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">${p.price.toFixed(2)}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={()=>setEditing(p)} className="text-sm bg-yellow-400 px-2 py-1 rounded">Edit</button>
                <button onClick={()=>del.mutate(p._id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && <EditModal product={editing} onClose={()=>{ setEditing(null); }} onSave={(payload)=>up.mutate({id: editing._id, payload})} />}
    </div>
  )
}

function AdminForm({ onCreate }){
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(1)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imageData, setImageData] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const payload = { name, price: Number(price), stock: Number(stock), category, description, images: imageData ? [imageData] : [] }
    onCreate(payload)
    setName(''); setPrice(0); setStock(1); setCategory(''); setDescription(''); setImageData('')
  }

  const onFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageData(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <form onSubmit={submit} className="border p-4 rounded mb-4 bg-white dark:bg-gray-700">
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <input className="border px-2 py-1" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="border px-2 py-1" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} type="number" />
        <input className="border px-2 py-1" placeholder="Stock" value={stock} onChange={e=>setStock(e.target.value)} type="number" />
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mt-2">
        <input className="border px-2 py-1" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <input type="file" onChange={onFile} />
      </div>
      <textarea className="border w-full mt-2 p-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <div className="mt-2">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create Product</button>
      </div>
    </form>
  )
}

function EditModal({ product, onClose, onSave }){
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [stock, setStock] = useState(product.stock)
  const [category, setCategory] = useState(product.category)
  const [description, setDescription] = useState(product.description || '')
  const [imageData, setImageData] = useState(product.images?.[0] || '')

  const submit = (e) => {
    e.preventDefault()
    onSave({ name, price: Number(price), stock: Number(stock), category, description, images: imageData ? [imageData] : [] })
    onClose()
  }

  const onFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageData(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-4 rounded w-full max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Edit Product</h3>
          <button type="button" onClick={onClose} className="text-sm">Close</button>
        </div>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
          <input className="border px-2 py-1" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="border px-2 py-1" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} type="number" />
          <input className="border px-2 py-1" placeholder="Stock" value={stock} onChange={e=>setStock(e.target.value)} type="number" />
        </div>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mt-2">
          <input className="border px-2 py-1" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
          <input type="file" onChange={onFile} />
        </div>
        <textarea className="border w-full mt-2 p-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <div className="mt-2 flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button className="bg-indigo-600 text-white px-3 py-1 rounded">Save</button>
        </div>
      </form>
    </div>
  )
}
