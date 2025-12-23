"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Toast({ message, onClose, duration = 3000 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-6 right-6 z-[100] animate-[slideIn_0.3s_ease-out_forwards]">
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div className="bg-[#0A0A0A] border border-[#2A2A2A] text-white px-5 py-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex items-center gap-3 min-w-[300px]">
        <div className="w-8 h-8 rounded-full bg-[#45D891]/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[#45D891] text-lg">
            check
          </span>
        </div>
        <p className="font-medium text-sm text-gray-200">{message}</p>
      </div>
    </div>,
    document.body
  );
}
