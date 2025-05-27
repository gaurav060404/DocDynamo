import { useState } from 'react';
import UploadBox from './UploadBox';
import ProcessedFileList from './ProccesedFileList';
import WebSearchBox from './WebSearchBox';

export default function Sidebar() {
  const [processedFiles, setProcessedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('file');
  const [processedUrls, setProcessedUrls] = useState([]);
  const [urls, setUrls] = useState(['']);

  const handleProcessFiles = (files) => {
    setProcessedFiles(files);
  };

  const handleReset = () => {
    setProcessedFiles([]);
    setProcessedUrls([]);
    setUrls(['']); // Reset WebSearchBox fields
  };

  return (
    <div className='w-[430px] bg-background1 shadow-md p-8 flex flex-col text-text'>
      <h2 className='font-heading text-2xl font-semibold mb-8 text-center'>Upload Documents</h2>

      <div className='flex gap-5 justify-center mb-8 font-heading font-semibold'>
        <button
          className={`flex-1 p-3 rounded-md px-5 font-medium flex items-center justify-center gap-2
            ${activeTab === 'file' ? 'bg-secondary text-white' : 'bg-primary text-gray-300 hover:bg-primary/60'}`}
          onClick={() => setActiveTab('file')}
        >
          <span>📁</span> File Upload
        </button>
        <button
          className={`flex-1 p-3 rounded-md px-5 font-medium flex items-center justify-center gap-2
            ${activeTab === 'web' ? 'bg-secondary text-white' : 'bg-primary text-gray-300 hover:bg-accent/60'}`}
          onClick={() => setActiveTab('web')}
        >
          <span>🌐</span> Web Search
        </button>
      </div>

      {activeTab === 'file' && (
        <>
          <UploadBox onProcessFiles={handleProcessFiles} />
          <ProcessedFileList files={processedFiles} />
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
        className="mt-auto text-gray-400 hover:text-white text-sm transition font-body font-semibold"
      >
        🔁 Reset Session
      </button>
    </div>
  );
}
