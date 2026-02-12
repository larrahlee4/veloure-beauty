import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCart, removeFromCart, updateQty } from '../../lib/cart.js'
import MotionButton from '../../components/MotionButton.jsx'

function Cart() {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setItems(getCart())
  }, [])

  const handleRemove = async (id) => {
    setItems(await removeFromCart(id))
  }

  const handleQty = async (id, qty) => {
    const existing = items.find((item) => item.id === id)
    if (!existing) return
    const maxAllowed = Math.max(1, Number(existing.qty || 1) + Number(existing.stock || 0))
    const nextQty = Math.max(1, Math.min(maxAllowed, Number(qty || 1)))
    setItems(await updateQty(id, nextQty))
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * item.qty, 0)

  const handleCheckout = () => {
    if (items.length === 0) return
    navigate('/checkout-list')
  }

  return (
    <section className="space-y-8">
      <div className="border border-[var(--ink)] bg-white px-6 py-8 md:px-10">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--ink)]/65">
          Your bag
        </p>
        <h1 className="mt-3 text-4xl font-black uppercase leading-none md:text-5xl">
          Ritual selections
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.16fr_0.84fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="border border-[var(--ink)] bg-white p-6 text-sm text-[var(--ink)]/70">
              Your bag is empty. Add products from the shop to begin your ritual.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 border border-[var(--ink)] bg-white p-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-16 w-16 border border-[var(--ink)] object-cover"
                  />
                  <div>
                    <p className="text-lg font-black uppercase tracking-[0.08em] text-[var(--ink)]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[var(--ink)]/70">
                      PHP {Number(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    className="w-16 border border-[var(--ink)] px-3 py-2 text-sm"
                    type="number"
                    min="1"
                    max={Math.max(1, Number(item.qty || 1) + Number(item.stock || 0))}
                    value={item.qty}
                    onChange={(event) => handleQty(item.id, event.target.value)}
                  />
                  <MotionButton
                    className="text-xs uppercase tracking-[0.2em] text-[var(--ink)]"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </MotionButton>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="border border-[var(--ink)] bg-white p-6 md:p-7">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--ink)]/65">
            Summary
          </p>
          <div className="mt-5 space-y-3 border-t border-[var(--ink)] pt-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>PHP {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>PHP 0.00</span>
            </div>
            <div className="flex justify-between border-t border-[var(--ink)] pt-3 text-base font-black">
              <span>Total</span>
              <span>PHP {subtotal.toFixed(2)}</span>
            </div>
          </div>
          <MotionButton
            onClick={handleCheckout}
            className="mt-6 w-full border border-[var(--ink)] bg-[var(--ink)] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white"
          >
            Checkout
          </MotionButton>
          <Link
            to="/shop"
            className="mt-4 block w-full border border-[var(--ink)] px-6 py-3 text-center text-sm font-black uppercase tracking-[0.12em]"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default Cart
