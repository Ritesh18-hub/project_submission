// Icon components for table actions
import React from "react";

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M15.232 5.232l3.536 3.536" />
      <path d="M9 13l6.232-6.232a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
      <path d="M7 17h10" />
    </svg>
  );
}

function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
  role: "Admin" | "User" | "Manager";
  status: "Active" | "Inactive";
  avatar: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"list" | "add" | "edit" | "view">("list");
  const [selected, setSelected] = useState<User | null>(null);
  useEffect(() => {
    setLoading(true);
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const filtered = users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
  const onAdd = () => { setMode("add"); setSelected(null); };
  const onEdit = (u: User) => { setMode("edit"); setSelected(u); };
  const onView = (u: User) => { setMode("view"); setSelected(u); };
  const onDelete = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  };
  const handleSubmit = async (user: Partial<User>) => {
    if (mode === "add") {
      const newUser = await addUser(user);
      setUsers([...users, newUser]);
    } else if (mode === "edit" && selected) {
      const updated = await updateUser(selected.id, user);
      setUsers(users.map(u => u.id === selected.id ? updated : u));
    }
    setMode("list");
    setSelected(null);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6">
      {/* Left: User Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight flex-1">User Management</h1>
          <button onClick={onAdd} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm hover:bg-amber-50">
            <PlusIcon className="h-4 w-4 text-amber-600" /> Add New
          </button>
        </div>
        <div className="rounded-2xl border bg-card p-3">
          <div className="relative mb-3">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search..." className="w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-amber-50">
                  <Th>Name</Th>
                  <Th>Designation</Th>
                  <Th>Role</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} className={cn("border-t hover:bg-amber-50/40", selected?.id === u.id && "ring-1 ring-amber-200 bg-amber-50/60") }>
                    <Td>
                      <button onClick={() => onView(u)} className="flex items-center gap-3">
                        <img src={u.avatar} className="h-8 w-8 rounded-full"/>
                        <div>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-xs text-muted-foreground">{u.designation}</div>
                        </div>
                      </button>
                    </Td>
                    <Td>
                      <div>
                        <div>{u.designation}</div>
                        <div className="text-xs text-muted-foreground">Tester</div>
                      </div>
                    </Td>
                    <Td>
                      <span className="text-amber-600 font-medium">{u.role}</span>
                    </Td>
                    <Td>
                      <span className="text-green-600 font-medium">{u.status}</span>
                    </Td>
                    <Td className="text-right pr-6 space-x-2">
                      <button onClick={() => onEdit(u)} className="inline-flex items-center justify-center rounded-lg border p-2 hover:bg-amber-50" title="Edit">
                        <EditIcon className="h-4 w-4 text-amber-600" />
                      </button>
                      <button className="inline-flex items-center justify-center rounded-lg border p-2 hover:bg-amber-50" title="Delete">
                        <DeleteIcon className="h-4 w-4 text-red-500" />
                      </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Right: Edit/Add/View Panel */}
      <div className="space-y-4">
        {mode === "add" && <UserForm onCancel={() => setMode("list")} onSubmit={(user) => handleSubmit(user)} />}
        {mode === "edit" && selected && <UserForm user={selected} onCancel={() => setMode("list")} onSubmit={(user) => handleSubmit(user)} />}
        {mode === "view" && selected && <UserView user={selected} onEdit={()=> setMode("edit")} />}
      </div>
    </div>
  );
}

function PlaceholderPanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
      <div className="mx-auto mb-3 h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
        <UserIcon className="h-5 w-5" />
      </div>
      <div className="font-medium text-foreground">{title}</div>
      <p className="mt-1">{description}</p>
    </div>
  );
}

