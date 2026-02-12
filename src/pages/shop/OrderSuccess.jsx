import { Link, useLocation } from 'react-router-dom'
import MotionButton from '../../components/MotionButton.jsx'

function OrderSuccess() {
  const location = useLocation()
  const orderId = location.state?.orderId
  const total = location.state?.total
  const itemCount = location.state?.itemCount

  return (
    <section className="space-y-8">
      <div className="border border-[var(--ink)] bg-white px-6 py-8 md:px-10">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--ink)]/65">Order placed</p>
        <h1 className="mt-3 text-4xl font-black uppercase leading-none md:text-5xl">Thank you for your order</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink)]/75">
          Your ritual essentials are now confirmed. We will prepare and ship your order soon.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.16fr_0.84fr]">
        <div className="border border-[var(--ink)] bg-white p-6 md:p-7">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--ink)]/70">Confirmation</p>
          <div className="mt-4 space-y-3 text-sm">
            <p>Order number: <span className="font-black">{orderId ? `#${orderId}` : 'Available in your profile history'}</span></p>
            <p>Items: <span className="font-black">{itemCount ?? '--'}</span></p>
            <p>Total paid: <span className="font-black">{typeof total === 'number' ? `PHP ${total.toFixed(2)}` : 'Shown in your order history'}</span></p>
          </div>
        </div>

        <aside className="border border-[var(--ink)] bg-white p-6 md:p-7">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--ink)]/65">Next steps</p>
          <div className="mt-5 space-y-3 border-t border-[var(--ink)] pt-4 text-sm text-[var(--ink)]/80">
            <p>1. Track your order updates in your profile.</p>
            <p>2. Delivery details are sent to your account timeline.</p>
          </div>
          <div className="mt-6 grid gap-3">
            <Link to="/profile">
              <MotionButton className="w-full border border-[var(--ink)] bg-[var(--ink)] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">
                View profile orders
              </MotionButton>
            </Link>
            <Link
              to="/products"
              className="block w-full border border-[var(--ink)] px-6 py-3 text-center text-sm font-black uppercase tracking-[0.12em]"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default OrderSuccess
