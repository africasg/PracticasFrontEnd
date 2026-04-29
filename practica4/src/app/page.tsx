"use client"

import { useEffect, useState } from "react"
import { getPosts, createPost, likePost, retweetPost } from "./lib/api"
import Link from "next/link"
import "./page.css"

export default function Home() {

  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(false)
  const [posting, setPosting] = useState(false)
  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await getPosts(page)
      setPosts(data.posts || [])
    } catch (e) {
      console.error("Error cargando posts:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [page])

  const handlePost = async (e: any) => {
    e.preventDefault()

    if (!newPost.trim()) return

    try {
      setPosting(true)

      await createPost(newPost)

      setNewPost("")
      await loadPosts()

    } catch (e) {
      console.error("Error creando post:", e)
    } finally {
      setPosting(false)
    }
  }

  const handleLike = async (id: string) => {
    try {
      await likePost(id)
      await loadPosts()
    } catch (e) {
      console.error("Error en like:", e)
    }
  }

  const handleRT = async (id: string) => {
    try {
      await retweetPost(id)
      await loadPosts()
    } catch (e) {
      console.error("Error en retweet:", e)
    }
  }

  return (
    <div className="home">


      <form onSubmit={handlePost} className="card">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="¿Qué está pasando?"
        />

        <button disabled={posting}>
          {posting ? "Publicando..." : "Publicar"}
        </button>
      </form>


      {loading ? (
        <p className="loading">Cargando...</p>
      ) : (
        posts.map((p) => (
          <div key={p._id} className="card">

            <Link href={`/profile/${p.autor?._id}`} className="user">
              @{p.autor?.username}
            </Link>

            <Link href={`/post/${p._id}`} className="content">
              {p.contenido}
            </Link>

            <div className="actions">
              <button onClick={() => handleLike(p._id)}>
                ❤️ {p.likes?.length || 0}
              </button>

              <button onClick={() => handleRT(p._id)}>
                🔁 {p.retweets?.length || 0}
              </button>
            </div>

          </div>
        ))
      )}

    </div>
  )
}