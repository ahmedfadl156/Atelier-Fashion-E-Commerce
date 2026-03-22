"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

// Derive a readable title from the current path
function getPageTitle(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function AdminTopBar() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(249,248,246,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(26,26,26,0.07)",
      }}
    >
      {/* Left: breadcrumb + page title */}
      <div className="flex flex-col pl-10 lg:pl-0">
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(26,26,26,0.4)" }}
        >
          Admin / {title}
        </span>
        <h1
          className="text-lg leading-tight mt-0.5"
          style={{
            fontFamily: "'Liberation Serif', Georgia, serif",
            color: "#1A1A1A",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </h1>
      </div>

      {/* Right: date + notification bell */}
      <div className="flex items-center gap-4">
        <span
          className="hidden sm:block text-xs"
          style={{ color: "rgba(26,26,26,0.45)", letterSpacing: "0.05em" }}
        >
          {dateStr}
        </span>

        {/* Notification bell */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-sm transition-all duration-200 group"
          style={{
            background: "rgba(26,26,26,0.04)",
            border: "1px solid rgba(26,26,26,0.08)",
          }}
          aria-label="Notifications"
        >
          <Bell
            size={16}
            style={{ color: "rgba(26,26,26,0.6)" }}
            className="group-hover:text-[#D4AF37]! transition-colors duration-200"
          />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "#D4AF37" }}
          />
        </button>
      </div>
    </header>
  );
}
