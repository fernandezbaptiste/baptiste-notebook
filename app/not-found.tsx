import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wrap empty">
      <p className="eyebrow">Nothing here</p>
      <h1>A page gone astray.</h1>
      <p>The notebook is a good place to start.</p>
      <Link className="primary-button" href="/">
        Back to the notebook ↗
      </Link>
    </main>
  );
}
