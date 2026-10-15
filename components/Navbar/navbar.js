'use client';

import { useEffect, useRef, useState, useCallback } from 'react';


export function useStickyScroll(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

export function useOutsideClick(ref, onOutside, active = true) {
  useEffect(() => {
    if (!active) return undefined;

    function handlePointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutside(event);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [ref, onOutside, active]);
}

export function useEscapeKey(onEscape, active = true) {
  useEffect(() => {
    if (!active) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onEscape(event);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, active]);
}

export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

export function useActiveLink(pathname, navItems) {
  const [activeHref, setActiveHref] = useState('/');

  useEffect(() => {
    if (!pathname) return;
    const match = navItems.find((item) =>
      item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
    );
    setActiveHref(match ? match.href : '');
  }, [pathname, navItems]);

  return activeHref;
}

export function useDropdownMenu(closeDelay = 150) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const openMenu = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(false), closeDelay);
  }, [closeDelay]);

  const closeMenuImmediately = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { open, openMenu, closeMenu, closeMenuImmediately, toggleMenu };
}

/* -------------------------------------------------------------------------
 * About mega-menu data — UNCHANGED
 * ---------------------------------------------------------------------- */
export const ABOUT_MENU = [
  {
    title: 'Overview',
    href: '/About/overview',
    icon: 'overview',
    description: 'Institutional overview, academic pillars, and growth timeline',
  },
  {
    title: 'Infrastructure',
    href: '/About/infrastructure',
    icon: 'infrastructure',
    description: 'Smart classrooms, labs, library, hostel, and campus facilities',
  },
  {
    title: 'Messages',
    href: '/About/messages',
    icon: 'messages',
    description: 'Leadership messages from the Chairman, Director, and Principal',
  },
  {
    title: 'Affiliations',
    href: '/About/affiliations',
    icon: 'affiliations',
    description: 'AICTE, PCI, and university approvals and recognition',
  },
  {
    title: 'Vision & Mission',
    href: '/About/vision-mission',
    icon: 'vision',
    description: 'Our vision, six-point mission, core values, and roadmap',
  },
];

export const ACADEMICS_MENU = [
  {
    group: 'Undergraduate Programs',
    items: [
      { title: 'B.Tech Engineering', href: '/academics/btech', icon: 'engineering', description: '4-year flagship engineering degree, 8 departments' },
      { title: 'Diploma Engineering', href: '/academics/diploma', icon: 'diploma', description: '3-year practical diploma with lateral entry to B.Tech' },
       { title: 'BCA', href: '/academics/bca', icon: 'code', description: 'Bachelor of Computer Applications' },
        { title: 'BBA', href: '/academics/bba', icon: 'briefcase', description: 'Bachelor of Business Administration' },
    ],
  },
  {
    group: 'Postgraduate Programs',
    items: [
      { title: 'M.Tech Engineering', href: '/academics/mtech', icon: 'research', description: '2-year research-driven postgraduate specialisation' },
    ],
  },
  {
    group: 'Engineering Departments',
    items: [
      { title: 'Computer Science Engineering', href: '/academics/departments/cse', icon: 'code', description: 'Programming, AI, cloud & cybersecurity' },
      { title: 'Electrical Engineering', href: '/academics/departments/ee', icon: 'bolt', description: 'Power systems, machines & renewable energy' },
      { title: 'Mechanical Engineering', href: '/academics/departments/me', icon: 'gear', description: 'Manufacturing, CAD/CAM & robotics' },
      { title: 'Civil Engineering', href: '/academics/departments/ce', icon: 'building', description: 'Structures, construction & transportation' },
      { title: 'Electronics & Communication Engineering', href: '/academics/departments/ece', icon: 'chip', description: 'Embedded systems, IoT & VLSI' },
      { title: 'Applied Science', href: '/academics/departments/applied-science', icon: 'ai', description: 'Applied Science' },
   ],
  },
  {
    group: 'Academic Resources',
    items: [
      { title: 'Syllabus', href: '/syllabus', icon: 'doc', description: 'Department-wise semester syllabus' },
      { title: 'Curriculum', href: '/curriculum', icon: 'curriculum', description: 'Outcome-based curriculum structure' },
      { title: 'Academic Calendar', href: '/academic-calendar', icon: 'calendar', description: 'Semester dates, holidays & exam schedule' },
      { title: 'Examination Cell', href: '/examination-cell', icon: 'exam', description: 'Exam forms, results & re-evaluation' },
      { title: 'Laboratories', href: '/laboratories', icon: 'lab', description: 'Department laboratories & equipment' },
      { title: 'Workshops', href: '/workshop', icon: 'workshop', description: 'Manufacturing & practical workshops' },
      { title: 'Industrial Training', href: '/industrial-training', icon: 'training', description: 'Internships & industrial exposure' },
    ],
  },
];


export const COURSES_MENU = [
 
  { title: 'MBA', href: '/courses/mba', icon: 'chart', description: 'Postgraduate management program' },
  { title: 'Pharmacy', href: '/courses/pharmacy', icon: 'pharmacy', description: 'D.Pharm & B.Pharm — AICTE/PCI approved' },
];

export const ADMISSIONS_MENU = [
  { title: 'Admission Process', href: '/Admission/admission-process', icon: 'flow', description: 'Step-by-step guide from enquiry to enrolment' },
  { title: 'Eligibility', href: '/Admission/eligibility', icon: 'check', description: 'Program-wise eligibility criteria' },
  { title: 'Scholarships', href: '/Admission/scholarships', icon: 'award', description: 'Merit and need-based scholarship schemes' },
  { title: 'Download Prospectus', href: '#', icon: 'download', description: 'Full Pt. L.R. College of Technology prospectus, PDF format' },
 
];

/* -------------------------------------------------------------------------
 * IQAC (NAAC) dropdown menu
 * ---------------------------------------------------------------------- */
export const IQAC = [
  {
    title: 'About IQAC',
    href: '/IQAC(NAAC)/about-iqac',
    icon: 'edit',
    description: 'What IQAC is, and why the college established it',
  },
  {
    title: 'Executive Summary',
    href: '/IQAC(NAAC)/executive-summary',
    icon: 'doc',
    description: 'A summary of IQAC activities and outcomes',
  },
  {
    title: 'Profile of the College NAAC 2A',
    href: '/IQAC(NAAC)/Profile/naac2A',
    icon: 'overview',
    description: 'Institutional profile submitted for NAAC assessment',
  },
  {
    title: 'Profile of the College NAAC 2B',
    href: '/IQAC(NAAC)/Profile/naac2b',
    icon: 'overview',
    description: 'Institutional profile submitted for NAAC assessment',
  },
  {
    title: 'Activity Report/Form',
    href: '/IQAC(NAAC)/report',
    icon: 'flow',
    description: 'IQAC activity reports and downloadable forms',
  },
  {
    title: 'Notice',
    href: '/IQAC(NAAC)/notice',
    icon: 'calendar',
    description: 'Latest IQAC notices and circulars',
  },
];

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', mega: 'about' },
  { label: 'Academics', href: '/academics', mega: 'academics' },
  { label: 'Admissions', href: '/admissions', mega: 'admissions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Placements', href: '/placements' },
  { label: 'IQAC (NAAC)', href: '/naac', mega: 'iqac' },
  { label: 'Campus Life', href: '/campus-life' },
  { label: 'Notice Board', href: '/notice-board', badge: 'NEW' },
];