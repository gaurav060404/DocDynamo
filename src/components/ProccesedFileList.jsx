import { useState, useEffect } from "react";

export default function ProcessedFileList({ files = [], processed = false }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  // Set hasInteracted to true when files are dropped/added
  useEffect(() => {
    if (files.length > 0) setHasInteracted(true);
  }, [files]);

  return (
    <div className="mt-4 text-sm text-gray-500 text-center">
      {hasInteracted ? (
        files.length > 0 ? (
          processed ? (
            <ul className="mt-10 font-heading font-semibold">
              {files.map((file, idx) => (
                <li key={idx}>{file.name || file}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 font-heading font-semibold">No files processed yet</p>
          )
        ) : null
      ) : null}
    </div>
  );
}
