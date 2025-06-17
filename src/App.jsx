import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";
import Footer from "./components/Footer";

document.documentElement.setAttribute("data-theme", "dark");

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesProcessed, setFilesProcessed] = useState(false);
  const [reset, setReset] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="flex h-screen text-text bg-background">
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        filesProcessed={filesProcessed}
        setFilesProcessed={setFilesProcessed}
        setReset={setReset}
      />
      <div className="flex flex-col flex-1 h-screen md:ml-[430px]">
        <div className="flex-1 overflow-y-auto">
          <MainPanel
            theme={theme}
            toggleTheme={toggleTheme}
            uploadedFiles={uploadedFiles}
            filesProcessed={filesProcessed}
            reset={reset}
            setReset={setReset}
          />
        </div>
        <Footer theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}