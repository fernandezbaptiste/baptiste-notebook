"use client";
import { useState, useEffect } from "react";
export function DraftEditor({
  id,
  userKey,
  initialCopy,
}: {
  id: string;
  userKey: string;
  initialCopy: string;
}) {
  const [copy, setCopy] = useState(initialCopy);
  const [notice, setNotice] = useState("");
  const [loaded, setLoaded] = useState(false);
  const storageKey = `notebook:draft:v1:${userKey}:${id}`;
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) setCopy(saved);
    } catch {}
    setLoaded(true);
  }, [storageKey]);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(storageKey, copy);
      } catch {}
    }
  }, [copy, loaded, storageKey]);
  async function copyPost() {
    try {
      await navigator.clipboard.writeText(copy);
      setNotice("Copied. Ready when you are.");
    } catch {
      setNotice("Clipboard unavailable. Select the text and copy it manually.");
    }
  }
  const words = copy.trim() ? copy.trim().split(/\s+/).length : 0;
  return (
    <section className="draft-shell" aria-label="LinkedIn draft editor">
      <div className="draft-heading">
        <h2>Your starting point</h2>
        <span>{words} words</span>
      </div>
      <label htmlFor="draft-copy" className="sr-only">
        Edit your LinkedIn draft
      </label>
      <textarea
        id="draft-copy"
        className="draft-editor"
        value={copy}
        onChange={(e) => {
          setCopy(e.target.value);
          setNotice("");
        }}
        spellCheck
      />
      <div className="draft-toolbar">
        <div className="draft-toolbar-actions">
          <button className="primary-button" onClick={copyPost}>
            Copy post ↗
          </button>
          <button
            className="secondary-button"
            disabled={copy === initialCopy}
            onClick={() => {
              if (
                window.confirm("Replace your edits with the original draft?")
              ) {
                setCopy(initialCopy);
                setNotice("Original draft restored.");
              }
            }}
          >
            Reset
          </button>
        </div>
        <p className="draft-hint">
          Edits stay in this browser.
          <br />
          Nothing posts automatically.
        </p>
      </div>
      <p role="status" className="notice">
        {notice}
      </p>
    </section>
  );
}
