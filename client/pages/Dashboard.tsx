import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Bookings" value="6,589" />
        <StatCard title="Total Rooms" value="6,589" />
        <StatCard title="Overall Occupancy Rate" value="68%" />
        <StatCard title="Total Transaction" value="$26,972" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Collection of Rooms" action={<Dropdown label="Monthly" />}> 
            <div className="h-64 w-full rounded-xl bg-gradient-to-b from-amber-50 to-white border flex items-end p-4">
              <div className="w-full h-40 relative">
                <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
                {/* simple faux line chart */}
                <svg viewBox="0 0 400 160" className="absolute inset-0 w-full h-full text-amber-500">
                  <path d="M0 120 C 50 80, 90 110, 130 90 S 210 60, 250 70 320 40, 400 100" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card title="Room Occupancy" action={<Dropdown label="Details" />}>
            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-50 text-amber-900">
                    <Th>Room Category</Th>
                    <Th>Total Count</Th>
                    <Th>Occupancy Rate</Th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2 BHK Double Bed", 34, "60%"],
                    ["4 BHK Single Bed", 52, "60%"],
                    ["3 BHK Double Bed", 42, "60%"],
                    ["1 BHK Double Bed", 53, "60%"],
                  ].map((r, i) => (
                    <tr key={i} className="border-t hover:bg-amber-50/40">
                      <Td>{r[0]}</Td>
                      <Td>{r[1]}</Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 rounded bg-amber-100">
                            <div className="h-2 rounded bg-amber-400" style={{ width: String(r[2]) }} />
                          </div>
                          <span>{r[2]}</span>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Orders & Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Metric title="Total Revenue" value="$375,874" />
          <Metric title="Room Revenue" value="5,874" />
          <Metric title="Other Revenue" value="35,874" />
        </div>

        <div className="rounded-2xl border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <Th>Name</Th>
                  <Th>Purchase Date</Th>
                  <Th>Purchase ID</Th>
                  <Th>Room Category</Th>
                  <Th className="text-right pr-6">Paid Amount</Th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t hover:bg-muted/30">
                    <Td>
                      <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/48?img=${i + 5}`} className="h-8 w-8 rounded-full" />
                        <div>
                          <div className="font-medium">Abantika Sadhukhan</div>
                          <div className="text-xs text-muted-foreground">Student</div>
                        </div>
                      </div>
                    </Td>
                    <Td>23 May, 2025</Td>
                    <Td>#{Math.floor(100000 + Math.random() * 900000)}</Td>
                    <Td>Room Category {((i % 3) + 1).toString()}</Td>
                    <Td className="text-right pr-6">
                      <a className="inline-flex rounded-lg border px-3 py-1.5 text-amber-600 border-amber-200 hover:bg-amber-50 font-medium">${(320 + i * 430).toLocaleString()}</a>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="text-sm text-muted-foreground flex items-center justify-between">
        <span>{title}</span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600"> 
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
        </span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-amber-600">{value}</div>
    </div>
  );
}

function Card({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
function Dropdown({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted/40">
      {label}
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  );
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn("px-4 py-3 text-left text-xs font-medium uppercase tracking-wide", className)}>{children}</th>;
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3 align-middle", className)}>{children}</td>;
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
        </span>
        <div>
          <div className="text-xs text-muted-foreground">{title}</div>
          <div className="text-xl font-semibold text-amber-600">{value}</div>
        </div>
      </div>
    </div>
  );
}
