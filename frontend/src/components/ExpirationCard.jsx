import { useState, useEffect } from "react";

const options = [
  { label: "1 minute", value: 60 },
  { label: "5 minutes", value: 300 },
  { label: "1 hour", value: 3600 },
  { label: "1 day", value: 86400 },
];

export default function ExpirationCard({
  ttl,
  setTtl,
  maxViews,
  setMaxViews,
}) {
  const [open, setOpen] = useState(false);

  // 👇 ADD THIS RIGHT HERE
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-4">
      <h3 className="flex items-center gap-2 font-semibold">
        ⏱ Expiration Settings
      </h3>

      {/* TTL DROPDOWN */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <label className="text-sm text-slate-400">Time to Live (TTL)</label>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-left flex justify-between items-center"
        >
          <span>
            {ttl
              ? options.find((o) => o.value === Number(ttl))?.label
              : "Select expiration time"}
          </span>
          <span className="text-slate-400">▾</span>
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-full bg-slate-900 border border-slate-700 rounded-lg shadow-lg">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setTtl(opt.value);
                  setOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-slate-700"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <p className="text-xs text-slate-500 mt-1">
          Set when this paste should automatically expire
        </p>
      </div>

      {/* MAX VIEWS */}
      <div>
        <label className="text-sm text-slate-400">Maximum Views</label>
        <input
          type="number"
          placeholder="e.g., 10"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
          className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
        />
        <p className="text-xs text-slate-500 mt-1">
          Leave empty for unlimited views
        </p>
      </div>

      <p className="text-xs text-slate-400">
        <span className="font-semibold">Note:</span> If both TTL and max views are
        set, the paste expires when either condition is met.
      </p>
    </div>
  );
}
