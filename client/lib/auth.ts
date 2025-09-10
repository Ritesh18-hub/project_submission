export const AUTH_KEY = "auth_token";

export function isAuthed() {
  return typeof window !== "undefined" && !!localStorage.getItem(AUTH_KEY);
}

export function login(username: string, password: string) {
  if (username === "user" && password === "password") {
    localStorage.setItem(AUTH_KEY, "ok");
    return { ok: true } as const;
  }
  return { ok: false, error: "Invalid credentials" } as const;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(AUTH_KEY);
}
