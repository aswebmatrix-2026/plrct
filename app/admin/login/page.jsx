"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "./login.css";

const FEATURES = [
  {
    label: "Admission Management",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    ),
  },
  {
    label: "Notice Board Control",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6l1 3h4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h4l1-3Z" />
        <path d="M8 11h8M8 15h5" />
      </svg>
    ),
  },
  {
    label: "Gallery Management",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="15" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m21 15-5-5-9 9" />
      </svg>
    ),
  },
  {
    label: "Academic Administration",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 9 10-5 10 5-10 5-10-5Z" />
        <path d="M6 11.5V17c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5.5" />
      </svg>
    ),
  },
  {
    label: "Student Records",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
        <path d="M9 13h6M9 17h6M9 9h2" />
      </svg>
    ),
  },
  {
    label: "Placement Management",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    label: "Secure ERP Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" />
        <path d="m9.5 12 1.8 1.8L15 10" />
      </svg>
    ),
  },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6 8.5 6.5L20.5 6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17.4 17.4 0 0 1-3.2 4.1M6.6 6.6C4 8.3 2 12 2 12s3.6 7 10 7a9.9 9.9 0 0 0 4.2-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      setErrorMsg("Invalid email or password");
      toast.error("Invalid email or password");
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left branding panel */}
        <div className="branding-panel">
          <div className="gradient-overlay" />
          <div className="background-shape shape-1" />
          <div className="background-shape shape-2" />
          <div className="background-shape shape-3" />
          <div className="background-shape particle" style={{ left: "22%", top: "60%" }} />
          <div
            className="background-shape particle"
            style={{ left: "68%", top: "40%", animationDelay: "2.2s" }}
          />
          <div
            className="background-shape particle"
            style={{ left: "45%", top: "75%", animationDelay: "4.1s" }}
          />

          <div className="branding-content">
            <span className="branding-eyebrow">PLRCT · Faridabad</span>
            <h1 className="branding-title">PLRCT Administration Portal</h1>
            <p className="branding-subtitle">
              Secure access to admissions, academics, notice board, gallery, placements, and
              institutional management.
            </p>

            <ul className="feature-list">
              {FEATURES.map((f) => (
                <li className="feature-item" key={f.label}>
                  <span className="feature-icon">{f.icon}</span>
                  {f.label}
                </li>
              ))}
            </ul>

            <div className="campus-illustration">
              <svg viewBox="0 0 64 64" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" stroke="rgba(255,255,255,0.9)">
                <path d="M32 8 6 20l26 12 26-12L32 8Z" />
                <path d="M14 26v14c0 4 8 9 18 9s18-5 18-9V26" />
                <path d="M58 20v14" />
              </svg>
              <div className="campus-illustration-text">
                <strong>Est. institutional trust</strong>
                Built for the administrators who keep PLRCT running.
              </div>
            </div>
          </div>
        </div>

        {/* Right login panel */}
        <div className="login-panel">
          <div className="login-card">
            <div className="logo-wrap">
              <div className="logo-circle">P</div>
              <h2 className="login-title">PLRCT Admin</h2>
              <p className="login-subtitle">Sign in to access the administration dashboard</p>
            </div>

            {errorMsg ? (
              <div className="error-alert" role="alert">
                <AlertIcon />
                <span>{errorMsg}</span>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <MailIcon />
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="you@PLRCT.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field has-toggle"
                  />
                  <button
                    type="button"
                    className={`password-toggle${showPassword ? " is-visible" : ""}`}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="remember-row">
                <label className="remember-check">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="checkbox-box">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  Remember Me
                </label>
                <a href="/admin/forgot-password" className="forgot-link">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" disabled={loading} className={`btn-primary${loading ? " btn-loading" : ""}`}>
                {loading ? (
                  <>
                    <span className="btn-spinner" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}