function UserView({ user, onEdit }: { user: User; onEdit: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center gap-3">
          <img src={user.avatar} className="h-12 w-12 rounded-full"/>
          <div>
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.id}</div>
          </div>
        </div>
      </div>

      <Card title="Basic Info" action={<button onClick={onEdit} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-muted/40">Edit</button>}>
        <InfoRow label="Email Address" value={user.email} />
        <InfoRow label="Mobile Number" value={user.phone} />
        <InfoRow label="Address" value={user.address} />
      </Card>

      <Card title="Role Details">
        <InfoRow label="Role" value={user.role} />
        <InfoRow label="Feature Name" value="Room Booking Services, Utilities" />
        <InfoRow label="Designation" value={`${user.designation}, Tester, Tester`} />
        <InfoRow label="Status" value={user.status} />
      </Card>

      <button className="w-full rounded-xl border border-red-200 text-red-600 py-2 hover:bg-red-50">Delete this User Profile</button>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="col-span-2">{value}</div>
    </div>
  );
}

interface UserFormProps {
  user?: User;
  onCancel: () => void;
  onSubmit: (user: Partial<User>) => Promise<void>;
}

function UserForm({ user, onCancel, onSubmit }: UserFormProps) {
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [form, setForm] = useState<Partial<User>>({
    name: user?.name || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
    email: user?.email || "",
    address: user?.address || "",
    designation: user?.designation || "",
    role: user?.role || "User",
    status: user?.status || "Active",
  });

  const handleChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-4"
    >
      <Card title={user ? "Edit User Details" : "Add New User"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name"><input value={form.name} onChange={handleChange("name")} className="input" placeholder="Enter User Name"/></Field>
          <Field label="Mobile Number"><input value={form.phone} onChange={handleChange("phone")} className="input" placeholder="Enter Mobile Number"/></Field>
          <Field label="Profile Image">
            {avatar ? (
              <div className="relative flex items-center justify-center">
                <img src={avatar} alt={user?.name} className="h-20 w-20 rounded-xl object-cover border" />
                <button type="button" className="absolute top-1 right-1 bg-white rounded-full border shadow p-1 text-xs" title="Remove" onClick={() => setAvatar(undefined)}>
                  ×
                </button>
              </div>
            ) : (
              <div className="rounded-xl border-dashed border p-6 text-center text-sm text-muted-foreground">Drop your image here or Browse</div>
            )}
          </Field>
          <Field label="Email Address"><input value={form.email} onChange={handleChange("email")} className="input" placeholder="Enter Email Address"/></Field>
          <Field label="Address" className="md:col-span-2"><input value={form.address} onChange={handleChange("address")} className="input" placeholder="Enter Address"/></Field>
          <Field label="Designation"><input value={form.designation} onChange={handleChange("designation")} className="input" placeholder="Choose Designation"/></Field>
          <Field label="Role"><select value={form.role} onChange={handleChange("role")} className="input"><option>Admin</option><option>User</option><option>Manager</option></select></Field>
          <Field label="Note" className="md:col-span-2"><textarea className="input min-h-[120px]" placeholder="Add Note" /></Field>
        </div>
      </Card>
      <div className="flex items-center gap-3">
        <button type="button" onClick={onCancel} className="flex-1 rounded-xl border px-4 py-2 font-medium hover:bg-muted/40">Cancel</button>
        <button type="submit" className="flex-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2 font-medium shadow">{user ? "Save the Changes" : "Publish this Service"}</button>
      </div>

      <Card title="Role Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Role"><select className="input"><option>Administrator</option><option>Manager</option><option>User</option></select></Field>
          <Field label="Feature Name"><input className="input" placeholder="Choose Feature"/></Field>
        </div>
      </Card>
    </form>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block space-y-1", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Card({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        {action}
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn("px-4 py-3 text-left text-xs font-medium uppercase tracking-wide", className)}>{children}</th>;
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3 align-middle", className)}>{children}</td>;
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>); }
function PlusIcon(props: React.SVGProps<SVGSVGElement>) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M12 5v14M5 12h14"/></svg>); }
function UserIcon(props: React.SVGProps<SVGSVGElement>) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4z" /><path d="M7 14c-2.21 0-4 1.79-4 4v3h10v-3c0-2.21-1.79-4-4-4z" /><path d="M7 11c1.657 0 3-1.79 3-4S8.657 3 7 3 4 4.79 4 7s1.343 4 3 4z" /></svg>); }
