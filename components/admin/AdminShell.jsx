"use client";

import { SessionProvider, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/admissions", label: "Admissions", icon: FileText },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <SessionProvider>{children}</SessionProvider>;

  return (
    <SessionProvider>
      <div className="min-h-screen flex bg-gray-50">
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
          <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100">
            <div className="h-9 w-9 rounded-full bg-brand flex items-center justify-center text-white font-display font-bold text-sm">
              P
            </div>
            <div>
              <p className="font-display font-bold leading-tight">PLRCT</p>
              <p className="text-xs text-gray-500 leading-tight">Admin Panel</p>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${pathname.startsWith(href) ? "bg-brand-50 text-brand" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mx-3 mb-4 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </aside>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
