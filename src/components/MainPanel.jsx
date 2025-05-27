import { useState } from "react";
import RoleSelector from "./RoleSelector";
import { FaGraduationCap } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { GiBrain } from "react-icons/gi";

export default function MainPanel() {
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
    <div className="flex flex-col items-center justify-start px-6 pt-12 w-full h-full text-text bg-background2 overflow-hidden">
      <div className="text-center mt-6">
        <h1 className="text-4xl font-heading font-bold text-purple-400 flex justify-center items-center gap-5">
          <GiBrain className="text-pink-400 text-5xl" />
          DocDynamo
        </h1>
        <p className="text-gray-400 mt-5 mb-8 text-lg font-heading font-semibold">
          AI-Powered Document Intelligence
        </p>
      </div>
      {/* Input Row */}
      <div className="flex items-center bg-[#1f1f2e] rounded-2xl px-6 py-2 mt-10 w-full max-w-3xl shadow border border-gray-700 relative">
        <input
          type="text"
          value={input}
          onChange={e => {
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
      <div className="flex flex-wrap justify-center gap-4 mt-8 relative">
        {[
          {
            icon: "🧐 Questions",
            tooltip: "Ask AI generated questions about your document",
          },
          {
            icon: "💡 Concepts",
            tooltip: "Extract key concepts from your documents",
          },
          {
            icon: "ℹ️ Add-on Info",
            tooltip: "Get additional information & insights",
          },
          {
            icon: "🧠 Mindmap",
            tooltip: "Visualize document as a mindmap",
          },
        ].map((btn, idx) => (
          <button
            key={btn.icon}
            className="relative group bg-[#2b2b40] hover:bg-[#3c3c56] text-white px-5 py-2 rounded-full transition"
            onMouseMove={e => handleMouseMove(e, btn.tooltip)}
            onMouseLeave={handleMouseLeave}
          >
            {btn.icon}
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