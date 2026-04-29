const BASE_URL = "https://backend-p4-klvc.onrender.com/api";
const X_NOMBRE = "africa";

function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function buildHeaders(auth = true): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-nombre": X_NOMBRE,
  };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function handleResponse(res: Response) {
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("NO JSON:", text);
    throw new Error("Respuesta inválida del servidor");
  }
  if (!res.ok) {
    if (data.error?.toLowerCase().includes("token")) {
      document.cookie = "token=; path=/";
      window.location.href = "/login";
    }
    throw new Error(data.error || "Error API");
  }

  return data;
}
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: buildHeaders(false),
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}
export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: buildHeaders(false),
    body: JSON.stringify({ username, email, password }),
  });
  return handleResponse(res);
}

export async function getPosts(page = 1) {
  return fetchAPI(`/home?page=${page}`);
}

export async function createPost(contenido: string) {
  return fetchAPI(`/posts`, {
    method: "POST",
    body: JSON.stringify({ contenido }),
  });
}

export async function likePost(id: string) {
  return fetchAPI(`/posts/${id}/like`, { method: "POST" });
}

export async function retweetPost(id: string) {
  return fetchAPI(`/posts/${id}/retweet`, { method: "POST" });
}

export async function getPost(id: string) {
  return fetchAPI(`/posts/${id}`);
}

export async function getMe() {
  return fetchAPI(`/users/me`);
}

export async function getUser(id: string) {
  return fetchAPI(`/users/${id}`);
}

export async function fetchAPI(endpoint: string, options: any = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...buildHeaders(true),
      ...(options.headers || {}),
    },
  });

  return handleResponse(res);
}