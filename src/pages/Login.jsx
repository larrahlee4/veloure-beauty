import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import MotionButton from '../components/MotionButton.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (signInError) {
      setLoading(false)
      setError(signInError.message)
      return
    }

    const role = data?.user?.user_metadata?.role ?? 'customer'
    setLoading(false)
    navigate(role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="rounded-[2.5rem] bg-[var(--sand)] p-10">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">Account</p>
        <h1 className="font-display text-4xl">Sign in</h1>
        <p className="mt-3 text-sm text-[color:var(--ink)]/70">
          Customer accounts are created here. Admin accounts are managed in Supabase.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2.5rem] border border-[var(--ink)]/10 bg-white/90 p-8 shadow-[0_30px_80px_-50px_rgba(59,51,40,0.55)]"
      >
        <div className="grid gap-5">
          <label className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">
            Email address
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
              placeholder="hello@veloure.com"
              type="email"
              required
            />
          </label>
          <label className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-4 py-3 text-sm outline-none"
              placeholder="••••••••"
              type="password"
              required
            />
          </label>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <MotionButton
          disabled={loading}
          className="mt-6 w-full rounded-full bg-[var(--brown)] px-6 py-3 text-sm font-semibold text-white"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </MotionButton>
        <Link to="/signup" className="mt-4 block text-center text-sm font-semibold text-[var(--taupe)]">
          New here? Create an account
        </Link>
      </form>
    </section>
  )
}

export default Login
