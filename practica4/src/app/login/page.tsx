"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login, register } from "../lib/api"
import "./login.css"

export default function LoginPage() {

  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")

    try {
      setLoading(true)

      let res

      if (isLogin) {
        res = await login(form.email, form.password)
      } else {
        res = await register(form.username, form.email, form.password)
      }

      if (res.token) {
        document.cookie = `token=${res.token}; path=/`
        router.push("/")
      } else {
        setError(res.error || "Error")
      }

    } catch (err) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">
          {isLogin ? "Login" : "Register"}
        </h1>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">

          {!isLogin && (
            <input
              name="username"
              placeholder="Username"
              className="login-input"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="login-input"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Cargando..."
              : isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p
          className="login-switch"
          onClick={() => {
            setIsLogin(!isLogin)
            setError("")
          }}
        >
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Login"}
        </p>

      </div>

    </div>
  )
}