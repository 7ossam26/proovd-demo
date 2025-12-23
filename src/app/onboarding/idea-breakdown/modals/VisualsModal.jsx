"use client";

import BreakdownModalLayout from "./BreakdownModalLayout";

export default function VisualsModal({
  isOpen,
  onClose,
  onSave,
  currentSavings,
  completedCount,
  totalCards,
}) {
  return (
    <BreakdownModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Visuals"
      icon="imagesmode"
      guideTitle="Our Guide to setting up good visuals"
      onSave={onSave}
      currentSavings={currentSavings}
      completedCount={completedCount}
      totalCards={totalCards}>
      <div className="w-full space-y-4">
        {/* Upload Zone */}
        <div className="relative w-full rounded-2xl border-2 border-dashed border-brand-surface-light/30 bg-brand-surface-light/5 hover:bg-brand-surface-light/10 transition-colors cursor-pointer group h-72 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-brand-surface-light/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-4xl text-brand-text group-hover:text-brand-primary transition-colors">
              add_to_drive
            </span>
          </div>
          <p className="text-lg text-brand-text/60 font-medium group-hover:text-white transition-colors">
            Upload mockups and prototypes
          </p>
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Link Input */}
        <div className="flex items-center gap-2 max-w-md mx-auto relative rounded-full border border-brand-surface-light/30 bg-brand-bg p-1 shadow-sm mt-8">
          <input
            type="text"
            className="flex-grow bg-transparent border-none rounded-l-full py-2.5 pl-6 pr-2 text-white placeholder-brand-text/40 focus:ring-0 focus:border-transparent outline-none text-sm"
            placeholder="Your drive link..."
          />
          <button className="flex-shrink-0 bg-brand-primary text-brand-bg px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:shadow-brand-primary/20 transition-all transform active:scale-95 flex items-center gap-2">
            <span>Upload</span>
            <span className="material-symbols-outlined text-lg">
              play_arrow
            </span>
          </button>
        </div>
      </div>
    </BreakdownModalLayout>
  );
}
