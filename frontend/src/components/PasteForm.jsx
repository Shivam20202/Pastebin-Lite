import { useState } from "react";
import ExpirationCard from "./ExpirationCard";
import { API_BASE } from "../api";

export default function PasteForm() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [result, setResult] = useState("");
  const maxChars = 100000;

  const createPaste = async () => {
    if (!content.trim()) return alert("Content is required");

    const res = await fetch(`${API_BASE}/api/pastes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: maxViews ? Number(maxViews) : undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error || "Error");

    setResult(data.url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Text Area */}
      <div className="lg:col-span-2 bg-slate-800/80 border border-slate-700 rounded-xl p-4">
        <div className="flex justify-between mb-2 text-sm text-slate-400">
          <span>Paste Content</span>
          <span>{content.length} / {maxChars}</span>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
          rows={14}
          placeholder="Enter or paste your text content here..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 resize-none focus:outline-none"
        />
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        <ExpirationCard
          ttl={ttl}
          setTtl={setTtl}
          maxViews={maxViews}
          setMaxViews={setMaxViews}
        />

        <button
          onClick={createPaste}
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
        >
          Create Paste ✈️
        </button>

        {result && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 break-all">
            <p className="text-sm text-slate-400 mb-1">Shareable Link</p>
            <a
              href={result}
              target="_blank"
              className="text-blue-400 underline"
            >
              {result}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
