import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase.js'
import MotionButton from '../../components/MotionButton.jsx'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: 'customer' },
      },
    })
    setLoading(false)
    if (signUpError) {
      setError(signUpError.message)
      return
    }
    navigate('/login')
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="rounded-[2.5rem] bg-[var(--sand)] p-10">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">Create account</p>
        <h1 className="font-display text-4xl">Join Veloure Beauty</h1>
        <p className="mt-3 text-sm text-[color:var(--ink)]/70">
          Create a customer account to save rituals and track purchases.
          Admin accounts are created directly in Supabase.
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
              placeholder="Create a secure password"
              type="password"
              minLength={6}
              required
            />
          </label>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <MotionButton
          disabled={loading}
          className="mt-6 w-full rounded-full bg-[var(--brown)] px-6 py-3 text-sm font-semibold text-white"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </MotionButton>
        <Link to="/login" className="mt-4 block text-center text-sm font-semibold text-[var(--taupe)]">
          Already have an account? Sign in
        </Link>
      </form>
    </section>
  )
}

export default Signup
