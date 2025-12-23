"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/lib/role-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function PasscodePage() {
  const [passcode, setPasscode] = useState(["", "", ""]);
  const [headerText, setHeaderText] = useState("Set your passcode"); // Dynamic header based on role? Or just standard?
  // Using standard text from HTML
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showMaloktyDialog, setShowMaloktyDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputs = useRef([]);
  const router = useRouter();
  const { login, role } = useRole();

  // Auto-focus first input
  useEffect(() => {
    if (inputs.current[0]) inputs.current[0].focus();
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);

    const newPasscode = [...passcode];
    newPasscode[index] = value;
    setPasscode(newPasscode);

    if (value && index < 2) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !passcode[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = passcode.join("");
    if (code === "777") {
      const success = login(code);
      if (success) {
        setShowSuccessDialog(true);
      } else {
        triggerError("Incorrect passcode");
        setPasscode(["", "", ""]);
        inputs.current[0].focus();
      }
    } else if (code === "478") {
      setShowMaloktyDialog(true);
    } else {
      triggerError("For this demo, the passcode is 777");
      setPasscode(["", "", ""]);
      inputs.current[0].focus();
    }
  };

  const triggerError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  const handleEnterDashboard = () => {
    router.push("/onboarding/pitch");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-brand-bg text-brand-text p-4">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-[150px] opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary rounded-full blur-[100px] opacity-10 pointer-events-none" />

      <main className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4 tracking-tight">
            Start Experince
          </h1>

        </div>

        <div className="bg-brand-surface/60 backdrop-blur-md border border-brand-primary/10 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-20" />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center space-y-3">
              <label className="text-brand-text-muted text-xs font-bold uppercase tracking-widest">
                Enter Passcode
              </label>
              <div className="flex gap-4 justify-center w-full">
                {passcode.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputs.current[i] = el)}
                    type="number"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    placeholder="•"
                    className="appearance-none w-14 h-16 sm:w-16 sm:h-20 text-center text-3xl font-bold bg-brand-bg border border-brand-surface-light/50 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-brand-primary outline-none transition-all shadow-inner placeholder-brand-secondary"
                  />
                ))}
              </div>
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm font-medium flex items-center gap-1.5 mt-2">
                    <span className="material-symbols-outlined text-[16px]">
                      error
                    </span>
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center pt-2">
              <div className="text-xs text-brand-text-muted flex items-center gap-1.5 bg-brand-surface-light/20 px-3 py-1.5 rounded-full border border-brand-surface-light/50">
                <span className="material-symbols-outlined text-[14px]">
                  lock
                </span>
                <span className="font-medium tracking-wide uppercase text-[10px]">
                  Security Verification
                </span>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              className="py-4 text-lg shadow-[0_0_15px_rgba(69,216,145,0.2)] hover:shadow-[0_0_25px_rgba(69,216,145,0.4)]">
              Confirm Passcode{" "}
              <span className="material-symbols-outlined ml-2">
                arrow_forward
              </span>
            </Button>
          </form>

          <div className="mt-8 text-center">

          </div>
        </div>
      </main>

      {/* Success Dialog Overlay */}
      <AnimatePresence>
        {showSuccessDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-surface/95 border border-brand-primary/30 w-full max-w-sm rounded-[2rem] p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-10 border-2">
              {/* Glow Effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-primary rounded-full blur-[80px] opacity-20 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-secondary rounded-full blur-[80px] opacity-20 pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-secondary to-brand-bg flex items-center justify-center border border-brand-primary/40 shadow-[0_0_20px_rgba(69,216,145,0.2)]">
                  <span className="material-symbols-outlined text-brand-primary text-3xl">
                    emoji_events
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-brand-highlight text-lg font-bold tracking-wide uppercase">
                    Hit the jackpot
                  </h2>
                  <div className="py-2">
                    <h1
                      className="text-7xl font-black text-brand-primary tracking-tighter leading-none"
                      style={{
                        textShadow: "0 0 20px rgba(69, 216, 145, 0.6)",
                      }}>
                      777
                    </h1>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Investor mode
                  </h3>
                </div>



                <div className="w-full pt-4 space-y-3">
                  <Button
                    onClick={handleEnterDashboard}
                    fullWidth
                    className="py-3.5 text-base shadow-[0_0_15px_rgba(69,216,145,0.3)] hover:shadow-[0_0_25px_rgba(69,216,145,0.5)]">
                    Enter Dashboard{" "}
                    <span className="material-symbols-outlined ml-2 text-sm">
                      arrow_forward
                    </span>
                  </Button>
                  <button
                    onClick={() => setShowSuccessDialog(false)}
                    className="w-full py-3.5 px-6 bg-transparent hover:bg-brand-surface-light/10 text-brand-text-muted hover:text-brand-highlight font-medium text-sm rounded-xl transition-colors border border-transparent hover:border-brand-surface-light/30">
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Malokty Dialog Overlay */}
      <AnimatePresence>
        {showMaloktyDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-surface/95 border border-pink-500/30 w-full max-w-sm rounded-[2rem] p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(236,72,153,0.3)] z-10 border-2">
              {/* Glow Effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-brand-bg flex items-center justify-center border border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                  <span className="material-symbols-outlined text-pink-500 text-3xl">
                    favorite
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-pink-300 text-lg font-bold tracking-wide uppercase">
                    Special Message
                  </h2>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-2">
                    For Malokty
                  </h3>
                </div>

                <p className="text-brand-text-muted text-lg leading-relaxed px-2 italic">
                  "Especially for my little girl, thank you for your help. Happy
                  testing! I love you so much Maloktyyyyyy❤️😘💕."
                </p>

                <div className="w-full pt-4 flex gap-3">
                  <Button
                    onClick={handleEnterDashboard}
                    className="flex-1 py-3.5 bg-pink-500 hover:bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                    Start the test to help me 💋
                  </Button>
                  <button
                    onClick={() => setShowMaloktyDialog(false)}
                    className="flex-1 py-3.5 px-6 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 hover:text-pink-200 font-bold text-sm rounded-xl transition-colors border border-pink-500/30">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
