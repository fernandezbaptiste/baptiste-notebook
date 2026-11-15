// Only import from authenticated server pages/routes; never from client components.
import drafts from "@/content/drafts.json";
export function getDraft(id: string) {
  return drafts.find((draft) => draft.storyId === id);
}
