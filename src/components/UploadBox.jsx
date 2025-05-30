import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function UploadBox({ onFilesSelected, onProcessFiles }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [warning, setWarning] = useState("");
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList);
    if (arr.length > 5) {
      setWarning("You can upload a maximum of 5 files.");
      setFiles(arr.slice(0, 5));
      if (onFilesSelected) onFilesSelected(arr.slice(0, 5));
    } else {
      setWarning("");
      setFiles(arr);
      if (onFilesSelected) onFilesSelected(arr);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleProcess = () => {
    if (files.length > 0 && onProcessFiles) {
      onProcessFiles(files);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div
        className={`border-2 ${
          dragActive ? "border-accent" : "border-primary"
        } hover:border-accent hover:bg-box rounded-md p-6 mb-4 text-center h-[250px] w-[350px] bg-background transition-colors duration-200 flex flex-col justify-center items-center relative`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        style={{ cursor: "pointer" }}
      >
        <FiUploadCloud className="text-6xl text-primary mx-auto mb-4" />
        <p className="text-xl text-text font-heading font-semibold mb-1">Drop files here</p>
        <p className="text-lg font-heading font-semibold">
          or{" "}
          <span
            className="text-accent cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current.click();
            }}
          >
            browse
          </span>
        </p>
        <p className="text-gray-400 mt-2 text-sm font-body">( Maximum 5 Files )</p>
        <input
          type="file"
          multiple
          ref={inputRef}
          className="hidden"
          onChange={handleChange}
          accept="*"
          max={5}
        />
        {files.length > 0 && (
          <div className="absolute bottom-2 left-0 w-full text-xs text-gray-400">
            {files.map((file, idx) => (
              <div key={idx}></div>
            ))}
          </div>
        )}
        {warning && (
          <div className="absolute top-4 left-0 w-full text-xs text-red-400 font-semibold">
            {warning}
          </div>
        )}
      </div>
      <button
        className="mt-3 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white px-4 py-2 w-4/5 rounded flex items-center justify-center gap-2 font-semibold transition cursor-pointer"
        disabled={files.length === 0}
        onClick={handleProcess}
      >
        <span role="img" aria-label="rocket">🚀</span> Process Files
      </button>
    </div>
  );
}