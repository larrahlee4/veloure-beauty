import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import MotionButton from '../components/MotionButton.jsx'

const emptyForm = {
  name: '',
  slug: '',
  category: '',
  description: '',
  price: '',
  image_url: '',
  stock: '',
  is_featured: false,
}

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function AdminDashboard() {
  const [userRole, setUserRole] = useState(null)
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const isAdmin = userRole === 'admin'

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id,name,slug,category,price,stock,image_url,is_featured')
      .order('created_at', { ascending: false })
    if (error) {
      setStatus(error.message)
      return
    }
    setProducts(data ?? [])
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      const role = data?.user?.user_metadata?.role ?? null
      setUserRole(role)
      if (role === 'admin') {
        await loadProducts()
      }
    }
    init()
  }, [])

  const safeProducts = useMemo(() => products ?? [], [products])

  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const onNameBlur = () => {
    if (!form.slug && form.name) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.name) }))
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    setStatus('')
    setLoading(true)
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: Number(form.price || 0),
      image_url: form.image_url.trim(),
      stock: Number(form.stock || 0),
      is_featured: form.is_featured,
    }

    const { error } = await supabase.from('products').insert(payload)
    setLoading(false)
    if (error) {
      setStatus(error.message)
      return
    }
    setForm(emptyForm)
    await loadProducts()
  }

  const handleUpdate = async (id, field, value) => {
    setStatus('')
    const updates = { [field]: field === 'price' || field === 'stock' ? Number(value) : value }
    const { error } = await supabase.from('products').update(updates).eq('id', id)
    if (error) {
      setStatus(error.message)
      return
    }
    await loadProducts()
  }

  if (!isAdmin) {
    return (
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Admin</p>
        <h1 className="font-display text-4xl">Admin access required</h1>
        <p className="text-sm text-[var(--ink)]/70">
          Sign in with an admin account to manage products and inventory.
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-10">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Admin</p>
            <h1 className="font-display text-4xl">Product control</h1>
          </div>
          <Link
            to="/"
            className="rounded-full border border-[var(--brown)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--brown)] transition hover:bg-[var(--brown)] hover:text-white"
          >
            Back to Home
          </Link>
        </div>
        <p className="mt-2 text-sm text-[var(--ink)]/70">
          Add products, manage pricing, and review inventory levels.
        </p>
      </div>

      <form onSubmit={handleCreate} className="grid gap-4 rounded-3xl border border-[var(--ink)]/10 bg-white/80 p-6 md:grid-cols-2">
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
          Name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            onBlur={onNameBlur}
            className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
            required
          />
        </label>
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
          Slug
          <input
            name="slug"
            value={form.slug}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
            required
          />
        </label>
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
          Category
          <input
            name="category"
            value={form.category}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
            required
          />
        </label>
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
          Image URL
          <input
            name="image_url"
            value={form.image_url}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] md:col-span-2">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="mt-2 min-h-[120px] w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
          Price
          <input
            name="price"
            value={form.price}
            onChange={onChange}
            type="number"
            step="0.01"
            className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
            required
          />
        </label>
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
          Stock
          <input
            name="stock"
            value={form.stock}
            onChange={onChange}
            type="number"
            className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
            required
          />
        </label>
        <label className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
          <input
            name="is_featured"
            type="checkbox"
            checked={form.is_featured}
            onChange={onChange}
          />
          Featured
        </label>
        <div className="flex items-center gap-4 md:col-span-2">
          <MotionButton
            disabled={loading}
            className="rounded-full bg-[var(--brown)] px-6 py-3 text-xs font-semibold text-white"
          >
            {loading ? 'Saving...' : 'Add product'}
          </MotionButton>
          {status && <span className="text-xs text-red-600">{status}</span>}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="font-display text-2xl">Inventory</h2>
        <div className="grid gap-4">
          {safeProducts.map((product) => (
            <div
              key={product.id}
              className="grid gap-4 rounded-3xl border border-[var(--ink)]/10 bg-white/80 p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-40px_rgba(59,51,40,0.6)] md:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]"
            >
              <div>
                <p className="font-display text-xl">{product.name}</p>
                <p className="text-xs text-[var(--ink)]/60">{product.category}</p>
              </div>
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                Price
                <input
                  defaultValue={product.price}
                  type="number"
                  step="0.01"
                  onBlur={(event) => handleUpdate(product.id, 'price', event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-3 py-2 text-sm outline-none"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                Stock
                <input
                  defaultValue={product.stock}
                  type="number"
                  onBlur={(event) => handleUpdate(product.id, 'stock', event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-3 py-2 text-sm outline-none"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                Featured
                <select
                  defaultValue={product.is_featured ? 'yes' : 'no'}
                  onChange={(event) =>
                    handleUpdate(product.id, 'is_featured', event.target.value === 'yes')
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
          ))}
          {safeProducts.length === 0 && (
            <div className="rounded-3xl border border-[var(--ink)]/10 bg-white/80 p-6 text-sm text-[var(--ink)]/70">
              No products yet. Add your first product above.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
