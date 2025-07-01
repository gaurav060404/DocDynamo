import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";
import Footer from "./components/Footer";
import Login from "./components/Login";

document.documentElement.setAttribute("data-theme", "dark");

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesProcessed, setFilesProcessed] = useState(false);
  const [reset, setReset] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const loginState = JSON.parse(localStorage.getItem("loginState"));
    if (loginState && loginState.loggedIn) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      const isValid = Date.now() - loginState.timestamp < sevenDays;
      if (isValid) {
        setLoggedIn(true);
      } else {
        localStorage.removeItem("loginState");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (showLogin) {
    return <Login setLoggedIn={setLoggedIn} setShowLogin={setShowLogin} />;
  }

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
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setShowLogin={setShowLogin}
          />
        </div>
        <Footer theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}