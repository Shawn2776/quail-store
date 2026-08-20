"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/qa", label: "QA Log" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/hatchcam", label: "Hatch Cam" },
];

function NavLink({ href, label, isActive }) {
  return (
    <a
      href={href}
      className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
        isActive ? "bg-orange text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </a>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-grey-bg flex">
      <aside className="w-64 bg-black shrink-0 flex flex-col">
        <div className="px-4 py-5 border-b border-white/10">
          <span className="font-display font-extrabold text-white text-lg">2776 QUAIL CO.</span>
          <span className="block text-xs text-orange font-semibold mt-0.5">ADMIN</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 flex items-center justify-between">
          <a href="/" className="text-xs text-white/50 hover:text-white">
            ← Back to store
          </a>
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
