"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="wrap empty">
      <h1>A little hiccup.</h1>
      <p>Something didn’t load. Your saved edits are still in this browser.</p>
      <button className="primary-button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
