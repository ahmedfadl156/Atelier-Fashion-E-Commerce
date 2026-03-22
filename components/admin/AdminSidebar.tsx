"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart2,
  Settings,
  Tag,
  ChevronRight,
  X,
  Menu,
  LogOut,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  heading: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    heading: "Overview",
    items: [
      { label: "Dashboard",   href: "/admin",            icon: LayoutDashboard },
      { label: "Analytics",   href: "/admin/analytics",  icon: BarChart2 },
    ],
  },
  {
    heading: "Catalogue",
    items: [
      { label: "Products",    href: "/admin/products",   icon: Package },
      { label: "Orders",      href: "/admin/orders",     icon: ShoppingBag },
      { label: "Promotions",  href: "/admin/promotions", icon: Tag },
    ],
  },
  {
    heading: "Management",
    items: [
      { label: "Customers",   href: "/admin/customers",  icon: Users },
      { label: "Settings",    href: "/admin/settings",   icon: Settings },
    ],
  },
];


export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <aside
      className="flex flex-col h-full"
      style={{
        background: "linear-gradient(180deg, #1A1A1A 0%, #111111 100%)",
        color: "#F9F8F6",
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-6"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.15)" }}
      >
        <div className="flex flex-col">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#D4AF37", fontFamily: "'Liberation Serif', Georgia, serif" }}
          >
            Atelier
          </span>
          <span
            className="text-[10px] tracking-[0.2em] uppercase mt-0.5"
            style={{ color: "rgba(249,248,246,0.4)" }}
          >
            Admin Console
          </span>
        </div>

        {/* Close button — mobile only */}
        <button
          className="lg:hidden p-1 rounded"
          style={{ color: "rgba(249,248,246,0.5)" }}
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        {navGroups.map((group) => (
          <div key={group.heading}>
            <p
              className="text-[9px] tracking-[0.35em] uppercase mb-3 px-2"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              {group.heading}
            </p>
            <ul className="space-y-1">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all duration-200"
                      style={{
                        background: active
                          ? "rgba(212,175,55,0.1)"
                          : "transparent",
                        color: active
                          ? "#D4AF37"
                          : "rgba(249,248,246,0.6)",
                        borderLeft: active
                          ? "2px solid #D4AF37"
                          : "2px solid transparent",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <Icon
                        size={16}
                        style={{
                          color: active ? "#D4AF37" : "rgba(249,248,246,0.45)",
                          transition: "color 0.2s",
                          flexShrink: 0,
                        }}
                        className="group-hover:text-[#D4AF37]! transition-colors duration-200"
                      />
                      <span
                        className="flex-1 group-hover:text-[#F9F8F6] transition-colors duration-200"
                        style={{ fontWeight: active ? 500 : 400 }}
                      >
                        {label}
                      </span>
                      {active && (
                        <ChevronRight size={12} style={{ color: "#D4AF37", opacity: 0.7 }} />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-4 py-5"
        style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
      >
        {/* Divider line */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm cursor-pointer group transition-all duration-200"
          style={{ color: "rgba(249,248,246,0.45)" }}
        >
          <LogOut
            size={16}
            className="group-hover:text-red-400! transition-colors duration-200"
            style={{ flexShrink: 0 }}
          />
          <span
            className="text-sm group-hover:text-red-400 transition-colors duration-200"
            style={{ letterSpacing: "0.05em" }}
          >
            Sign Out
          </span>
        </div>

        <p
          className="text-[9px] px-3 mt-4"
          style={{ color: "rgba(249,248,246,0.2)", letterSpacing: "0.1em" }}
        >
          © {new Date().getFullYear()} Atelier Fashion
        </p>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block fixed inset-y-0 left-0 w-60 z-40 shadow-2xl">
        <SidebarContent />
      </div>

      <button
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-sm shadow-lg transition-all duration-200"
        style={{ background: "#1A1A1A", color: "#D4AF37" }}
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}
