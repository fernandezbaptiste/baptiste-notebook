import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getDraft } from "@/lib/drafts.server";
export const dynamic = "force-dynamic";
const responseHeaders = {
  "Cache-Control": "private, no-store",
  Vary: "Cookie",
  "X-Content-Type-Options": "nosniff",
};
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getChatGPTUser()))
    return Response.json(
      { error: "Sign in to read drafts." },
      { status: 401, headers: responseHeaders },
    );
  const { id } = await params;
  const draft = getDraft(id);
  if (!draft)
    return Response.json(
      { error: "Draft not found." },
      { status: 404, headers: responseHeaders },
    );
  return Response.json(draft, { headers: responseHeaders });
}
