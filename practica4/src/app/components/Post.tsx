"use client"

import Link from "next/link"
import { likePost, retweetPost } from "../lib/api"
import "./post.css"

export default function Post({ post, refresh }: any) {
  const handleLike = async () => {
    await likePost(post._id)
    if (refresh) refresh()
  }
  const handleRT = async () => {
    await retweetPost(post._id)
    if (refresh) refresh()
  }
  return (
    <div className="post-card">
      <Link href={`/profile/${post.autor?._id}`} className="post-user">
        @{post.autor?.username}
      </Link>
      <p className="post-date">
        {new Date(post.createdAt).toLocaleString("es-ES")}
      </p>
      <Link href={`/post/${post._id}`} className="post-content">
        {post.contenido}
      </Link>

      <div className="post-actions">
        <button onClick={handleLike}>
          ❤️ {post.likes?.length || 0}
        </button>
        <button onClick={handleRT}>
          🔁 {post.retweets?.length || 0}
        </button>
      </div>
      {/* añadir los emojis */}

    </div>
  )
}