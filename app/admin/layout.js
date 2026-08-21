"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

const ADMIN_HOST = "quail-admin.2776.ltd";

const navItems = [
  { suffix: "", label: "Overview" },
  { suffix: "/categories", label: "Categories" },
  { suffix: "/qa", label: "QA Log" },
  { suffix: "/users", label: "Users" },
  { suffix: "/hatchcam", label: "Hatch Cam" },
];

function NavLink({ isAdminHost, suffix, label, isActive }) {
  const href = isAdminHost ? suffix || "/" : `/admin${suffix}`;

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
  const [isAdminHost, setIsAdminHost] = useState(false);

  useEffect(() => {
    setIsAdminHost(window.location.hostname === ADMIN_HOST);
  }, []);

  return (
    <div className="min-h-screen bg-grey-bg flex">
      <aside className="w-64 bg-black shrink-0 flex flex-col">
        <div className="px-4 py-5 border-b border-white/10">
          <span className="font-display font-extrabold text-white text-lg">2776 QUAIL CO.</span>
          <span className="block text-xs text-orange font-semibold mt-0.5">ADMIN</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.suffix}
              isAdminHost={isAdminHost}
              suffix={item.suffix}
              label={item.label}
              isActive={pathname === `/admin${item.suffix}`}
            />
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 flex items-center justify-between">
          <a href={isAdminHost ? "https://quail.2776.ltd" : "/"} className="text-xs text-white/50 hover:text-white">
            ← Back to store
          </a>
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
