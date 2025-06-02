import { useState } from "react";
import RoleSelector from "./RoleSelector";
import { FaGraduationCap } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import brainIcon from "../assets/brain.svg";
import questions from "../assets/questions.svg";
import concepts from "../assets/concepts.svg";
import info from "../assets/info.svg";
import mindmap from "../assets/mindmap.svg";

export default function MainPanel({ theme, toggleTheme }) {
  const [role, setRole] = useState({
    label: "Student",
    icon: <FaGraduationCap />,
  });

  // Tooltip state
  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    x: 0,
    y: 0,
  });

  // Input state
  const [input, setInput] = useState("");
  const [inputWarning, setInputWarning] = useState("");

  // Tooltip handler
  const handleMouseMove = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      text,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, show: false });
  };

  const handleSend = () => {
    if (!input.trim()) {
      setInputWarning("Please write something before sending.");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-start px-6 pt-12 w-full h-full text-text bg-background overflow-hidden">
      {/* Theme Toggle Button */}
      <button
        className={`absolute top-4 right-6 px-4 py-2 rounded-full transition flex items-center gap-2 ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600"
            : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-500"
        }`}
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <>
            <span role="img" aria-label="moon">
              🌙
            </span>
            Light Mode
          </>
        ) : (
          <>
            <span role="img" aria-label="sun">
              ☀️
            </span>
            Dark Mode
          </>
        )}
      </button>

      <div className="text-center mt-6">
        <h1 className="text-[58px] font-heading font-bold text-accent flex justify-center items-center gap-2">
          <div className="p-4">
            <img src={brainIcon} alt="Brain Icon" className="h-[80px]" />
          </div>
          DocDynamo
        </h1>
        <p className="mt-5 mb-8 text-lg font-heading font-semibold">
          AI-Powered Document Intelligence
        </p>
      </div>
      {/* Input Row */}
      <div className="flex items-center bg-[#1f1f2e] rounded-2xl px-6 py-2 mt-10 w-full max-w-4xl shadow border border-gray-700 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setInputWarning("");
          }}
          placeholder="Ask anything about your documents..."
          className={`bg-transparent flex-1 outline-none text-white placeholder-gray-500`}
        />
        {/* Warning appears above the input */}
        {inputWarning && (
          <div className="absolute left-6 -top-10 flex items-center gap-2 bg-red-500/90 text-white text-xs px-3 py-1 rounded shadow animate-fade-in-down z-20">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
            {inputWarning}
            <button
              className="ml-2 text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setInputWarning("")}
              tabIndex={-1}
              type="button"
            >
              &times;
            </button>
          </div>
        )}
        <div className="mx-2 relative">
          <RoleSelector selectedRole={role} onChange={setRole} />
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full"
          onClick={handleSend}
        >
          <IoIosSend size={20} />
        </button>
      </div>

      {/* Button Row */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 relative font-heading font-semibold">
        {[
          {
            svg: <img src={questions} alt="Questions Icon" className="h-7 w-7" />,
            icon: "Questions",
            tooltip: "Ask AI generated questions about your document",
          },
          {
            svg: <img src={concepts} alt="Concepts Icon" className="h-5 w-5" />,
            icon: "Concepts",
            tooltip: "Extract key concepts from your documents",
          },
          {
            svg: <img src={info} alt="Info Icon" className="h-6 w-7" />,
            icon: "Add-on Info",
            tooltip: "Get additional information & insights",
          },
          {
            svg: <img src={mindmap} alt="Mindmap Icon" className="h-8 w-9" />,
            icon: "Mindmap",
            tooltip: "Visualize document as a mindmap",
          },
        ].map((btn, idx) => (
          <button
            key={idx}
            className="relative group bg-[#2b2b40] hover:bg-[#3c3c56] text-white px-8 py-2 rounded-full transition flex items-center gap-2"
            onMouseMove={(e) => handleMouseMove(e, btn.tooltip)}
            onMouseLeave={handleMouseLeave}
          >
            {btn.svg}
            <span>{btn.icon}</span>
            {/* Tooltip */}
            {tooltip.show && tooltip.text === btn.tooltip && (
              <span
                className="pointer-events-none bg-gray-900 text-white text-xs rounded px-2 py-1 transition duration-150 whitespace-nowrap z-20 absolute"
                style={{
                  left: tooltip.x + 10,
                  top: tooltip.y - 40,
                }}
              >
                {btn.tooltip}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}