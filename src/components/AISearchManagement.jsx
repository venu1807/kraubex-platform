import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Send,
  X,
  Paperclip,
  File,
  Database,
  Image,
  Search,
  MessageCircle,
  Sparkles,
  Trash2,
  Globe,
  Menu,
} from "lucide-react";
import KraubexLogo from "../assets/kraubex-logo.png";

const COLORS = {
  primary: "#c04000",
  background: "#efeee7",
  text: "#1e1e1e",
  orange: "#c04000",
};


export default function AgentChatArea() {
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [chats, setChats] = useState([
    { id: 1, name: "Chat with KraubexAI", messages: [] },
    { id: 2, name: "Supplier Data Query", messages: [] },
  ]);

  // positioning/size
  const [position, setPosition] = useState({ x: 100, y: 80 });
  const [size, setSize] = useState({ width: 850, height: 900 });

  // drag / resize state
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizingRef = useRef(false);
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeChatId, setActiveChatId] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  const prePrompts = [
    "Find steel suppliers in Germany",
    "Who offers lowest price for copper?",
    "Top ERP integrations for MSMEs",
    "Audit supplier compliance",
  ];

  // scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, activeChatId]);

  // pointer move/up handlers attached once
  useEffect(() => {
    const onPointerMove = (e) => {
      if (draggingRef.current) {
        // move window according to pointer position minus offset
        setPosition((prev) => {
          const newX = e.clientX - dragOffsetRef.current.x;
          const newY = e.clientY - dragOffsetRef.current.y;
          return { x: newX, y: newY };
        });
      } else if (resizingRef.current) {
        const dx = e.clientX - resizeStartRef.current.x;
        const dy = e.clientY - resizeStartRef.current.y;
        const newW = Math.max(800, resizeStartRef.current.width + dx);
        const newH = Math.max(600, resizeStartRef.current.height + dy);
        setSize({ width: newW, height: newH });
      }
    };

    const onPointerUp = () => {
      if (draggingRef.current) {
        draggingRef.current = false;
        document.body.style.userSelect = "";
      }
      if (resizingRef.current) {
        resizingRef.current = false;
        document.body.style.userSelect = "";
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.style.userSelect = "";
    };
  }, []);

  // helper to decide if a target should NOT start dragging
  const isInteractiveElement = (target) => {
    if (!target) return false;
    // If the clicked element is inside any of these tags or has attribute data-no-drag
    return !!target.closest(
      "input, textarea, button, a, svg, path, .no-drag, .cursor-text, .react-datepicker, .dropdown"
    );
  };

  // start dragging from anywhere except interactive elements
  const handlePointerDownStartDrag = (e) => {
    // only primary button (left-click / main pointer)
    if (e.button && e.button !== 0) return;

    // If user clicked on interactive control, don't start drag
    if (isInteractiveElement(e.target)) return;

    // If currently maximized, don't start a drag (optional)
    if (isMaximized) return;

    draggingRef.current = true;
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    // avoid text selection during drag
    document.body.style.userSelect = "none";
  };

  // resize start (bottom-right corner)
  const handleResizeStart = (e) => {
    e.stopPropagation();
    resizingRef.current = true;
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
    document.body.style.userSelect = "none";
  };

  const handleAskAI = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, from: "user" };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: `Based on your query "${userMessage.text}", I've analyzed our supplier database. Here are some relevant insights and recommendations tailored to your needs.`,
        from: "ai",
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      setIsTyping(false);
    }, 1200);
  };

  const handleDeleteChat = (id) => {
    const updated = chats.filter((chat) => chat.id !== id);
    setChats(updated);
    if (activeChatId === id && updated.length > 0) {
      setActiveChatId(updated[0].id);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeChat = chats.find((c) => c.id === activeChatId);

  if (!isVisible) return null;

  return (
    <div
      // root window: flex column so header stays fixed and middle area is flexible
      className={`fixed shadow-2xl transition-all duration-200 ${
        isMaximized ? "top-0 left-0 w-screen h-screen rounded-none" : "rounded-xl"
      }`}
      style={{
        display: "flex",
        flexDirection: "column",
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        width: isMaximized ? "100vw" : isMinimized ? 500 : size.width,
        height: isMaximized ? "100vh" : isMinimized ? 300 : size.height,
        zIndex: 9999,
        backgroundColor: COLORS.background,
        overflow: "hidden",
        cursor: draggingRef.current ? "grabbing" : "default",
        border: "2px solid #c04000",
      }}
      // start pointer-down drag from anywhere on the root (except interactive elements)
      onPointerDown={handlePointerDownStartDrag}
    >
      {/* HEADER */}
      <div
        className="flex items-center justify-between px-4 py-3 select-none"
        style={{
          backgroundColor: COLORS.background,
          borderBottom: `4px solid ${COLORS.primary}`,
          borderRadius: "12px 12px 0 0",
          cursor: "grab",
        }}
        // keep header clicks from starting interactive actions
        onPointerDown={(e) => {
          // allow drag start from header always, but still ignore interactive targets inside header
          if (isInteractiveElement(e.target)) return;
          // don't duplicate logic — root handles it as well; this keeps header responsive
        }}
      >
        <span className="font-semibold flex items-center gap-2" style={{ color: COLORS.text }}>
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{
              background: `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.orange})`,
            }}
          >
            <img src={KraubexLogo} alt="Kraubex Logo" className="w-32 h-auto" />
          </div>
          KraubexAI
        </span>

        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen((s) => !s);
            }}
            title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            className="w-8 h-8 flex items-center justify-center rounded transition-colors no-drag"
            style={{ color: COLORS.text }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d9d8d0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Minimize: toggle minimize, ensure maximize off */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized((prev) => !prev);
              setIsMaximized(false);
            }}
            title="Minimize"
            className="w-8 h-8 flex items-center justify-center rounded transition-colors no-drag"
            style={{ color: COLORS.text }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d9d8d0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <div className="w-3 h-0.5 bg-current rounded"></div>
          </button>

          {/* Maximize: toggle maximize, ensure minimize off */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized((prev) => !prev);
              setIsMinimized(false);
            }}
            title="Maximize"
            className="w-8 h-8 flex items-center justify-center rounded transition-colors no-drag"
            style={{ color: COLORS.text }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d9d8d0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <div className="w-3 h-3 border border-current rounded-sm"></div>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            title="Close"
            className="w-8 h-8 flex items-center justify-center rounded transition-colors no-drag"
            style={{ color: COLORS.text }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d9d8d0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MAIN: sidebar + chat area */}
      {!isMinimized && (
        <div className="flex-1 flex relative overflow-hidden">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "w-64 p-4 opacity-100" : "w-0 p-0 opacity-0"
            } border-r border-gray-300 flex flex-col overflow-hidden`}
            style={{ backgroundColor: "#e8e7df" }}
          >
            <div className="flex flex-col gap-3 mb-4">
              <button
                onClick={() => {
                  const newChat = { id: Date.now(), name: `New Chat`, messages: [] };
                  setChats((prev) => [newChat, ...prev]);
                  setActiveChatId(newChat.id);
                }}
                className="w-full border rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 no-drag"
                style={{
                  backgroundColor: COLORS.background,
                  borderColor: COLORS.primary,
                  color: COLORS.text,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d9d8d0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.background)}
              >
                <Plus className="w-4 h-4" />
                New chat
              </button>

              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                  style={{ color: "#6b6b6b" }}
                />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: COLORS.background,
                    color: COLORS.text,
                  }}
                  onPointerDown={(e) => e.stopPropagation()} // interactive -> prevent drag
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className="group flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition-colors"
                  style={{
                    backgroundColor: chat.id === activeChatId ? "#d9d8d0" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (chat.id !== activeChatId) e.currentTarget.style.backgroundColor = "#dddcd3";
                  }}
                  onMouseLeave={(e) => {
                    if (chat.id !== activeChatId) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MessageCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#6b6b6b" }} />
                    <span className="text-sm truncate" style={{ color: COLORS.text }}>
                      {chat.name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity no-drag"
                    style={{ color: "#6b6b6b" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d9d8d0")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    title="Delete Chat"
                  >
                    <Trash2 className="w-4 h-4 text-red-700" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: COLORS.background }}>
            <div className="px-6 py-4 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.orange})` }}
                >
                  <img src={KraubexLogo} alt="Kraubex Logo" className="w-32 h-auto" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: COLORS.text }}>
                    KraubexAI
                  </h3>
                  <p className="text-xs" style={{ color: "#6b6b6b" }}>
                    Your Smart Procurement Specialist
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 pb-32">
              {activeChat?.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(to bottom right, rgba(192, 64, 0, 0.1), rgba(192, 64, 0, 0.2))`,
                    }}
                  >
                    <img src={KraubexLogo} alt="Kraubex Logo" className="w-32 h-auto" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2" style={{ color: COLORS.text }}>
                    How can I help you today?
                  </h2>
                  <p className="mb-6 max-w-md" style={{ color: "#6b6b6b" }}>
                    I can help you find suppliers, analyze data, check compliance, and more.
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-2xl w-full">
                    {prePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(prompt)}
                        className="p-4 border border-gray-300 rounded-xl text-left transition-colors group no-drag"
                        style={{ backgroundColor: "#e8e7df" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d9d8d0")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e8e7df")}
                      >
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: COLORS.primary }} />
                          <span className="text-sm group-hover:opacity-90" style={{ color: COLORS.text }}>
                            {prompt}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 max-w-3xl mx-auto">
                  {activeChat?.messages.map((msg) => (
                      <div key={msg.id} className="flex gap-4">
                        {msg.from === "ai" && (
                          <div
                            className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                            style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.orange})` }}
                          >
                            <img src={KraubexLogo} alt="Kraubex Logo" className="w-32 h-auto" />
                          </div>
                        )}
                        <div
                          className={`flex-1 no-drag ${msg.from === "user" ? "ml-auto max-w-xl" : ""}`}
                          style={{
                            backgroundColor: msg.from === "user" ? "#e8e7df" : "transparent",
                            userSelect: "text", // ✅ allow selection
                            cursor: "text",      // ✅ show text cursor
                            borderRadius: msg.from === "user" ? "1rem" : "0",
                            padding: msg.from === "user" ? "0.75rem 1rem" : "0",
                          }}
                        >
                          <p style={{ color: COLORS.text, margin: 0 }}>{msg.text}</p>
                        </div>
                        {msg.from === "user" && (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                            style={{ backgroundColor: COLORS.primary }}
                          >
                            U
                          </div>
                        )}
                      </div>
                    ))}


                  {isTyping && (
                    <div className="flex gap-4">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.orange})` }}
                      >
                        <img src={KraubexLogo} alt="Kraubex Logo" className="w-32 h-auto" />
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-1 items-center">
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#6b6b6b", animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#6b6b6b", animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#6b6b6b", animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef}></div>
                </div>
              )}
            </div>

            {/* Input area - fixed at bottom inside the component */}
            <div className="border-t border-gray-300 p-4" style={{ backgroundColor: COLORS.background }}>
              <div className="max-w-3xl mx-auto">
                <div className="rounded-xl border border-gray-300 transition-all" style={{ backgroundColor: COLORS.background }}>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAskAI();
                      }
                    }}
                    placeholder="Ask me anything about suppliers, compliance, pricing..."
                    className="w-full outline-none resize-none rounded-xl px-4 py-3 min-h-[60px] max-h-[200px]"
                    style={{
                      backgroundColor: COLORS.background,
                      color: COLORS.text,
                    }}
                    rows={1}
                    // stop pointer from starting drag when interacting with textarea
                    onPointerDown={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />

                  <div className="flex items-center justify-between px-4 pb-3">
                    <div className="flex items-center gap-1">
                      {[Paperclip, Image, File, Database, Globe].map((Icon, idx) => (
                        <button
                          key={idx}
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors no-drag"
                          style={{ color: "#6b6b6b" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = COLORS.orange;
                            e.currentTarget.style.backgroundColor = "#d9d8d0";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#6b6b6b";
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                          title={`Add ${Icon.name}`}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleAskAI}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 no-drag"
                      style={{
                        backgroundColor: input.trim() ? COLORS.primary : "#d9d8d0",
                        color: input.trim() ? "white" : "#9b9b9b",
                        cursor: input.trim() ? "pointer" : "not-allowed",
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>

                <p className="text-xs text-center mt-2" style={{ color: "#9b9b9b" }}>
                  © {new Date().getFullYear()} KraubexAI
                </p>
              </div>
            </div>
          </div>

          {/* resize handle bottom-right */}
          {!isMaximized && (
            <div
              onPointerDown={handleResizeStart}
              className="absolute w-4 h-4 bottom-0 right-0 cursor-se-resize rounded-tl-sm transition-colors no-drag"
              style={{ backgroundColor: "#c9c8bf" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b0afa5")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c9c8bf")}
            />
          )}
        </div>
      )}
    </div>
  );
}
