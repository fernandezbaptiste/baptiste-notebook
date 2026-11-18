import { getChatGPTUser } from "./chatgpt-auth";
import { Header, Footer } from "@/components/chrome";
import { stories, edition, profile } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function Home() {
  const user = await getChatGPTUser();
  return (
    <>
      <Header signedIn={!!user} />
      <main id="main" className="home wrap">
        <section className="intro">
          <p className="eyebrow">A notebook by {profile.firstName}</p>
          <h1>
            worth a <em>look.</em>
          </h1>
          <p className="lede">Good ideas in developer growth &amp; AI.</p>
        </section>
        <div className="list-caption">
          <span>A few things worth your time</span>
          <span>{edition.label}</span>
        </div>
        <ol className="stories">
          {stories.map((story, i) => (
            <li
              key={story.id}
              className="story-row"
              style={{ "--order": i } as React.CSSProperties}
            >
              <span className="story-number">0{i + 1}</span>
              <div className="story-info">
                <div className="story-meta">
                  <span
                    className={`company-dot ${story.company.toLowerCase()}`}
                  />
                  {story.company}
                  <span className="meta-separator">/</span>
                  {story.topic}
                  {story.archive && (
                    <span className="archive">
                      From the archive · {story.publishedAt.slice(0, 4)}
                    </span>
                  )}
                </div>
                <h2>
                  <a href={`/stories/${story.id}`}>
                    {story.title}
                    <span className="title-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </h2>
                <p>{story.summary}</p>
              </div>
              <a
                className="row-action"
                href={user ? `/drafts/${story.id}` : `/stories/${story.id}`}
                aria-label={`${user ? "Draft a post about" : "Read about"} ${story.company}`}
              >
                {user ? "Draft post" : "Take a look"}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="below-list">
          <span className="tiny-star" aria-hidden="true">
            ✳
          </span>
          <p>A small selection. Always a source.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
