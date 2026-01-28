import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "../api";

export default function ViewPaste() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/pastes/${id}`);
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setData(json);
      } catch {
        setError("This paste does not exist or has expired.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Loading paste…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-semibold mb-2">Paste Unavailable</h1>
        <p className="text-slate-400 mb-4">{error}</p>
        <Link
          to="/"
          className="text-blue-400 underline hover:text-blue-300"
        >
          Create a new paste
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">View Paste</h1>
          <Link
            to="/"
            className="text-sm text-blue-400 underline hover:text-blue-300"
          >
            New Paste
          </Link>
        </div>

        {/* Paste Content */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 overflow-auto">
          <pre className="whitespace-pre-wrap break-words text-slate-100 text-sm leading-relaxed">
            {data.content}
          </pre>
        </div>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-400">
          <div>
            <span className="font-medium">Remaining views:</span>{" "}
            {data.remaining_views === null
              ? "Unlimited"
              : data.remaining_views}
          </div>
          <div>
            <span className="font-medium">Expires at:</span>{" "}
            {data.expires_at
              ? new Date(data.expires_at).toLocaleString()
              : "Never"}
          </div>
        </div>
      </div>
    </div>
  );
}
