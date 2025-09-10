// API utility for user CRUD operations
export async function getUsers() {
  const res = await fetch("/api/users");
  return res.json();
}

export async function addUser(user) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function updateUser(id, user) {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
