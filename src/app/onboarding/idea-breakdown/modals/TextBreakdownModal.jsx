"use client";

import BreakdownModalLayout from "./BreakdownModalLayout";

export default function TextBreakdownModal({
  isOpen,
  onClose,
  onSave,
  type, // 'problem', 'solution', 'competition', 'story'
  defaultValue = "",
  currentSavings,
  completedCount,
  totalCards,
}) {
  const config = {
    problem: {
      title: "Problem",
      icon: "checklist",
      guide: "Our Guide to Defining your Problem",
      placeholder: "Define the problem you are solving (AI filled)...",
    },
    solution: {
      title: "Solution",
      icon: "show_chart",
      guide: "Our Guide to Defining your Solution",
      placeholder: "Explain your proposed solution (AI filled)...",
    },
    competition: {
      title: "Competition",
      icon: "groups",
      guide: "Our Guide to Analyzing Competition",
      placeholder: "Analyze your competitors...",
    },
    story: {
      title: "Story",
      icon: "auto_stories",
      guide: "Our Guide to Crafting your Story",
      placeholder: "Define your narrative and pitch...",
    },
  };

  const current = config[type] || config.problem;

  return (
    <BreakdownModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={current.title}
      icon={current.icon}
      guideTitle={current.guide}
      onSave={onSave}
      currentSavings={currentSavings}
      completedCount={completedCount}
      totalCards={totalCards}>
      <div className="relative w-full h-full min-h-[300px]">
        <textarea
          className="w-full h-80 py-6 px-5 rounded-[1.5rem] border-2 border-brand-surface-light/30 bg-brand-bg text-brand-text placeholder-brand-text-muted/50 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none resize-none shadow-inner transition-all text-lg leading-relaxed dark:bg-[#09110C]"
          placeholder={current.placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </BreakdownModalLayout>
  );
}
