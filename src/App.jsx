import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";
import Footer from "./components/Footer";

document.documentElement.setAttribute("data-theme", "dark");

export default function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="flex min-h-screen text-text bg-background">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <MainPanel theme={theme} toggleTheme={toggleTheme} />
        <Footer theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}