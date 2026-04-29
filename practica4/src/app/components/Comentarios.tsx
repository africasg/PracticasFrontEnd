"use client";
import { fetchAPI } from "../lib/api";
import { useState } from "react";

export default function Comentarios({ comments, postId }: any) {

  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Comentario vacío");
      return;
    }

    try {
      setLoading(true);
      await fetchAPI(`/posts/${postId}/comments`, {
        method: "POST",
        //la unica forma que encontré por el momento es con stringify...
        body: JSON.stringify({
          content: newComment
        })
      });

      setNewComment("");
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Error al comentar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Comentarios</h3>
      {comments?.length > 0 ? (
        comments.map((c: any) => (
          <p key={c.id}>{c.content}</p>
        ))
      ) : (
        <p>No hay comentarios</p>
      )}

      <form onSubmit={submit}>
        <input
          name="content"
          placeholder="Comentar..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}