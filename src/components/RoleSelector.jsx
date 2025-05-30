import { useState, useRef, useEffect } from "react";
import {
  FaGraduationCap, FaFlask, FaBriefcase, FaChalkboardTeacher,
  FaTasks, FaRocket, FaUserAlt, FaGavel, FaCoins
} from "react-icons/fa";

const roles = [
  { label: "Student", icon: <FaGraduationCap /> },
  { label: "Researcher", icon: <FaFlask /> },
  { label: "Professional", icon: <FaBriefcase /> },
  { label: "Teacher", icon: <FaChalkboardTeacher /> },
  { label: "Product Manager", icon: <FaTasks /> },
  { label: "Founder", icon: <FaRocket /> },
  { label: "Developer", icon: <FaUserAlt /> },
  { label: "Policy Maker", icon: <FaGavel /> },
  { label: "Investor", icon: <FaCoins /> },
];

export default function RoleSelector({ selectedRole, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (role) => {
    onChange(role);
    setOpen(false);
  };

  return (
    <div className="relative font-body font-normal text-md" ref={dropdownRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-white px-4 py-2 pl-6 rounded-md min-w-[160px] transition focus:outline-none focus:ring-2 focus:ring-accent"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedRole.icon}
        {selectedRole.label}
        <svg className={`ml-2 w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute mt-2 w-full bg-[#1e1e2e] border border-gray-700 rounded-md shadow z-10 max-h-[170px] overflow-y-auto no-scrollbar animate-fade-in"
          tabIndex={-1}
          role="listbox"
        >
          {roles.map((role) => (
            <div
              key={role.label}
              onClick={() => handleSelect(role)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition
                ${selectedRole.label === role.label
                  ? "bg-accent text-white font-semibold"
                  : "hover:bg-[#2e2e3f] text-white"
                }`}
              role="option"
              aria-selected={selectedRole.label === role.label}
            >
              {role.icon}
              {role.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
