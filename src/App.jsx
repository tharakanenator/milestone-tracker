import { useEffect, useState } from "react";

const MILESTONES = [
  { label: "Reflection Complete", months: 1 },
  { label: "Resume Polished", months: 3 },
  { label: "Networking Active", months: 4 },
  { label: "Search Greenlit", months: 6 },
];

export default function App() {
  const start = new Date();
  const target = new Date(start);
  target.setMonth(target.getMonth() + 6);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(i);
  }, []);

  const total = target - start;
  const remaining = Math.max(target - now, 0);
  const progress = Math.min(1, 1 - remaining / total);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);

  const milestonePosition = (months) => (months / 6) * 220 + 24;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-700">
              Job Search Countdown
            </h1>
            <p className="text-gray-600">
              Personal runway to job‑search readiness
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card title="Start Date" value={start.toDateString()} />
          <Card title="Search Allowed" value={target.toDateString()} />
          <Card
            title="Time Remaining"
            value={
              remaining > 0
                ? `${days}d ${hours}h ${minutes}m`
                : "Cleared for liftoff 🚀"
            }
          />
        </div>

        <div className="relative h-80 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-white" />

          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-2 h-64 bg-blue-300 rounded-full opacity-40" />

          {MILESTONES.map((m, i) => {
            const reached = progress >= m.months / 6;
            return (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-[140%] flex items-center gap-2 text-sm"
                style={{ bottom: `${milestonePosition(m.months)}px` }}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    reached ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span
                  className={
                    reached
                      ? "text-green-700 font-medium"
                      : "text-gray-400"
                  }
                >
                  {m.label}
                </span>
              </div>
            );
          })}

          <div
            className="absolute left-1/2 -translate-x-1/2 text-6xl transition-all duration-700"
            style={{ bottom: `${24 + progress * 220}px` }}
          >
            🚀
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {title}
      </p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}