import { useState } from 'react';
import UploadBox from './UploadBox';
import ProcessedFileList from './ProccesedFileList';
import WebSearchBox from './WebSearchBox';

export default function Sidebar({ theme, toggleTheme }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('file');
  const [processedUrls, setProcessedUrls] = useState([]);
  const [urls, setUrls] = useState(['']);
  const [filesProcessed, setFilesProcessed] = useState(false);

  // Called when files are dropped/selected
  const handleFilesSelected = (files) => {
    setUploadedFiles(files);
    setFilesProcessed(false);
    setProcessedFiles([]); // Reset processed files
  };

  // Called when user clicks "Process Files"
  const handleProcessFiles = (files) => {
    setProcessedFiles(files);
    setFilesProcessed(true);
  };

  const handleReset = () => {
    setUploadedFiles([]);
    setProcessedFiles([]);
    setProcessedUrls([]);
    setUrls(['']);
    setFilesProcessed(false);
  };

  return (
    <div className={`w-[430px] ${theme == "dark" ? 'bg-[#080a15]' : 'bg-[#e5e7ee]'}  shadow-md p-8 flex flex-col text-text`}>
      <h2 className='font-heading text-2xl font-semibold mb-8 text-center'>Upload Documents</h2>

      <div className="flex gap-5 justify-center mb-8 font-heading font-semibold">
        <button
          className={`flex-1 p-3 rounded-md px-5 font-medium flex items-center justify-center gap-2 shadow-inner-sm ${
            theme === "dark"
              ? activeTab === "file"
                ? "bg-accent text-white"
                : "bg-[#0e1328] hover:bg-accent/60"
              : activeTab === "file"
              ? "bg-white text-accent"
              : "bg-white hover:bg-[#4e6ee5] hover:text-white"
          }`}
          onClick={() => setActiveTab("file")}
        >
          <span>📁</span> File Upload
        </button>
        <button
          className={`flex-1 p-3 rounded-md px-5 font-medium flex items-center justify-center gap-2 shadow-inner-sm ${
            theme === "dark"
              ? activeTab === "web"
                ? "bg-accent text-white"
                : "bg-[#0e1328] hover:bg-accent/60"
              : activeTab === "web"
              ? "bg-white text-accent"
              : "bg-white hover:bg-[#4e6ee5] hover:text-white"
          }`}
          onClick={() => setActiveTab("web")}
        >
          <span>🌐</span> Web Search
        </button>
      </div>

      {activeTab === 'file' && (
        <>
          <UploadBox onFilesSelected={handleFilesSelected} onProcessFiles={handleProcessFiles} />
          <ProcessedFileList
            files={uploadedFiles}
            processed={filesProcessed}
          />
        </>
      )}

      {activeTab === 'web' && (
        <>
          <WebSearchBox
            urls={urls}
            setUrls={setUrls}
            onProcessUrls={setProcessedUrls}
          />
          {processedUrls.length > 0 && (
            <div className="mt-4 text-xs text-gray-400">
              <p>Processed URLs:</p>
              <ul>
                {processedUrls.map((url, idx) => (
                  <li key={idx}>{url}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <button
        onClick={handleReset}
        className={`mt-auto ${ theme == 'dark' ? 'hover:text-white text-gray-400'  : 'hover:text-primary'} text-sm transition font-body font-semibold`}
      >
        🔁 Reset Session
      </button>
    </div>
  );
}
