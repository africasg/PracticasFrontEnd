"use client"

import { useState } from "react"
import { createPost } from "../lib/api"
import "./crearPost.css"

export default function CrearPost({ refresh }: any) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const submit = async (e: any) => {
    e.preventDefault()
    if (!content.trim()) return
    try {
      setLoading(true)
      await createPost(content)
      setContent("")
      if (refresh) refresh()

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="crear-post">
        {/* forma que encontré para poner todo junto que me gusta bastante */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué estás pensando?"
      />

      <button disabled={loading}>
        {loading ? "Publicando..." : "Post"}
      </button>

    </form>
  )
}