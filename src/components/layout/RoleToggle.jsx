"use client";

import { useRole } from "@/lib/role-context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function RoleToggle() {
  const { role, toggleRole } = useRole();
  const router = useRouter();

  const handleToggle = () => {
    toggleRole();
    if (role === "founder") {
      router.push("/affiliate/partnerships/requests");
    } else {
      // If switching back to Founder, we should probably go to the Passcode page (Root)
      // or Dashboard if they are already authenticated?
      // For now, simpler to just go to /founder/dashboard if they are logged in,
      // but if we treat "Founder" switch as a reset/login, maybe root?
      // User said: "Passcode will be getway...".
      // Let's stick to /founder/dashboard for now if we assume persistence,
      // but strictly speaking, if they switch roles, typically they might be "logged out" of the other role.
      // However, for MVP demo, jumping to dashboard is smoother.
      // Wait, but the plan says "Founder -> Passcode -> Dashboard".
      // If I am at Affiliate Dashboard and click "Founder", I should probably land on Passcode page "/"
      // to simulate the "Gateway".
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex items-center bg-brand-bg border border-brand-surface-light/30 rounded-full p-1 w-32 h-10 shadow-inner group"
      title="Switch Role">
      {/* Sliding Background */}
      <motion.div
        className="absolute top-1 bottom-1 w-[48%] bg-brand-surface rounded-full shadow-sm z-0"
        animate={{
          left: role === "founder" ? "4px" : "calc(50% + 1px)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      {/* Founder Label */}
      <span
        className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-200 ${
          role === "founder"
            ? "text-brand-primary"
            : "text-brand-text-muted group-hover:text-brand-text"
        }`}>
        Founder
      </span>

      {/* Affiliate Label */}
      <span
        className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-200 ${
          role === "affiliate"
            ? "text-brand-primary"
            : "text-brand-text-muted group-hover:text-brand-text"
        }`}>
        Affiliate
      </span>
    </button>
  );
}
