import { useState } from 'react';
import axios from 'axios';
import UploadBox from './UploadBox';
import ProcessedFileList from './ProccesedFileList';
import WebSearchBox from './WebSearchBox';
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Sidebar({
  theme, toggleTheme,
  uploadedFiles, setUploadedFiles,
  filesProcessed, setFilesProcessed,
  setReset
}) {
  const [processedFiles, setProcessedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('file');
  const [processedUrls, setProcessedUrls] = useState([]);
  const [urls, setUrls] = useState(['']);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile

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

  // Called when user clicks "Reset Session"
  const handleReset = async () => {
    try {
      await axios.post("https://doc-react-backend-cndfe0bqcbhbg9dc.centralindia-01.azurewebsites.net/start_over");
      console.log("Session reset successfully.");

      // Clear local state after successful reset
      setUploadedFiles([]);
      setProcessedFiles([]);
      setProcessedUrls([]);
      setUrls(['']);
      setFilesProcessed(false);
      setReset(true);
    } catch (err) {
      console.error("Failed to reset session:", err.response?.data || err.message);
    }
  };

  const sidebarContent = (
    <div className={`fixed w-[90vw] max-w-[430px] h-full md:h-screen bg-white ${theme == 'dark'? 'dark:bg-[#080a15]' : 'bg-[#e5e7ee]'} shadow-md p-8 flex flex-col text-text fixed md:static top-0 left-0 z-40 transition-transform duration-300
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
    `}>
      {/* Close button for mobile */}
      <button
        className="md:hidden absolute top-4 right-4 text-2xl"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar"
      >
        <IoMdClose />
      </button>
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
            theme={theme}
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
        className={`mt-auto ${theme == 'dark' ? 'hover:text-white text-gray-400' : 'hover:text-primary'} text-sm transition font-body font-semibold`}
      >
        🔁 Reset Session
      </button>
    </div>
  );

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white/80 dark:bg-[#080a15]/80 p-2 rounded-full shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <IoMdMenu size={28} />
      </button>
      {/* Sidebar: hidden on mobile unless open, always visible on md+ */}
      <div>
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Sidebar content */}
        <div className="md:block">
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
