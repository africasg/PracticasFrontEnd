"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getPost, likePost, retweetPost } from "../../lib/api"

export default function PostPage() {

  const { id } = useParams()
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    load()
  }, [id])

  const load = async () => {
    const data = await getPost(id as string)
    setPost(data)
  }

  if (!post) return <p>Cargando...</p>

  return (
    <div>

      <h2>{post.contenido}</h2>
      <p>@{post.autor?.username}</p>

      <button onClick={() => { likePost(post._id); load() }}>
        ❤️ {post.likes?.length || 0}
      </button>

      <button onClick={() => { retweetPost(post._id); load() }}>
        🔁 {post.retweets?.length || 0}
      </button>

    </div>
  )
}