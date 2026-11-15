import Link from "next/link";
import { profile } from "@/lib/content";
import { chatGPTSignInPath, chatGPTSignOutPath } from "@/app/chatgpt-auth";
export function Header({
  signedIn = false,
  returnTo = "/",
}: {
  signedIn?: boolean;
  returnTo?: string;
}) {
  return (
    <header className="site-header wrap">
      <Link href="/" className="brand">
        <span className="monogram" aria-hidden="true">
          b.
        </span>
        {profile.name}
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <a
          className="subtle-link"
          href={profile.repository}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
        {signedIn ? (
          <a
            className="account-link"
            href={chatGPTSignOutPath("/")}
            target="_top"
          >
            <span className="status-dot" />
            <span>Log out</span>
          </a>
        ) : (
          <a
            className="login-link"
            href={chatGPTSignInPath(returnTo)}
            target="_top"
          >
            Log in ↗
          </a>
        )}
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer wrap">
      <p>Curated by {profile.firstName}. Built in the open.</p>
      <div className="footer-links">
        <a href={profile.repository} target="_blank" rel="noopener noreferrer">
          Make it yours ↗
        </a>
        <a href="https://tessl.io" target="_blank" rel="noopener noreferrer">
          Made with Tessl ↗
        </a>
      </div>
    </footer>
  );
}
