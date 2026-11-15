import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";
const read = (path) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const { stories, edition } = read("../content/stories.json");
const drafts = read("../content/drafts.json");
test("every story has evidence, a valid date, a unique safe path and an available credited asset", () => {
  assert.ok(
    stories.length > 0 && stories.length <= 6,
    "Keep the front page small",
  );
  const ids = new Set();
  for (const story of stories) {
    assert.match(story.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!ids.has(story.id));
    ids.add(story.id);
    assert.ok(story.title && story.summary && story.company && story.topic);
    assert.ok(story.facts.length > 0 && story.sources.length > 0);
    assert.ok(!Number.isNaN(Date.parse(story.publishedAt)));
    assert.ok(!Number.isNaN(Date.parse(story.verifiedAt)));
    assert.ok(story.publishedAt <= story.verifiedAt);
    assert.ok(story.verifiedAt <= edition.selectedAt);
    for (const source of story.sources) {
      assert.equal(new URL(source.url).protocol, "https:");
      assert.ok(source.title);
    }
    if (story.image) {
      assert.match(story.image.src, /^\/images\/[a-z0-9-]+\.(png|jpg|webp)$/);
      assert.ok(story.image.alt && story.image.credit);
      assert.ok(
        existsSync(new URL("../public" + story.image.src, import.meta.url)),
      );
    }
  }
});
test("drafts match selected stories and retain source attribution", () => {
  assert.equal(drafts.length, stories.length);
  assert.equal(new Set(drafts.map((d) => d.storyId)).size, drafts.length);
  for (const draft of drafts) {
    const story = stories.find((s) => s.id === draft.storyId);
    assert.ok(story);
    assert.equal(draft.status, "draft");
    assert.ok(
      story.sources.some((s) => draft.copy.includes(s.url)),
      "Every draft must credit a source",
    );
    assert.ok(draft.copy.length > 80);
  }
});
test("the public content module does not ship draft copy", () => {
  const publicModule = readFileSync(
    new URL("../lib/content.ts", import.meta.url),
    "utf8",
  );
  assert.ok(!publicModule.includes("drafts.json"));
  for (const path of [
    "../app/page.tsx",
    "../components/chrome.tsx",
    "../components/draft-editor.tsx",
  ])
    assert.ok(
      !readFileSync(new URL(path, import.meta.url), "utf8").includes(
        "drafts.json",
      ),
    );
});
