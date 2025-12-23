"use client";

import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BreakdownModalLayout({
  isOpen,
  onClose,
  title,
  icon,
  children,
  guideTitle,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-5xl bg-brand-surface rounded-[2rem] shadow-2xl p-6 md:p-10 relative border border-brand-surface-light/20 flex flex-col max-h-[95vh] overflow-hidden">
        {/* Close Button defined in HTML as absolute top-right, but here we can keep it or rely on Cancel */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-brand-text-muted hover:text-white hover:bg-brand-surface-light/10 transition-colors z-20">
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header (Shared) */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4 flex-shrink-0">
          {/* Identity */}
          <div className="w-12 h-12 rounded-full bg-brand-surface-light/10 flex items-center justify-center text-2xl font-bold text-gray-500 shadow-sm border border-white/5">
            P
          </div>

          {/* Stats Banner (Visual only for now matching HTML) */}
          <div className="bg-brand-surface-light/5 backdrop-blur-sm text-white rounded-xl p-4 shadow-lg w-full max-w-sm border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-brand-text-muted w-2/3 leading-tight">
                The more you complete the Less you'll Pay!
              </p>
              <div className="text-right">
                <span className="block text-xl font-bold text-white">$15</span>
                <span className="block text-[10px] uppercase tracking-wider text-brand-text-muted">
                  Saved
                </span>
              </div>
            </div>
            {/* Progress Bar Visual */}
            <div className="h-2 w-full bg-white/10 rounded-full flex gap-1 p-[2px]">
              <div className="h-full w-1/5 bg-brand-primary rounded-full"></div>
              <div className="h-full w-1/5 bg-brand-primary rounded-full"></div>
              <div className="h-full w-1/5 bg-white/5 rounded-full"></div>
              <div className="h-full w-1/5 bg-white/5 rounded-full"></div>
              <div className="h-full w-1/5 bg-white/5 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex items-center gap-3 mb-6 flex-shrink-0">
          <div className="text-brand-primary">
            <span className="material-symbols-outlined text-4xl">{icon}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto min-h-0 pr-2 custom-scrollbar">
          {children}
        </div>

        {/* Footer Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 flex-shrink-0 pt-4 border-t border-white/5">
          {/* PDF Guide Link */}
          <button className="group flex items-center gap-4 bg-brand-surface-dark border border-brand-surface-light/20 rounded-2xl p-3 pr-6 hover:border-brand-primary/50 transition-all text-left min-w-[240px]">
            <div className="w-12 h-12 flex items-center justify-center text-brand-text-muted relative bg-brand-surface-light/5 rounded-xl">
              <span className="material-symbols-outlined text-2xl group-hover:text-brand-primary transition-colors">
                description
              </span>
              <span className="absolute top-1 right-1 text-[8px] font-bold bg-brand-surface px-[2px] rounded text-white">
                PDF
              </span>
            </div>
            <div className="text-sm font-semibold text-brand-text leading-tight">
              {guideTitle || "Our Guide to completing this section"}
            </div>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <Button
              variant="ghost"
              onClick={onClose}
              className="border border-brand-surface-light/30">
              Cancel
            </Button>
            <Button
              onClick={onSave}
              className="shadow-lg shadow-brand-primary/20 px-10">
              Save
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Add CSS for custom scrollbar if needed via global or util class
