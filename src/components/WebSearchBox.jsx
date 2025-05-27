export default function WebSearchBox({ urls, setUrls, onProcessUrls }) {
  const handleUrlChange = (idx, value) => {
    const newUrls = [...urls];
    newUrls[idx] = value;
    setUrls(newUrls);
  };

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleProcess = () => {
    const cleaned = urls.filter(url => url.trim() !== '');
    onProcessUrls(cleaned);
  };

  return (
    <div className="flex flex-col gap-3 font-heading font-semibold">
      {urls.map((url, idx) => (
        <input
          key={idx}
          type="text"
          className="bg-background2 border border-primary rounded px-3 py-2 text-text placeholder-gray-400"
          placeholder="Enter PDF/DOCX URL"
          value={url}
          onChange={e => handleUrlChange(idx, e.target.value)}
        />
      ))}
      <button
        className="flex items-center gap-2 bg-background2 border border-accent text-accent px-3 py-2 rounded font-medium hover:bg-accent/10 transition"
        onClick={handleAddUrl}
      >
        <span>➕</span> Add Another URL
      </button>
      <button
        className="mt-2 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white px-4 py-2 rounded flex items-center justify-center gap-2 font-semibold transition"
        onClick={handleProcess}
        disabled={urls.every(url => url.trim() === '')}
      >
        <span role="img" aria-label="rocket">🚀</span> Process URLs
      </button>
    </div>
  );
}
