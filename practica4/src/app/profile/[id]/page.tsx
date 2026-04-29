"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchAPI, likePost, retweetPost } from "../../lib/api"
import Link from "next/link"
import "./profile.css"

export default function Profile() {

  const { id } = useParams()

  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)
      const userData =
        id === "me"
          ? await fetchAPI("/users/me")
          : await fetchAPI(`/users/${id}`)

      const realUser =
        userData.user || userData.data || userData

      setUser(realUser)
    //   filtro desde home 
      const postsData = await fetchAPI("/home?page=1")

      const filtered = (postsData.posts || []).filter(
        (p: any) => p.autor?._id === realUser._id
      )

      setPosts(filtered)

    } catch (e) {
      console.error("Error perfil:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) loadData()
  }, [id])

  const handleLike = async (postId: string) => {
    await likePost(postId)
    loadData()
  }

  const handleRT = async (postId: string) => {
    await retweetPost(postId)
    loadData()
  }

  if (loading) return <p className="loading">Cargando...</p>

  return (
    <div className="profile">

      <div className="profile-header">
        <h1>@{user?.username}</h1>
        <p>{user?.bio || "Sin bio"}</p>
      </div>
      <div className="profile-posts">

        {posts.length === 0 ? (
          <p className="no-posts">Este usuario no tiene posts</p>
        ) : (
          posts.map((p) => (
            <div key={p._id} className="post-card">

              <Link href={`/post/${p._id}`} className="post-content">
                {p.contenido}
              </Link>
              <div className="post-actions">
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

    </div>
  )
}