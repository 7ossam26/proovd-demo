"use client";

import Link from "next/link";
import Image from "next/image";
import { RoleToggle } from "./RoleToggle";
import { useRole } from "@/lib/role-context";

export function Navbar() {
  const { role } = useRole();

  return (
    <nav className="sticky top-0 z-40 w-full bg-brand-bg/80 backdrop-blur-md border-b border-brand-surface-light/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={
            role === "founder"
              ? "/founder/dashboard"
              : "/affiliate/partnerships/requests"
          }
          className="flex flex-shrink-0 items-center gap-2">
          <Image
            src="/Logo.svg"
            alt="Proovd Logo"
            width={140}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <RoleToggle />

          <button className="relative p-2 rounded-full hover:bg-brand-surface/30 transition-colors text-brand-text-muted hover:text-brand-text">
            <span className="material-symbols-outlined text-2xl">
              notifications
            </span>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-brand-bg"></span>
          </button>

          <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-surface-light/30 flex items-center justify-center text-brand-primary font-bold shadow-sm">
            {role === "founder" ? "F" : "A"}
          </div>
        </div>
      </div>
    </nav>
  );
}
