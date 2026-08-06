'use client';

/**
 * Navbar.jsx
 * ---------------------------------------------------------------------------
 * CHANGES FROM PREVIOUS VERSION (search "CHANGE:" to find each spot):
 * 1. Import ACADEMICS_MENU alongside COURSES_MENU / ADMISSIONS_MENU / ABOUT_MENU.
 * 2. Added new inline icons used by the Academics mega-menu (departments +
 *    academic resources): bolt, gear, building, chip, ai, network, doc,
 *    calendar, exam, workshop, training, flask, lab.
 * 3. MEGA_MENUS now has an 'academics' entry, flagged `grouped: true`
 *    because ACADEMICS_MENU is 4 groups of items, not one flat list.
 * 4. New <MegaMenuGrouped> component renders the 4-column layout (desktop).
 *    NavItem picks MegaMenu vs MegaMenuGrouped based on `grouped`.
 * 5. MobileNavItem now flattens grouped menus into labelled accordion
 *    sections instead of a single list, so Academics reads sensibly on
 *    mobile too.
 * Everything else — hooks, search overlay, header markup — is UNCHANGED.
 * ---------------------------------------------------------------------------
 */

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './navbar.css';
import {
  useStickyScroll,
  useOutsideClick,
  useEscapeKey,
  useLockBodyScroll,
  useActiveLink,
  useDropdownMenu,
  useSearchOverlay,
  NAV_ITEMS,
  COURSES_MENU,
  ADMISSIONS_MENU,
  ABOUT_MENU,
  ACADEMICS_MENU, // CHANGE: new import
  POPULAR_SEARCHES,
} from './navbar';

const HIDDEN_NAV_LABELS = ['Campus Life', 'Research'];
const VISIBLE_NAV_ITEMS = NAV_ITEMS.filter((item) => !HIDDEN_NAV_LABELS.includes(item.label));

/* -----------------------------------------------------------------------
 * Mega-menu lookup — items array + footer CTA, keyed by item.mega.
 * CHANGE: added 'academics', marked `grouped: true` since its `items` is
 * an array of { group, items } instead of a flat array of link objects.
 * -------------------------------------------------------------------- */
const MEGA_MENUS = {
  about: { items: ABOUT_MENU, ctaHref: '/about/overview', ctaLabel: 'Read full institutional overview' },
  academics: { items: ACADEMICS_MENU, ctaHref: '/academics', ctaLabel: 'View all academic programs', grouped: true },
  courses: { items: COURSES_MENU, ctaHref: '/courses', ctaLabel: 'View all programs' },
  admissions: { items: ADMISSIONS_MENU, ctaHref: '/admissions', ctaLabel: 'Full admissions guide' },
};

const ICONS = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  ),
  login: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  engineering: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  diploma: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="M18 17V9M13 17V5M8 17v-3" />
    </svg>
  ),
  pharmacy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M10.5 20.5 3.5 13.5a5 5 0 1 1 7-7l7 7a5 5 0 1 1-7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M7 6h6a4 4 0 0 1 4 4v2a4 4 0 0 0 4 4" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  rupee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 3h12M6 8h12M6 3c3 0 6 1.5 6 5s-3 5-6 5h9M9 13l7 8" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5M12 15V3" />
    </svg>
  ),
  overview: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  infrastructure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6" />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  affiliations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  ),
  vision: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  /* CHANGE: icons for Academics mega-menu — departments */
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3M9 3h6" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82 2 2 0 1 1-2.83 2.83 1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33 2 2 0 1 1-2.83-2.83 1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 13.09H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82 2 2 0 1 1 2.83-2.83 1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33 2 2 0 1 1 2.83 2.83 1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 22V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v18M12 22v-9h6a1 1 0 0 1 1 1v8M8 6h.01M8 10h.01M8 14h.01" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="5" cy="6" r="3" />
      <circle cx="19" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M7.5 7.8 10 16M16.5 7.8 14 16" />
    </svg>
  ),
  /* CHANGE: icons for Academics mega-menu — academic resources */
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </svg>
  ),
  curriculum: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16v16H4zM4 9h16M9 9v11" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  exam: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  lab: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 2v6L4 20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2L15 8V2M9 2h6" />
    </svg>
  ),
  workshop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 1 0 1.4l-8 8-4 1 1-4 8-8a1 1 0 0 1 1.4 0l1.6 1.6ZM18 3l3 3" />
    </svg>
  ),
  training: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M2 7h20v13H2zM8 7V4h8v3M2 12h20" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3M9 3h6M8 14h8" />
    </svg>
  ),
};

