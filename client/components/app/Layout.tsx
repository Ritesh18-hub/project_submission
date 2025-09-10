import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: DashboardIcon },
  { to: "/users", label: "User Management", icon: UsersIcon },
];

export default function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <div className="flex">
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r bg-card/70 backdrop-blur">
          <div className="h-16 flex items-center px-6 border-b">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-amber-500" />
            <div className="ml-3 font-bold tracking-tight">OmStay Admin</div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                    "hover:bg-amber-50 hover:text-amber-700",
                    isActive &&
                      "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                  )
                }
              >
                <n.icon className="h-5 w-5 text-amber-500" />
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="px-6 py-4 text-xs text-muted-foreground border-t">
            Version 1.0.0
          </div>
        </aside>
        <div className="flex-1 flex min-w-0 flex-col">
          <header className="h-16 border-b bg-card/70 backdrop-blur sticky top-0 z-10">
            <div className="h-full container mx-auto px-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full">
                <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border">
                  <MenuIcon className="h-5 w-5" />
                </button>
                <div className="relative flex-1 max-w-xl">
                  <input
                    placeholder="Search..."
                    className="w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-10 px-4 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white font-medium shadow-sm">
                  New
                </button>
                <button onClick={() => { import("@/lib/auth").then(m=>m.logout()); window.location.href = "/login"; }} className="h-10 px-4 rounded-xl border hover:bg-muted/40">Logout</button>
                <img
                  src="https://i.pravatar.cc/40?img=8"
                  alt="avatar"
                  className="h-9 w-9 rounded-full border object-cover"
                />
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function DashboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v4h8V3h-8z" />
    </svg>
  );
}
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4z" />
      <path d="M7 14c-2.21 0-4 1.79-4 4v3h10v-3c0-2.21-1.79-4-4-4z" />
      <path d="M7 11c1.657 0 3-1.79 3-4S8.657 3 7 3 4 4.79 4 7s1.343 4 3 4z" />
      <path d="M16 14c-1.074 0-2.06.34-2.869.92A4.98 4.98 0 0118 18v3h5v-3c0-2.21-1.79-4-4-4h-3z" />
    </svg>
  );
}
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
