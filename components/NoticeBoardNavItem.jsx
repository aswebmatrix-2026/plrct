"use client";

import Link from "next/link";
import { useState } from "react";

const CATEGORY_LINKS = [
  { label: "Latest Notices", href: "/notice-board" },
  { label: "Admission Notices", href: "/notice-board?category=Admission" },
  { label: "Examination Notices", href: "/notice-board?category=Examination" },
  { label: "Academic Notices", href: "/notice-board?category=Academic" },
  { label: "Placement Notices", href: "/notice-board?category=Placement" },
  { label: "Scholarship Notices", href: "/notice-board?category=Scholarship" },
  { label: "Circulars", href: "/notice-board?category=Circular" },
  { label: "Tenders", href: "/notice-board?category=Tender" },
  { label: "Recruitment", href: "/notice-board?category=Recruitment" },
];

/**
 * Drop this <li> into your existing <nav> markup alongside your other
 * top-level nav items (Home, About, Admissions, ...).
 */
export default function NoticeBoardNavItem() {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="nav-item nav-item--dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-item__trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        Notice Board
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </button>

      {open && (
        <ul className="nav-item__dropdown">
          {CATEGORY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}