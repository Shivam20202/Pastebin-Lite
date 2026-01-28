export default function Header() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          📄
        </div>
        <h1 className="text-2xl font-semibold">PastebinLite</h1>
      </div>
      <p className="text-slate-400 mt-2">
        Share text content with customizable expiration controls
      </p>
    </div>
  );
}