const Icon = ({ name, className }) => (
  <span className={className} style={{ display: 'inline-flex' }}>
    {ICONS[name] || null}
  </span>
);

function BrandCrest({ className, style, size = 52 }) {
  return (
    <img
      src="/images/Pandit-L.R.-College-Logo.png"
      alt="Pt. L.R. College of Technology logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain', display: 'block', flexShrink: 0, ...style }}
    />
  );
}

/* Flat mega-menu — used by About / Courses / Admissions (single list). */
function MegaMenu({ id, items, isOpen, ctaHref, ctaLabel }) {
  return (
    <div id={id} role="menu" className={`plrct-mega${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="plrct-mega__grid">
        {items.map((item) => (
          <Link key={item.title} href={item.href} role="menuitem" className="plrct-mega__link" tabIndex={isOpen ? 0 : -1}>
            <span className="plrct-mega__icon">
              <Icon name={item.icon} />
            </span>
            <span>
              <p className="plrct-mega__title">{item.title}</p>
              <p className="plrct-mega__desc">{item.description}</p>
            </span>
          </Link>
        ))}
      </div>
      {ctaHref && (
        <div className="plrct-mega__footer">
          <Link href={ctaHref} className="plrct-mega__cta" tabIndex={isOpen ? 0 : -1}>
            {ctaLabel}
            <Icon name="arrow" />
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * CHANGE: grouped mega-menu — used by Academics (4 columns: Undergraduate
 * Programs, Postgraduate Programs, Engineering Departments, Academic
 * Resources). Reuses the same `plrct-mega` shell/footer as MegaMenu, but
 * renders each group as its own column with a heading.
 *
 * NOTE ON CSS: this needs a `plrct-mega--grouped` layout rule and
 * `plrct-mega__column` / `plrct-mega__column-title` styles added to
 * navbar.css (grid-template-columns: repeat(4, 1fr); gap: 32px on the
 * grouped grid, plus a small-caps heading style for the column title).
 * Existing `plrct-mega__link/icon/title/desc` classes are reused as-is.
 */
function MegaMenuGrouped({ id, groups, isOpen, ctaHref, ctaLabel }) {
  return (
    <div id={id} role="menu" className={`plrct-mega plrct-mega--grouped${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="plrct-mega__grid plrct-mega__grid--grouped">
        {groups.map((group) => (
          <div key={group.group} className="plrct-mega__column">
            <p className="plrct-mega__column-title">{group.group}</p>
            {group.items.map((item) => (
              <Link key={item.title} href={item.href} role="menuitem" className="plrct-mega__link plrct-mega__link--compact" tabIndex={isOpen ? 0 : -1}>
                <span className="plrct-mega__icon plrct-mega__icon--sm">
                  <Icon name={item.icon} />
                </span>
                <span>
                  <p className="plrct-mega__title">{item.title}</p>
                  <p className="plrct-mega__desc">{item.description}</p>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      {ctaHref && (
        <div className="plrct-mega__footer">
          <Link href={ctaHref} className="plrct-mega__cta" tabIndex={isOpen ? 0 : -1}>
            {ctaLabel}
            <Icon name="arrow" />
          </Link>
        </div>
      )}
    </div>
  );
}

function NavItem({ item, activeHref }) {
  const { open, openMenu, closeMenu, closeMenuImmediately, toggleMenu } = useDropdownMenu();
  const itemRef = useRef(null);
  const isActive = activeHref === item.href;

  useOutsideClick(itemRef, closeMenuImmediately, !!item.mega && open);
  useEscapeKey(closeMenuImmediately, !!item.mega && open);

  if (!item.mega) {
    return (
      <li className={`plrct-nav__item${isActive ? ' is-active' : ''}`}>
        <Link href={item.href} className="plrct-nav__link">
          {item.label}
          {item.badge && <span className="plrct-badge">{item.badge}</span>}
        </Link>
      </li>
    );
  }

  // CHANGE: lookup via MEGA_MENUS map; `grouped` decides which component renders.
  const { items: menuItems, ctaHref, ctaLabel, grouped } = MEGA_MENUS[item.mega];

  return (
    <li
      ref={itemRef}
      className={`plrct-nav__item${isActive ? ' is-active' : ''}${open ? ' is-open' : ''}`}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        type="button"
        className="plrct-nav__link"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={`mega-${item.mega}`}
        onClick={toggleMenu}
      >
        {item.label}
        <Icon name="chevron" className="plrct-nav__chevron" />
      </button>
      {grouped ? (
        <MegaMenuGrouped id={`mega-${item.mega}`} groups={menuItems} isOpen={open} ctaHref={ctaHref} ctaLabel={ctaLabel} />
      ) : (
        <MegaMenu id={`mega-${item.mega}`} items={menuItems} isOpen={open} ctaHref={ctaHref} ctaLabel={ctaLabel} />
      )}
    </li>
  );
}

function SearchOverlay({ open, onClose, inputRef }) {
  const panelRef = useRef(null);
  useOutsideClick(panelRef, onClose, open);
  useEscapeKey(onClose, open);
  useLockBodyScroll(open);

  return (
    <div className={`plrct-search-overlay${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Site search">
      <div className="plrct-search-panel" ref={panelRef}>
        <div className="plrct-search-panel__top">
          <input
            ref={inputRef}
            type="text"
            className="plrct-search-input"
            placeholder="Search courses, admissions, faculty…"
            aria-label="Search PLRCT website"
            tabIndex={open ? 0 : -1}
          />
          <button type="button" className="plrct-search-close" aria-label="Close search" onClick={onClose} tabIndex={open ? 0 : -1}>
            <Icon name="close" />
          </button>
        </div>
        <div className="plrct-search-popular">
          <p className="plrct-search-popular__label">Popular searches</p>
          <div className="plrct-search-popular__list">
            {POPULAR_SEARCHES.map((term) => (
              <button key={term} type="button" className="plrct-search-chip" tabIndex={open ? 0 : -1}>
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * CHANGE: MobileNavItem now handles BOTH shapes:
 * - flat menu -> plain accordion list (unchanged behaviour)
 * - grouped menu (Academics) -> accordion split into labelled sub-sections
 */
function MobileNavItem({ item, activeHref, onNavigate }) {
  const [open, setOpen] = useState(false);
  const isActive = activeHref === item.href;

  if (!item.mega) {
    return (
      <div className="plrct-mobile-item">
        <div className="plrct-mobile-item__row">
          <Link href={item.href} className="plrct-mobile-item__link" onClick={onNavigate}>
            {item.label}
            {item.badge && <span className="plrct-badge">{item.badge}</span>}
          </Link>
        </div>
      </div>
    );
  }

  const { items: menuItems, grouped } = MEGA_MENUS[item.mega];

  return (
    <div className={`plrct-mobile-item${open ? ' is-open' : ''}`}>
      <div className="plrct-mobile-item__row">
        <Link href={item.href} className="plrct-mobile-item__link" onClick={onNavigate}>
          {item.label}
        </Link>
        <button
          type="button"
          className="plrct-mobile-item__toggle"
          aria-expanded={open}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label} menu`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <Icon name="chevron" />
        </button>
      </div>
      <div className="plrct-mobile-accordion">
        {grouped
          ? menuItems.map((group) => (
              <div key={group.group} className="plrct-mobile-accordion__group">
                <p className="plrct-mobile-accordion__group-title">{group.group}</p>
                {group.items.map((sub) => (
                  <Link key={sub.title} href={sub.href} className="plrct-mobile-accordion__link" onClick={onNavigate}>
                    <strong>{sub.title}</strong>
                    <small>{sub.description}</small>
                  </Link>
                ))}
              </div>
            ))
          : menuItems.map((sub) => (
              <Link key={sub.title} href={sub.href} className="plrct-mobile-accordion__link" onClick={onNavigate}>
                <strong>{sub.title}</strong>
                <small>{sub.description}</small>
              </Link>
            ))}
      </div>
    </div>
  );
}

function MobileDrawer({ open, onClose, activeHref }) {
  const drawerRef = useRef(null);
  useEscapeKey(onClose, open);
  useLockBodyScroll(open);

  return (
    <>
      <div className={`plrct-mobile-scrim${open ? ' is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <div ref={drawerRef} className={`plrct-mobile-drawer${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="plrct-mobile-drawer__header">
          <div className="plrct-mobile-drawer__brand">
            <BrandCrest className="plrct-brand__crest" size={34} />
            <span>Pt. L.R. College of Technology</span>
          </div>
          <button type="button" className="plrct-icon-btn" aria-label="Close menu" onClick={onClose} tabIndex={open ? 0 : -1}>
            <Icon name="close" />
          </button>
        </div>
        <nav className="plrct-mobile-drawer__body" aria-label="Mobile primary">
          {VISIBLE_NAV_ITEMS.map((item) => (
            <MobileNavItem key={item.label} item={item} activeHref={activeHref} onNavigate={onClose} />
          ))}
        </nav>
        <div className="plrct-mobile-drawer__footer">
          <Link href="/apply" className="plrct-btn plrct-btn--primary" onClick={onClose}>
            Apply Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const scrolled = useStickyScroll(24);
  const activeHref = useActiveLink(pathname, NAV_ITEMS);
  const { open: searchOpen, openOverlay, closeOverlay, inputRef } = useSearchOverlay();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <a href="#main-content" className="plrct-skip-link">
        Skip to main content
      </a>

      <header className={`plrct-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className={`plrct-topbar${scrolled ? ' is-collapsed' : ''}`}>
          <div className="plrct-topbar__inner">
            <div className="plrct-topbar__left">
              <span className="plrct-topbar__item">AICTE Approved</span>
              <span className="plrct-topbar__divider" aria-hidden="true" />
              <span className="plrct-topbar__item">
                <Icon name="pin" />
                Faridabad, Haryana
              </span>
            </div>

            <div className="plrct-topbar__center">
              <Icon name="phone" />
              <span>Admission Helpline: +91-98765-43210</span>
            </div>

            <div className="plrct-topbar__right">
              <a href="mailto:admissions@plrct.edu.in" className="plrct-topbar__item">
                <Icon name="mail" />
                admissions@plrct.edu.in
              </a>
              <span className="plrct-topbar__divider" aria-hidden="true" />
              <Link href="/admin/login" className="plrct-topbar__item">
                <Icon name="login" />
                Faculty Login
              </Link>
            </div>
          </div>
        </div>

        <div className="plrct-mainbar">
          <div className="plrct-mainbar__inner">
            <Link href="/" className="plrct-brand" aria-label="PLRCT home">
              <BrandCrest className="plrct-brand__crest" />
              <span className="plrct-brand__text">
                <span className="plrct-brand__name">
                  Pt. L.R. <span>College of Technology</span>
                </span>
                <span className="plrct-brand__tagline">Excellence in Technical &amp; Professional Education</span>
              </span>
            </Link>

            <nav className="plrct-nav" aria-label="Primary">
              <ul className="plrct-nav__list">
                {VISIBLE_NAV_ITEMS.map((item) => (
                  <NavItem key={item.label} item={item} activeHref={activeHref} />
                ))}
              </ul>
            </nav>

            <div className="plrct-actions">
              <button type="button" className="plrct-icon-btn" aria-label="Open search" onClick={openOverlay}>
                <Icon name="search" />
              </button>
              <Link href="/apply" className="plrct-btn plrct-btn--primary">
                Apply Now
              </Link>
              <button type="button" className="plrct-hamburger" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>
                <Icon name="menu" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={closeOverlay} inputRef={inputRef} />
      <MobileDrawer open={mobileOpen} onClose={closeMobile} activeHref={activeHref} />
    </>
  );
}