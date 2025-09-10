import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, isAuthed } from "@/lib/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as any;

  useEffect(() => {
    if (isAuthed()) navigate("/", { replace: true });
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(username.trim(), password);
    if (res.ok) {
      const to = location.state?.from?.pathname || "/";
      navigate(to, { replace: true });
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:block p-8">
        <div className="absolute inset-6 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets%2Fd85405da64014520b8d66726bf928a4a%2F2151bf83503f4681908260432d9bb8e4?format=webp&width=1400')" }} />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-3xl font-semibold leading-tight">Welcome to Ladnun\nYogshem Varsh 2026</h2>
            <p className="mt-3 text-sm text-white/80 max-w-md">Discover the heart of Jain heritage in Ladnun. Connect, explore, and cherish every sacred moment.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="text-amber-500 font-semibold text-xl">Jai Jinendra!</div>
            <h1 className="mt-2 text-2xl font-semibold">Welcome to Jain Vishva Bharti!</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter your username and password to access your account</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Username</span>
              <input value={username} onChange={(e)=>setUsername(e.target.value)} className="input" placeholder="user" />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Password</span>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input" placeholder="password" />
            </label>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white py-2.5 font-medium shadow">Sign in</button>
            <button type="button" onClick={()=>{setUsername("user");setPassword("password");}} className="w-full text-xs text-muted-foreground hover:text-foreground">Use demo credentials</button>
          </form>
        </div>
      </div>
    </div>
  );
}
