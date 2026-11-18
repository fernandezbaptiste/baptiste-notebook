import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/chrome";
import { DraftEditor } from "@/components/draft-editor";
import { getStory } from "@/lib/content";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { getDraft } from "@/lib/drafts.server";
export const dynamic = "force-dynamic";
export default async function DraftPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();
  const user = await requireChatGPTUser(`/drafts/${id}`);
  const draft = getDraft(id);
  if (!draft) notFound();
  return (
    <>
      <Header signedIn />
      <main id="main" className="detail wrap">
        <a className="back-link" href="/">
          ← Back to the notebook
        </a>
        <div className="story-meta">
          {story.company}
          <span className="meta-separator">/</span>LinkedIn draft
        </div>
        <h1>{story.title}</h1>
        <DraftEditor id={id} userKey={user.userId} initialCopy={draft.copy} />
        <a className="draft-link" href={`/stories/${id}`}>
          Check the story &amp; sources ↗
        </a>
        {story.image && (
          <details className="source-image">
            <summary>Image &amp; credit</summary>
            <figure style={{ margin: 0 }}>
              <a
                href={story.image.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={story.image.src}
                  alt={story.image.alt}
                  loading="lazy"
                />
              </a>
              <figcaption>{story.image.credit}</figcaption>
            </figure>
          </details>
        )}
      </main>
      <Footer />
    </>
  );
}
