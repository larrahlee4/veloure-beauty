import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, saveCart } from '../lib/cart.js'
import MotionButton from '../components/MotionButton.jsx'

function Checkout() {
  const [items, setItems] = useState([])
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [billing, setBilling] = useState('standard')
  const navigate = useNavigate()

  useEffect(() => {
    setItems(getCart())
  }, [])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price || 0) * item.qty, 0),
    [items]
  )

  const billingOptions = useMemo(() => {
    if (subtotal >= 150) {
      return [
        { id: 'standard', label: 'Standard (Free)', fee: 0 },
        { id: 'express', label: 'Express (₱250)', fee: 250 },
        { id: 'white_glove', label: 'White Glove (₱450)', fee: 450 },
      ]
    }
    if (subtotal >= 80) {
      return [
        { id: 'standard', label: 'Standard (₱150)', fee: 150 },
        { id: 'express', label: 'Express (₱250)', fee: 250 },
      ]
    }
    return [{ id: 'standard', label: 'Standard (₱150)', fee: 150 }]
  }, [subtotal])

  const selectedFee =
    billingOptions.find((option) => option.id === billing)?.fee ?? 0

  const total = subtotal + selectedFee

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!address.trim()) return
    const order = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      items,
      total,
      address: address.trim(),
      notes: notes.trim(),
      billing,
    }
    const raw = window.localStorage.getItem('veloure_orders')
    const existing = raw ? JSON.parse(raw) : []
    const next = [order, ...existing]
    window.localStorage.setItem('veloure_orders', JSON.stringify(next))
    saveCart([])
    navigate('/profile')
  }

  return (
    <section className="space-y-10">
      <div className="rounded-[2.5rem] bg-[var(--sand)] p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Checkout</p>
        <h1 className="font-display text-4xl">Delivery & billing</h1>
        <p className="mt-3 text-sm text-[var(--ink)]/70">
          Add your home address and choose a billing option based on your order total.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-6 rounded-3xl border border-[var(--ink)]/10 bg-white/80 p-6">
          <label className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">
            Home address
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
              placeholder="Street, City, Province"
              required
            />
          </label>
          <label className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">
            Description / Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
              rows="4"
              placeholder="Gate code, landmark, delivery notes..."
            />
          </label>
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">
              Billing options
            </p>
            <div className="grid gap-3">
              {billingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                    billing === option.id
                      ? 'border-[var(--brown)] bg-[var(--sand)]'
                      : 'border-[var(--ink)]/10 bg-white'
                  }`}
                >
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name="billing"
                    value={option.id}
                    checked={billing === option.id}
                    onChange={() => setBilling(option.id)}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-[var(--ink)]/10 bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Order total</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Billing option</span>
              <span>₱{selectedFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
          </div>
          <MotionButton className="mt-6 w-full rounded-full bg-[var(--brown)] px-6 py-3 text-sm font-semibold text-white">
            Place order
          </MotionButton>
        </aside>
      </form>
    </section>
  )
}

export default Checkout
