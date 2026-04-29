"use client"

import Link from "next/link"
import "./navbar.css"

export default function BarraNaveg() {

  return (
    <div className="navbar">

      <div className="nav-izq">
        <Link href="/">Home</Link>
        <Link href="/profile/me">Perfil</Link>
      </div>

      <div className="nav-der">
        <button
          onClick={() => {
            document.cookie = "token=; path=/"
            //mirar en internet como hacerlo bien
            window.location.href = "/login"
          }}
        >
          Logout
        </button>
      </div>

    </div>
  )
}