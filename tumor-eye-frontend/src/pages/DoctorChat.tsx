import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type LocationState = {
  imageUrl?: string;
  imageFilter?: string;
};

const INITIAL_QUESTION =
  "Describe this result in detail from a radiology perspective";

const INITIAL_RESPONSE =
  "The MRI demonstrates a focal abnormal area in the superior cerebral hemisphere, highlighted by the detection box. The region shows altered signal intensity compared with the surrounding brain tissue and is classified by the AI model as a possible tumor with 84% confidence. The finding appears localized on this sagittal image, without obvious large mass effect on the visible slice. This AI-assisted result should be reviewed by a qualified radiologist and does not constitute a medical diagnosis.";

export default function DoctorChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const state = location.state as LocationState | null;

  const storedImageUrl = sessionStorage.getItem("doctorChatImageUrl");
  const storedImageFilter = sessionStorage.getItem("doctorChatImageFilter");

  const previewImageUrl =
    state?.imageUrl && state.imageUrl.startsWith("data:")
      ? state.imageUrl
      : storedImageUrl;

  const previewImageFilter = state?.imageFilter || storedImageFilter || "none";

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sidebarTextColor = isDark ? "#1c2b2e" : "#d9e3e0";
  const mainTextColor = isDark ? "rgba(255,255,255,0.82)" : "#1c2b2e";
  const mutedTextColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(28,43,46,0.62)";
  const inputTextColor = isDark ? "rgba(255,255,255,0.85)" : "#1c2b2e";
  const inputBorderColor = isDark
    ? "rgba(255,255,255,0.25)"
    : "rgba(28,43,46,0.25)";

  useEffect(() => {
    const sendTimer = window.setTimeout(() => {
      setMessages([
        {
          role: "user",
          text: INITIAL_QUESTION,
        },
      ]);

      setIsTyping(true);
    }, 500);

    const responseTimer = window.setTimeout(() => {
      setMessages([
        {
          role: "user",
          text: INITIAL_QUESTION,
        },
        {
          role: "assistant",
          text: INITIAL_RESPONSE,
        },
      ]);

      setIsTyping(false);
    }, 1800);

    return () => {
      window.clearTimeout(sendTimer);
      window.clearTimeout(responseTimer);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping]);

  function getSimulatedResponse(userQuestion: string) {
    const normalized = userQuestion.toLowerCase();

    if (
      normalized.includes("green") ||
      normalized.includes("label") ||
      normalized.includes("box") ||
      normalized.includes("highlight") ||
      normalized.includes("marker")
    ) {
      return "The green label marks the AI-detected suspicious region. In this simulation, the highlighted area is classified as a possible tumor with 84.2% confidence. The green box does not confirm diagnosis; it only indicates the region that should be reviewed carefully by a qualified clinician.";
    }

    if (
      normalized.includes("confidence") ||
      normalized.includes("certainty") ||
      normalized.includes("84") ||
      normalized.includes("score") ||
      normalized.includes("percentage") ||
      normalized.includes("probability")
    ) {
      return "The confidence value represents how strongly the AI model associates the highlighted region with the selected finding. A confidence of 84.2% suggests a relatively strong model prediction, but it should not be interpreted as clinical certainty. The result still requires professional radiological review.";
    }

    if (
      normalized.includes("tumor") ||
      normalized.includes("cancer") ||
      normalized.includes("malignant") ||
      normalized.includes("benign") ||
      normalized.includes("mass") ||
      normalized.includes("lesion")
    ) {
      return "The highlighted area may correspond to an abnormal region detected by the AI model. However, this interface cannot determine whether the finding is malignant, benign, inflammatory, post-treatment related, or an artifact. A complete MRI study and clinical history would be required for proper interpretation.";
    }

    if (
      normalized.includes("danger") ||
      normalized.includes("dangerous") ||
      normalized.includes("serious") ||
      normalized.includes("emergency") ||
      normalized.includes("urgent") ||
      normalized.includes("critical")
    ) {
      return "This result should be treated as a finding that needs medical review, not as an emergency diagnosis from the AI system. The safest interpretation is that the highlighted region requires confirmation by a radiologist, especially using the full MRI sequence and patient history.";
    }

    if (
      normalized.includes("next") ||
      normalized.includes("follow") ||
      normalized.includes("follow-up") ||
      normalized.includes("recommend") ||
      normalized.includes("what now") ||
      normalized.includes("next step") ||
      normalized.includes("management")
    ) {
      return "A reasonable next step would be to review the highlighted region across the full MRI series, compare it with previous scans if available, and correlate it with clinical symptoms. The AI output should be documented as supportive information, not as the final radiology conclusion.";
    }

    if (
      normalized.includes("artifact") ||
      normalized.includes("artefact") ||
      normalized.includes("error") ||
      normalized.includes("mistake") ||
      normalized.includes("false positive") ||
      normalized.includes("false")
    ) {
      return "Yes, a false positive is possible. MRI artifacts, image noise, motion, partial volume effects, or normal anatomical structures can sometimes be highlighted by AI models. This is why the result should be validated against the full scan by a qualified radiologist.";
    }

    if (
      normalized.includes("diagnosis") ||
      normalized.includes("diagnose") ||
      normalized.includes("final result") ||
      normalized.includes("is this a diagnosis")
    ) {
      return "This AI-assisted response should not be considered a final diagnosis. It is intended to support review by pointing to a suspicious region, but the final interpretation must be made by a qualified medical professional using the full imaging study and clinical context.";
    }

    if (
      normalized.includes("mri") ||
      normalized.includes("scan") ||
      normalized.includes("image") ||
      normalized.includes("slice")
    ) {
      return "The scan preview shows a highlighted region selected by the AI system for closer review. The visible slice suggests a localized abnormal signal area, but a complete assessment would require reviewing the full MRI sequence, imaging planes, and patient history.";
    }

    if (
      normalized.includes("where") ||
      normalized.includes("location") ||
      normalized.includes("located") ||
      normalized.includes("area") ||
      normalized.includes("region")
    ) {
      return "The suspicious region is shown in the upper part of the visible cerebral hemisphere on this sagittal MRI slice. Because this is only one displayed image, the exact anatomical location should be confirmed by reviewing the full MRI study in multiple planes.";
    }

    if (
      normalized.includes("accurate") ||
      normalized.includes("accuracy") ||
      normalized.includes("reliable") ||
      normalized.includes("trust") ||
      normalized.includes("correct")
    ) {
      return "The simulated AI result may help identify a region that deserves attention, but its accuracy cannot be guaranteed from this interface alone. AI detection should be treated as a support tool and verified by a qualified radiologist using the complete scan.";
    }

    if (
      normalized.includes("why") ||
      normalized.includes("why did") ||
      normalized.includes("why is") ||
      normalized.includes("what made")
    ) {
      return "The AI likely marked this region because its signal pattern differs from the surrounding brain tissue. In image-based tumor detection, features such as abnormal intensity, shape, texture, and contrast with nearby tissue may contribute to the model prediction.";
    }

    if (
      normalized.includes("symptom") ||
      normalized.includes("headache") ||
      normalized.includes("seizure") ||
      normalized.includes("vision") ||
      normalized.includes("nausea") ||
      normalized.includes("weakness")
    ) {
      return "Symptoms cannot be determined from the AI result alone. Brain lesions may be associated with symptoms such as headache, seizures, neurological weakness, visual changes, or no symptoms at all. Clinical history and medical examination are necessary for interpretation.";
    }

    if (
      normalized.includes("biopsy") ||
      normalized.includes("surgery") ||
      normalized.includes("operation") ||
      normalized.includes("remove")
    ) {
      return "This simulated AI result cannot determine whether biopsy or surgery is needed. Those decisions depend on the full MRI findings, lesion characteristics, patient symptoms, previous imaging, and specialist evaluation by neurology, neurosurgery, or oncology teams.";
    }

    if (
      normalized.includes("treatment") ||
      normalized.includes("therapy") ||
      normalized.includes("radiation") ||
      normalized.includes("chemo") ||
      normalized.includes("medication")
    ) {
      return "Treatment cannot be recommended from this simulated AI result. Management depends on the confirmed diagnosis, tumor type if present, location, size, symptoms, and overall clinical context. The role of this tool is only to support image review.";
    }

    if (
      normalized.includes("size") ||
      normalized.includes("large") ||
      normalized.includes("small") ||
      normalized.includes("measure") ||
      normalized.includes("dimension")
    ) {
      return "The displayed detection box gives an approximate visual region of interest, but it should not be used as a precise measurement. Accurate lesion size would require measurement on the original MRI images using radiology software and appropriate image scale.";
    }

    if (
      normalized.includes("contrast") ||
      normalized.includes("enhancement") ||
      normalized.includes("bright") ||
      normalized.includes("dark") ||
      normalized.includes("signal")
    ) {
      return "The highlighted region appears to have signal characteristics that differ from the surrounding tissue. On MRI, abnormal brightness or contrast may reflect many possibilities, including tumor, inflammation, vascular change, post-treatment effect, or artifact. The full sequence is needed for interpretation.";
    }

    if (
      normalized.includes("compare") ||
      normalized.includes("previous") ||
      normalized.includes("old scan") ||
      normalized.includes("earlier")
    ) {
      return "Comparison with previous MRI scans would be very helpful. If the region is new, growing, or changing in signal pattern, that may increase clinical significance. If it is stable over time, interpretation may be different. This comparison should be done by a radiologist.";
    }

    if (
      normalized.includes("report") ||
      normalized.includes("summary") ||
      normalized.includes("write") ||
      normalized.includes("radiology report")
    ) {
      return "Suggested report-style wording: AI-assisted review identifies one highlighted suspicious region in the visible cerebral hemisphere, classified as possible tumor with 84.2% confidence. This finding is preliminary and should be correlated with the complete MRI study and clinical context.";
    }

    if (
      normalized.includes("second opinion") ||
      normalized.includes("specialist") ||
      normalized.includes("doctor") ||
      normalized.includes("radiologist") ||
      normalized.includes("clinician")
    ) {
      return "A second opinion from a radiologist or relevant specialist would be appropriate if there is uncertainty. AI output should support clinical review, but the final assessment should come from a qualified medical professional.";
    }

    if (
      normalized.includes("normal") ||
      normalized.includes("abnormal") ||
      normalized.includes("healthy")
    ) {
      return "The AI system has marked one region as suspicious, so the scan should not be treated as automatically normal based on this preview. However, abnormality cannot be confirmed from the AI overlay alone. The full scan needs professional review.";
    }

    if (
      normalized.includes("risk") ||
      normalized.includes("risk level") ||
      normalized.includes("high risk") ||
      normalized.includes("low risk")
    ) {
      return "The confidence score does not directly equal clinical risk. Risk assessment depends on imaging features, lesion behavior, symptoms, patient history, and comparison with prior studies. This AI result only indicates that the highlighted area deserves review.";
    }

    if (
      normalized.includes("model") ||
      normalized.includes("ai") ||
      normalized.includes("algorithm") ||
      normalized.includes("how does it work")
    ) {
      return "The simulated AI model reviews visual image patterns and highlights regions that resemble abnormalities learned from training examples. It does not understand the patient’s full clinical situation and cannot replace professional interpretation.";
    }

    if (
      normalized.includes("limitations") ||
      normalized.includes("limit") ||
      normalized.includes("cannot") ||
      normalized.includes("weakness")
    ) {
      return "The main limitations are that the AI may miss findings, mark normal tissue as suspicious, and cannot use full clinical history unless provided. It also cannot replace multi-sequence MRI interpretation by a radiologist.";
    }

    if (
      normalized.includes("edema") ||
      normalized.includes("swelling") ||
      normalized.includes("mass effect") ||
      normalized.includes("pressure")
    ) {
      return "On this simulated preview, there is no clear large mass effect visible, but this cannot be assessed reliably from a single image. Evaluation for edema, swelling, or pressure effect requires the complete MRI series and radiologist interpretation.";
    }

    if (
      normalized.includes("student") ||
      normalized.includes("learn") ||
      normalized.includes("training") ||
      normalized.includes("education")
    ) {
      return "For learning purposes, this case can be used to practice identifying suspicious MRI regions, comparing AI predictions with visual findings, and understanding why AI outputs require clinical verification.";
    }

    if (
      normalized.includes("patient") ||
      normalized.includes("tell the patient") ||
      normalized.includes("explain to patient")
    ) {
      return "A patient-friendly explanation could be: the AI system found one area on the MRI that looks different from nearby tissue and should be reviewed by a radiologist. This does not mean a confirmed diagnosis, but it helps point doctors to a region that may need closer evaluation.";
    }

    if (
      normalized.includes("download") ||
      normalized.includes("pdf") ||
      normalized.includes("save")
    ) {
      return "You can save the result as a PDF from the results screen using the Save PDF button. The exported report should include the highlighted MRI preview, confidence value, and a note that the result is AI-assisted and not a final diagnosis.";
    }

    return "Based on the simulated AI review, the highlighted region should be considered a suspicious area requiring professional evaluation. The model can help draw attention to the region, but it cannot replace a full radiological interpretation or clinical diagnosis.";
  }

  function handleSend() {
    const trimmed = question.trim();

    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: trimmed,
      },
    ]);

    setQuestion("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: getSimulatedResponse(trimmed),
        },
      ]);

      setIsTyping(false);
    }, 950);
  }

  function handleBackToResults() {
    navigate("/doctor/upload", {
      state: {
        openResult: true,
      },
    });
  }

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      <aside
        className="
          min-h-screen shrink-0
          w-[360px]
          px-[50px] pt-[88px]
        "
        style={{
          backgroundColor: "var(--c-sidebar)",
          color: sidebarTextColor,
        }}
      >
        <h1 className="text-[30px] leading-tight font-extrabold">
          AI Radiology
          <br />
          Assistant
        </h1>

        <div
          className="w-[230px] h-px mt-[36px] mb-[28px]"
          style={{ backgroundColor: "var(--c-accent)" }}
        />

        <div className="text-[15px] font-extrabold leading-[1.45]">
          <p>Detected suspicious regions: 1</p>

          <p className="mt-[10px]">Region 1: tumor, confidence 84.2%</p>
        </div>

        <div
          className="
            relative
            w-[235px] h-[235px]
            mt-[26px]
            flex items-center justify-center
          "
          style={{ backgroundColor: "#000" }}
        >
          {previewImageUrl ? (
            <>
              <img
                src={previewImageUrl}
                alt="MRI result preview"
                className="w-full h-full object-contain"
                style={{ filter: previewImageFilter }}
              />

              <MiniDetectionBox />
            </>
          ) : (
            <span
              className="text-[14px] font-bold"
              style={{ color: "var(--c-accent)" }}
            >
              MRI result preview
            </span>
          )}
        </div>

        <p
          className="mt-[26px] text-[12px] font-bold leading-[1.45] max-w-[230px]"
          style={{ color: "var(--c-accent)" }}
        >
          Note: this result does not constitute a medical diagnosis.
        </p>
      </aside>

      <main className="flex-1 relative min-h-screen overflow-hidden">
        <div className="absolute top-0 right-0 z-10">
          <div
            className="
              w-[200px] h-[68px]
              rounded-bl-md
              flex items-center
              justify-center
              gap-[30px]
            "
            style={{ backgroundColor: "var(--c-panel)" }}
          >
            <button
              type="button"
              onClick={handleBackToResults}
              className="
                bg-transparent border-none cursor-pointer
                text-[14px] font-extrabold
                p-0 m-0
              "
              style={{ color: "var(--c-panel-text)" }}
            >
              ← Results
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="
                bg-transparent
                border-none
                cursor-pointer
                p-0 m-0
                outline-none
              "
              style={{ color: "var(--c-panel-text)" }}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        <section
          className="
            absolute
            left-[90px]
            right-0
            top-[118px]
            bottom-[36px]
            flex flex-col
          "
        >
          <div className="flex-1 overflow-y-auto pr-[70px] chat-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`
                  mb-[26px]
                  ${
                    message.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                `}
              >
                <div
                  className={`
                    max-w-[560px]
                    anim-chat-message
                    ${message.role === "user" ? "text-right" : "text-left"}
                  `}
                >
                  <p
                    className="
                      text-[9px]
                      tracking-[0.12em]
                      uppercase
                      font-extrabold
                      mb-[8px]
                    "
                    style={{
                      color:
                        message.role === "assistant"
                          ? mutedTextColor
                          : "var(--c-accent)",
                    }}
                  >
                    {message.role === "assistant" ? "AI RESPONSE" : "YOU"}
                  </p>

                  <p
                    className="
                      text-[13px]
                      leading-[1.35]
                      font-bold
                    "
                    style={{
                      color:
                        message.role === "assistant"
                          ? mainTextColor
                          : "var(--c-accent)",
                    }}
                  >
                    {message.text}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-[26px]">
                <div className="anim-chat-message">
                  <p
                    className="
                      text-[9px]
                      tracking-[0.12em]
                      uppercase
                      font-extrabold
                      mb-[8px]
                    "
                    style={{ color: mutedTextColor }}
                  >
                    AI RESPONSE
                  </p>

                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            className="
              h-[58px]
              border-t
              flex items-center
              gap-[18px]
              mr-[70px]
            "
            style={{
              borderColor: inputBorderColor,
            }}
          >
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Ask about this scan..."
              className="
                chat-input
                flex-1
                bg-transparent
                border-none
                outline-none
                text-[13px]
                font-bold
              "
              style={{
                color: inputTextColor,
              }}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={isTyping}
              className="
                bg-transparent
                border-none
                cursor-pointer
                text-[15px]
                font-extrabold
                disabled:opacity-40
              "
              style={{ color: "var(--c-accent)" }}
            >
              Send
            </button>
          </div>
        </section>

        <style>{`
          @keyframes chatMessageIn {
            0% {
              opacity: 0;
              transform: translateY(14px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes dotBounce {
            0%, 80%, 100% {
              transform: translateY(0);
              opacity: 0.35;
            }
            40% {
              transform: translateY(-5px);
              opacity: 1;
            }
          }

          .anim-chat-message {
            animation: chatMessageIn 0.42s ease-out both;
          }

          .typing-dot {
            animation: dotBounce 1.2s infinite ease-in-out;
          }

          .typing-dot:nth-child(2) {
            animation-delay: 0.16s;
          }

          .typing-dot:nth-child(3) {
            animation-delay: 0.32s;
          }

          .chat-input::placeholder {
            color: ${isDark ? "rgba(255,255,255,0.55)" : "rgba(28,43,46,0.55)"};
          }

          .chat-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #4a7c73 rgba(255, 255, 255, 0.04);
          }

          .chat-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .chat-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.04);
          }

          .chat-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4a7c73;
            border-radius: 999px;
          }

          .chat-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #5f9288;
          }
        `}</style>
      </main>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-[6px]">
      <span
        className="typing-dot w-[7px] h-[7px] rounded-full"
        style={{ backgroundColor: "var(--c-accent)" }}
      />
      <span
        className="typing-dot w-[7px] h-[7px] rounded-full"
        style={{ backgroundColor: "var(--c-accent)" }}
      />
      <span
        className="typing-dot w-[7px] h-[7px] rounded-full"
        style={{ backgroundColor: "var(--c-accent)" }}
      />
    </div>
  );
}

function MiniDetectionBox() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: "38.5%",
        top: "24.5%",
        width: "14%",
        height: "12.5%",
      }}
    >
      <div
        className="
          absolute left-0 bottom-full
          px-[4px] py-[1px]
          text-[7px] font-extrabold
          whitespace-nowrap
          leading-none
        "
        style={{
          backgroundColor: "#00ff38",
          color: "#102124",
        }}
      >
        tumor&nbsp;84%
      </div>

      <div
        className="w-full h-full"
        style={{
          border: "2px solid #00ff38",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}