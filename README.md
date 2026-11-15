# Worth a look

A small personal notebook for developer growth and AI. Three sourced stories; sign in for a LinkedIn draft you can edit and copy. Built by Baptiste Fernandez, and open for you to make your own.

## Run it

Node 24 or later:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5178
```

Open http://127.0.0.1:5178. Local sign-in is a loopback-only development simulation; no account or API key is needed. Production uses Sign in with ChatGPT through Sites.

```sh
npm run check
npm run build
# With the local dev server running:
npm run test:routes
```

## Make it yours

1. Fork the repository. Replace `content/profile.json` with your name, focus and confirmed context.
2. Adapt `skills/baptiste-content-advisor/` to your voice. Keep a few examples of what you would actually share.
3. Replace the example stories and drafts in `content/`. Keep sources and publication dates. The shipped Supabase story is explicitly an older example.
4. Replace `.github/CODEOWNERS` with your own GitHub handle, and connect your own repository in Tessl.
5. For your own hosted Site, remove the original `project_id` from `.openai/hosting.json` before registering a new Site. Do not publish into Baptiste’s project. If hosting elsewhere, replace the authentication adapter as described below.

## How the content works

This version serves an editorial selection prepared with the repo’s skills. It does not call an LLM on every page load or pretend to be a live news feed. A content-refresh task uses `skills/curate-stories/SKILL.md`, checks original sources and proposes a PR with new stories and draft copy. The maintainer reviews it before merge.

- `content/stories.json`: the public reading list, evidence and sources.
- `content/drafts.json`: sample copy for the drafting UI. These tracked samples are public through GitHub.
- `content/profile.json`: author facts that are safe to use.
- `skills/`: curation and writing guidance, including feedback from developing the first posts.
- `app/`, `components/`: a small React interface with server-side authentication.
- `docs/development-loops.md`: the Tessl issue → PR → review workflow and activation status.

Draft edits stay in your browser, separated by signed-in user and story. They do not sync across devices or train the skills. Nothing posts to LinkedIn.

## Hosting and authentication

Built with React, TypeScript and Vinext; production builds to a Cloudflare Worker with the Sites integration. The Sites gateway handles real identity. The local helper is not production authentication. Read [authentication.md](docs/authentication.md) before moving to another host; never trust raw identity headers on a direct public Worker deployment.

GitHub Actions runs content validation, TypeScript, the production build, and authentication-route checks on every PR. Publishing the hosted Site is a separate reviewed action; a GitHub merge alone does not deploy it.

## License

MIT for original code and skills. Third-party imagery, articles, logos and vendored helpers keep their own rights. See [THIRD_PARTY.md](THIRD_PARTY.md).
