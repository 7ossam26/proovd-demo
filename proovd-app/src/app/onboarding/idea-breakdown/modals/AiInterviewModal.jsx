"use client";

import BreakdownModalLayout from "./BreakdownModalLayout";

export default function AiInterviewModal({ isOpen, onClose }) {
  return (
    <BreakdownModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="AI Interview"
      icon="smart_toy"
      guideTitle="Our Guide to recording a good interview"
      onSave={() => onClose()}>
      <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto items-center text-center pt-8">
        <p className="text-brand-text-muted text-lg leading-relaxed">
          Share a Video or Audio of you explaining your Idea. This is different
          than the one you initially did as the affiliates may use this as
          marketing material.
        </p>

        <div className="w-full my-4">
          <div className="w-full h-32 bg-brand-surface-light/5 rounded-2xl flex items-center justify-center hover:bg-brand-surface-light/10 transition-colors cursor-pointer group border border-dashed border-brand-surface-light/20">
            <div className="px-8 py-3 rounded-full bg-brand-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-lg font-bold text-brand-bg">
                Let's start
              </span>
            </div>
          </div>
        </div>
      </div>
    </BreakdownModalLayout>
  );
}
