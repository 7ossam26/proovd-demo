import React from 'react';

const ExpandableCard = ({
    title,
    icon,
    description,
    isActive,
    isCompleted,
    onToggle,
    children,
    discountAmount = 15
}) => {
    return (
        <div
            className={`
                group relative overflow-hidden rounded-2xl border transition-all duration-300 ease-out
                ${isActive
                    ? 'bg-white/[0.03] border-violet-500/50 shadow-2xl shadow-violet-900/20'
                    : isCompleted
                        ? 'bg-emerald-900/10 border-emerald-500/30 opacity-75 hover:opacity-100'
                        : 'bg-[#0A0A0E] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                }
            `}
        >
            {/* Header / Trigger Area */}
            <div
                onClick={onToggle}
                className="flex items-center gap-5 p-5 cursor-pointer select-none"
            >
                {/* Icon Box */}
                <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 shrink-0
                    ${isActive ? 'scale-110 shadow-lg shadow-violet-500/20 bg-violet-500/10 text-violet-300' : ''}
                    ${isCompleted && !isActive ? 'bg-emerald-500/20 text-emerald-400 scale-100' : ''}
                    ${!isActive && !isCompleted ? 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300' : ''}
                `}>
                    {isCompleted && !isActive ? '✓' : icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-bold text-lg truncate transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`}>
                            {title}
                        </h3>
                        {isCompleted && (
                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                Applied
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{description}</p>
                </div>

                {/* Status / Price */}
                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <div className={`text-sm font-medium transition-colors ${isCompleted ? 'text-emerald-400' : 'text-gray-500'}`}>
                        {isCompleted ? '-$15.00' : `Save $${discountAmount}`}
                    </div>
                </div>
            </div>

            {/* Expandable Content (Conditional Render) */}
            {isActive && (
                <div className="animate-fade-in-up overflow-hidden">
                    <div className="p-6 pt-0 border-t border-white/5 mx-5 mt-2 mb-4">
                        <div className="pt-6">
                            {children}
                        </div>
                    </div>
                </div>
            )}

            {/* Active Glow Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-violet-500 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    );
};

export default ExpandableCard;
