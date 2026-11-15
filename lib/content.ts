import data from "@/content/stories.json";
import author from "@/content/profile.json";
export const stories = data.stories;
export const edition = data.edition;
export const profile = author;
export function getStory(id: string) {
  return stories.find((story) => story.id === id);
}
