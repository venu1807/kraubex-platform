import { useState, useRef } from "react";
import AISearchManagement from "./AISearchManagement";
import { X } from "lucide-react";

export default function MovableAIChat({ dashboardData, onClose }) {  // ✅ added onClose prop
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [size, setSize] = useState({ width: 1000, height: 700 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState(null);
  const chatRef = useRef(null);

  // --- Drag Logic ---
  const handleMouseDownDrag = (e) => {
    setIsDragging(true);
    setDragOffset({ x: e.clientX - position.left, y: e.clientY - position.top });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        left: e.clientX - dragOffset.x,
        top: e.clientY - dragOffset.y,
      });
    } else if (isResizing) {
      const dx = e.clientX - chatRef.current.startX;
      const dy = e.clientY - chatRef.current.startY;
      const newSize = { ...size };

      if (resizeDir.includes("right")) newSize.width = chatRef.current.startWidth + dx;
      if (resizeDir.includes("bottom")) newSize.height = chatRef.current.startHeight + dy;
      if (resizeDir.includes("left")) {
        newSize.width = chatRef.current.startWidth - dx;
        setPosition((prev) => ({ ...prev, left: chatRef.current.startLeft + dx }));
      }
      if (resizeDir.includes("top")) {
        newSize.height = chatRef.current.startHeight - dy;
        setPosition((prev) => ({ ...prev, top: chatRef.current.startTop + dy }));
      }

      setSize({
        width: Math.max(newSize.width, 800),
        height: Math.max(newSize.height, 400),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // --- Resize Logic ---
  const handleMouseDownResize = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDir(direction);
    chatRef.current.startX = e.clientX;
    chatRef.current.startY = e.clientY;
    chatRef.current.startWidth = size.width;
    chatRef.current.startHeight = size.height;
    chatRef.current.startLeft = position.left;
    chatRef.current.startTop = position.top;
  };

  return (
    <div
      ref={chatRef}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
        zIndex: 1000,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="bg-white border border-gray-300 shadow-2xl rounded-lg overflow-hidden resize"
    >
      {/* Header for Dragging */}
      <div
        onMouseDown={handleMouseDownDrag}
        className="flex justify-between items-center bg-blue-600 text-white p-3 cursor-grab select-none"
      >
        <span className="font-semibold block w-full text-center">Welcome to KraubexAI </span>
        <button
          onMouseDown={(e) => e.stopPropagation()}      // prevent drag stealing the click
          onClick={() => {
            console.log("MovableAIChat: close clicked");
            if (onClose) onClose();
          }}
          className="hover:text-gray-300"
          >
          <X className="w-5 h-5" />
        </button>

      </div>

      {/* Main Content */}
      <div className="p-4 overflow-auto h-[calc(100%-48px)]">
        <AISearchManagement dashboardData={dashboardData} />
      </div>

      {/* Resize Handles */}
      {[
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ].map((dir) => (
        <div
          key={dir}
          onMouseDown={(e) => handleMouseDownResize(e, dir)}
          className={`absolute ${
            dir.includes("top") ? "top-0" : dir.includes("bottom") ? "bottom-0" : ""
          } ${
            dir.includes("left") ? "left-0" : dir.includes("right") ? "right-0" : ""
          } ${
            dir.includes("-")
              ? "w-3 h-3"
              : dir === "left" || dir === "right"
              ? "w-2 top-0 h-full cursor-ew-resize"
              : "h-2 left-0 w-full cursor-ns-resize"
          } bg-transparent ${
            dir.includes("-") ? "cursor-se-resize" : ""
          }`}
          style={{
            cursor:
              dir === "left" || dir === "right"
                ? "ew-resize"
                : dir === "top" || dir === "bottom"
                ? "ns-resize"
                : dir.includes("left")
                ? "nwse-resize"
                : "nesw-resize",
          }}
        ></div>
      ))}
    </div>
  );
}
