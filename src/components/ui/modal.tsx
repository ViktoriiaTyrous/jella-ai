"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: 16,
          maxWidth: 480,
          width: "90%",
          padding: 24,
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "#636788",
            fontSize: 20,
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ✕
        </button>
        <h3
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: "#191e41",
            margin: "0 0 20px",
          }}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
