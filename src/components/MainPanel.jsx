import { useState, useEffect, useRef } from "react";
import RoleSelector from "./RoleSelector";
import { FaGraduationCap } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import brainIcon from "../assets/brain.svg";
import questions from "../assets/questions.svg";
import concepts from "../assets/concepts.svg";
import info from "../assets/info.svg";
import mindmap from "../assets/mindmap.svg";
import relatedVideos from '../assets/videos.svg';
import response from '../assets/response.svg';
import generatedQuestions from '../assets/genques.svg';
import keyConcepts from '../assets/keyconcepts.svg';
import addOnInfo from '../assets/addon.svg';
import axios from "axios";

export default function MainPanel({ theme, toggleTheme, uploadedFiles, filesProcessed, reset, setReset }) {
  const [role, setRole] = useState({
    label: "Student",
    icon: <FaGraduationCap />,
  });
  const [conceptsResult, setConceptsResult] = useState(null);
  const [conceptsLoading, setConceptsLoading] = useState(false);
  const [conceptsError, setConceptsError] = useState("");
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsResult, setQuestionsResult] = useState(null);
  const [questionsError, setQuestionsError] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [ytRecommendations, setYtRecommendations] = useState([]);
  const queryRef = useRef(null);
  const conceptsRef = useRef(null);
  const questionsRef = useRef(null);
  const addonRef = useRef(null);

  console.log(ytRecommendations);

  useEffect(() => {
    if (queryResult && queryRef.current) {
      queryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [queryResult]);

  useEffect(() => {
    if (conceptsResult && conceptsRef.current) {
      conceptsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [conceptsResult]);

  useEffect(() => {
    if (questionsResult && questionsRef.current) {
      questionsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [questionsResult]);

  useEffect(() => {
    if (showAdditionalInfo && addonRef.current) {
      addonRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAdditionalInfo]);

  const handleQuestions = async () => {
    setQuestionsLoading(true);
    setQuestionsError("");
    setQuestionsResult(null);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/generate_questions`
      );
      setQuestionsResult(res.data);
    } catch (err) {
      setQuestionsError(err.response?.data?.error || "Failed to fetch questions.");
    } finally {
      setQuestionsLoading(false);
    }
  };

  const handleConcepts = async () => {
    setConceptsLoading(true);
    setConceptsError("");
    setConceptsResult(null);
    try {
      const res = await axios.post(
        `${process.env.VITE_URL}/generate_concepts`
      );
      setConceptsResult(res.data);
    } catch (err) {
      setConceptsError(err.response?.data?.error || "Failed to fetch concepts.");
    } finally {
      setConceptsLoading(false);
    }
  };

  const sendFilesAndQuestion = async () => {
    const formData = new FormData();
    formData.append("question", input);
    formData.append("persona", role.label);
    uploadedFiles.forEach(file => formData.append("docs", file));

    setQueryLoading(true);
    setQueryError("");
    setQueryResult(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/query`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setQueryResult(res.data);

      // Store YouTube URLs and thumbnails in state
      if (res.data && Array.isArray(res.data.recommendations)) {
        const recommendations = res.data.recommendations.map(rec => ({
          url: `https://www.youtube.com/watch?v=${rec.video_id}`,
          thumbnail: rec.thumbnail_url,
        }));
        setYtRecommendations(recommendations);
      } else {
        setYtRecommendations([]);
      }
    } catch (err) {
      setQueryError(err.response?.data?.error || "Failed to fetch query results.");
      setYtRecommendations([]);
    } finally {
      setQueryLoading(false);
    }
  };

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
    sendFilesAndQuestion();
  };

  useEffect(() => {
    if (reset) {
      setInput("");
      setInputWarning("");
      setConceptsResult(null);
      setConceptsError("");
      setQueryResult(null);
      setQueryError("");
      setQuestionsResult(null);
      setQuestionsError("");
      setShowAdditionalInfo(false);
      setYtRecommendations([]); // Clear YouTube recommendations

      // Reset the reset flag in parent
      if (setReset) setReset(false);
    }
  }, [reset]);

  return (
    <div className="flex flex-col items-center justify-start px-2 sm:px-4 md:px-8 pt-8 sm:pt-12 w-full h-full text-text bg-background overflow-x-hidden">
      {/* Theme Toggle Button */}
      <button
        className={`fixed top-4 right-4 sm:right-6 px-3 sm:px-4 py-2 rounded-full transition flex items-center gap-2 z-20 text-xs sm:text-base ${theme === "dark"
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
        <h1 className="text-3xl sm:text-5xl md:text-[58px] font-heading font-bold text-accent flex justify-center items-center gap-2">
          <div className="p-2 sm:p-4">
            <img src={brainIcon} alt="Brain Icon" className="h-12 sm:h-[80px]" />
          </div>
          DocDynamo
        </h1>
        <p className="mt-3 sm:mt-5 mb-4 sm:mb-8 text-base sm:text-lg font-heading font-semibold">
          AI-Powered Document Intelligence
        </p>
      </div>
      {/* Query Result */}
      {queryLoading && (
        <div className="mt-4 text-accent font-heading font-semibold">Fetching response...</div>
      )}
      {queryError && (
        <div className="mt-4 text-red-500 font-heading font-semibold">{queryError}</div>
      )}
      {queryResult && (
        <div ref={queryRef} className="mt-4 bg-transparent text-text rounded-lg p-6 w-full max-w-4xl shadow font-heading">
          <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
            <span className="text-2xl pt-1"><img src={response} alt="Response" className="h-8 w-8" /></span> Response
          </h3>
          <div className="text-sm text-text-300 leading-relaxed whitespace-pre-line">
            {typeof queryResult === "string"
              ? queryResult.split("\n").map((line, idx) => <p key={idx}>{line}</p>)
              : queryResult?.response?.split("\n").map((line, idx) => <p key={idx}>{line}</p>)}
          </div>
        </div>
      )}
      {/* Add-On Result */}
      {showAdditionalInfo && queryResult?.additional_info && (
        <div ref={addonRef} className="mt-4 bg-transparent text-text rounded-lg p-6 w-full max-w-4xl shadow font-heading">
          <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
            <span className="text-2xl"><img src={addOnInfo} alt="Add-on Info" className="h-8 w-8" /></span> Add-on Info
          </h3>
          <div className="text-sm text-text-300 leading-relaxed whitespace-pre-line">
            {queryResult.additional_info.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      )}
      {/* Concepts Result */}
      {conceptsLoading && (
        <div className="mt-4 text-accent font-heading font-semibold">Loading concepts...</div>
      )}
      {conceptsError && (
        <div className="mt-4 text-red-500 font-heading font-semibold">{conceptsError}</div>
      )}
      {conceptsResult && Array.isArray(conceptsResult.concepts) && (
        <div ref={conceptsRef} className="mt-4 bg-transparent text-text rounded-lg p-6 w-full max-w-4xl shadow font-heading">
          <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
            <span className="text-2xl"><img src={keyConcepts} alt="Key Concepts" className="h-8 w-8" /></span> Key Concepts
          </h3>
          <ul className="space-y-4 text-sm text-text-300 leading-relaxed">
            {conceptsResult.concepts.map((item, index) => {
              const cleaned = item.replace(/\*\*/g, '');
              const split = cleaned.split(':');
              const title = split[0]?.trim() || `Concept ${index + 1}`;
              const description = split.slice(1).join(':').trim();

              return (
                <li key={index}>
                  <span className="font-bold text-text">{title}</span>: {description}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* Questions Result */}
      {questionsLoading && (
        <div className="mt-4 text-accent font-heading font-semibold">Loading questions...</div>
      )}
      {questionsError && (
        <div className="mt-4 text-red-500 font-heading font-semibold">{questionsError}</div>
      )}
      {questionsResult && Array.isArray(questionsResult.questions) && questionsResult.questions.length > 0 && (
        <div ref={questionsRef} className="mt-4 bg-transparent text-text rounded-lg p-6 w-full max-w-4xl shadow font-heading">
          <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
            <span className="text-2xl"><img src={generatedQuestions} alt="Generated Questions" className="h-8 w-8" /></span> Generated Questions
          </h3>
          <div className="space-y-4 text-sm text-text-300 leading-relaxed">
            {(() => {
              // Group questions and answers together
              const items = questionsResult.questions;
              const grouped = [];
              let currentQ = null;
              items.forEach((item) => {
                if (/^Q\d+[:：]/i.test(item.trim())) {
                  if (currentQ) grouped.push(currentQ);
                  currentQ = { question: item.trim(), answer: null };
                } else if (/^Answer[:：]/i.test(item.trim())) {
                  if (currentQ) currentQ.answer = item.trim();
                } else {
                  // For intro or any other lines
                  if (currentQ) grouped.push(currentQ);
                  grouped.push({ info: item.trim() });
                  currentQ = null;
                }
              });
              if (currentQ) grouped.push(currentQ);

              return grouped.map((entry, idx) => {
                if (entry.info) {
                  return (
                    <div key={idx} className="mb-2">
                      {entry.info}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="mb-3">
                    <div>
                      <span className="font-bold text-text">{entry.question.replace(/^Q(\d+)([:：])/, 'Question $1:')}</span>
                    </div>
                    {entry.answer && (
                      <div className="ml-mt-1">{entry.answer}</div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}
      {/* Input Row */}
      <div className="flex flex-col sm:flex-row items-stretch bg-[#1f1f2e] rounded-2xl px-3 sm:px-6 py-2 mt-6 sm:mt-10 w-full max-w-lg sm:max-w-2xl md:max-w-4xl shadow border border-gray-700 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setInputWarning("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask anything about your documents..."
          className="bg-transparent flex-1 outline-none text-white placeholder-gray-500 py-2 px-2 sm:px-0 text-sm sm:text-base"
        />
        {/* Warning appears above the input */}
        {inputWarning && (
          <div className="absolute left-3 sm:left-6 -top-10 flex items-center gap-2 bg-red-500/90 text-white text-xs px-3 py-1 rounded shadow animate-fade-in-down z-20">
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
              onClick={() => {
                setInputWarning("");
              }}
              tabIndex={-1}
              type="button"
            >
              &times;
            </button>
          </div>
        )}
        <div className="mx-0 sm:mx-2 my-2 sm:my-0 relative flex items-center justify-center">
          <RoleSelector selectedRole={role} onChange={setRole} />
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full flex-shrink-0 self-end sm:self-auto"
          onClick={handleSend}
        >
          <IoIosSend size={20} />
        </button>
      </div>

      {/* Button Row */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 relative font-heading font-semibold w-full max-w-lg sm:max-w-2xl md:max-w-4xl">
        {[
          {
            svg: <img src={questions} alt="Questions Icon" className="h-6 w-6 sm:h-7 sm:w-7" />,
            icon: "Questions",
            tooltip: "Ask AI generated questions about your document",
            onClick: handleQuestions,
          },
          {
            svg: <img src={concepts} alt="Concepts Icon" className="h-5 w-5" />,
            icon: "Concepts",
            tooltip: "Extract key concepts from your documents",
            onClick: handleConcepts,
          },
          {
            svg: <img src={info} alt="Info Icon" className="h-6 w-7" />,
            icon: "Add-on Info",
            tooltip: "Get additional information & insights",
            onClick: () => setShowAdditionalInfo(!showAdditionalInfo),
          },
          {
            svg: <img src={mindmap} alt="Mindmap Icon" className="h-8 w-9" />,
            icon: "Mindmap",
            tooltip: "Visualize document as a mindmap",
            onClick: undefined,
          },
        ].map((btn, idx) => (
          <button
            key={idx}
            className="relative group bg-[#2b2b40] hover:bg-[#3c3c56] text-white px-5 sm:px-8 py-2 rounded-full transition flex items-center gap-2 text-xs sm:text-base"
            onMouseMove={(e) => handleMouseMove(e, btn.tooltip)}
            onMouseLeave={handleMouseLeave}
            onClick={btn.onClick}
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

      {/* YouTube Recommendations */}
      {ytRecommendations.length > 0 && (
        <div className="w-full max-w-4xl mt-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-text">
            <span role="img" aria-label="video" className="text-2xl pt-1">
              <img src={relatedVideos} alt="Related Videos" className="h-8 w-8" />
            </span>
            Related Videos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ytRecommendations.map((rec, idx) => (
              <a
                key={idx}
                href={rec.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden shadow-lg bg-[#181824] hover:scale-[1.03] transition-transform duration-200"
              >
                <img
                  src={rec.thumbnail}
                  alt={`YouTube video ${idx + 1}`}
                  className="w-full h-40 object-cover group-hover:brightness-90 transition"
                />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 flex items-center justify-center shadow-lg">
                  <svg height="45px" width="30px" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon fill="#FFFFFF" points="187.368,146.928 187.368,355.8 382.992,251.368" />
                    <path fill="#602dd7" d="M256,0.376C114.616,0.376,0,114.824,0,256s114.616,255.624,256,255.624S512,397.176,512,256 S397.384,0.376,256,0.376z M184.496,146.928l195.624,104.44L184.496,355.8V146.928z" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}