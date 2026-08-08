"use client";
import "./AdminShell.css";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Mail,
  Images,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/admissions", label: "Admissions", icon: ClipboardList },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/notices", label: "Notices", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const activeItem = NAV_ITEMS.find(
    (item) => pathname === item.href || pathname?.startsWith(item.href + "/")
  );

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileOpen ? "admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar__header">
          <div className="admin-sidebar__mark">A</div>
          <div>
            <p className="admin-sidebar__title">Admissions</p>
            <p className="admin-sidebar__subtitle">Admin Console</p>
          </div>
          <button
            className="admin-sidebar__close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === activeItem?.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={17} strokeWidth={2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <button className="admin-nav-item admin-nav-item--muted">
            <LogOut size={17} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="admin-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main column */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-topbar__menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <p className="admin-topbar__page">{activeItem?.label ?? "Admin"}</p>

          <div className="admin-topbar__actions">
            <button className="admin-icon-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}