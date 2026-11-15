import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/chrome";
import { getStory } from "@/lib/content";
import { getChatGPTUser, chatGPTSignInPath } from "@/app/chatgpt-auth";
export const dynamic = "force-dynamic";
export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();
  const user = await getChatGPTUser();
  return (
    <>
      <Header signedIn={!!user} returnTo={`/drafts/${id}`} />
      <main id="main" className="detail wrap">
        <Link className="back-link" href="/">
          ← Back to the notebook
        </Link>
        <div className="story-meta">
          <span className={`company-dot ${story.company.toLowerCase()}`} />
          {story.company}
          <span className="meta-separator">/</span>
          {story.topic}
          {story.archive && (
            <span className="archive">
              From the archive · {story.publishedAt.slice(0, 4)}
            </span>
          )}
        </div>
        <h1>{story.title}</h1>
        <p className="summary">{story.summary}</p>
        <ol className="facts">
          {story.facts.map((fact, i) => (
            <li key={fact}>
              <span className="fact-number">{i + 1}</span>
              <span>{fact}</span>
            </li>
          ))}
        </ol>
        <div className="source-links">
          {story.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.title} ↗
            </a>
          ))}
          <span className="source-date">
            {story.dateKind}{" "}
            {new Date(story.publishedAt + "T12:00:00Z").toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              },
            )}
          </span>
        </div>
        <div className="detail-actions">
          {user ? (
            <Link className="primary-button" href={`/drafts/${id}`}>
              Open LinkedIn draft ↗
            </Link>
          ) : (
            <a
              className="primary-button"
              href={chatGPTSignInPath(`/drafts/${id}`)}
              target="_top"
            >
              Log in for a draft ↗
            </a>
          )}
          <small>A starting point, in Baptiste’s voice.</small>
        </div>
        {story.image && (
          <details className="source-image">
            <summary>See the annotated example</summary>
            <figure style={{ margin: 0 }}>
              <img src={story.image.src} alt={story.image.alt} loading="lazy" />
              <figcaption>{story.image.credit}</figcaption>
            </figure>
          </details>
        )}
      </main>
      <Footer />
    </>
  );
}
