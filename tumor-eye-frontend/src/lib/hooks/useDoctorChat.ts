import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { INITIAL_QUESTION, INITIAL_RESPONSE, getSimulatedResponse } from "@/lib/utils/chatSimulator";

type ChatMessage = { role: "user" | "assistant"; text: string };
type LocationState = { imageUrl?: string; imageFilter?: string };

export function useDoctorChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const state = location.state as LocationState | null;
  const storedImageUrl = sessionStorage.getItem("doctorChatImageUrl");
  const storedImageFilter = sessionStorage.getItem("doctorChatImageFilter");

  const previewImageUrl =
    state?.imageUrl && state.imageUrl.startsWith("data:") ? state.imageUrl : storedImageUrl;
  const previewImageFilter = state?.imageFilter || storedImageFilter || "none";

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sidebarTextColor = isDark ? "#1c2b2e" : "#d9e3e0";
  const mainTextColor = isDark ? "rgba(255,255,255,0.82)" : "#1c2b2e";
  const mutedTextColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(28,43,46,0.62)";
  const inputTextColor = isDark ? "rgba(255,255,255,0.85)" : "#1c2b2e";
  const inputBorderColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(28,43,46,0.25)";

  useEffect(() => {
    const sendTimer = window.setTimeout(() => {
      setMessages([{ role: "user", text: INITIAL_QUESTION }]);
      setIsTyping(true);
    }, 500);
    const responseTimer = window.setTimeout(() => {
      setMessages([
        { role: "user", text: INITIAL_QUESTION },
        { role: "assistant", text: INITIAL_RESPONSE },
      ]);
      setIsTyping(false);
    }, 1800);
    return () => { window.clearTimeout(sendTimer); window.clearTimeout(responseTimer); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  function handleSend() {
    const trimmed = question.trim();
    if (!trimmed || isTyping) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setQuestion("");
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: getSimulatedResponse(trimmed) }]);
      setIsTyping(false);
    }, 950);
  }

  function handleBackToResults() {
    navigate("/doctor/upload", { state: { openResult: true } });
  }

  return {
    isDark, toggleTheme,
    previewImageUrl, previewImageFilter,
    question, setQuestion,
    messages, isTyping, messagesEndRef,
    sidebarTextColor, mainTextColor, mutedTextColor, inputTextColor, inputBorderColor,
    handleSend, handleBackToResults,
  };
}
