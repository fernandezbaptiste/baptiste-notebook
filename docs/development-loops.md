# Development with Tessl

The project is connected to the public GitHub repository. The intended flow is:

1. A maintainer reviews an issue and applies `tessl`.
2. Tessl implements it on a branch, using `AGENTS.md` and the relevant content skills, and opens a PR.
3. CI checks content, types, authentication routes and the production build.
4. A maintainer reviews the result, requests changes, and decides whether to merge.

Public-repository defaults restrict follow-up comments and reviews to the maintainers/admins present at setup. Check results alone do not start repair runs. Automatic merge-conflict sweeps and finding-to-ticket loops remain off. Agents do not merge or deploy.

Activation status and project links are recorded in `docs/tessl-status.json`. Configuration being present is not proof an automation is running. Read the live Loops list before changing setup, to avoid duplicates.

Content refresh uses `skills/curate-stories/SKILL.md`. Ask for a few new stories through the issue template, then review and label the request. It produces a reviewable content PR, not a live model request on every page load. This first version has no recurring content schedule and no browser-side model key.

For a fork, connect your own repository and workspace in Tessl. Review its public-repository defaults and use your own human CODEOWNER. Do not inherit this project's IDs, environments or triggers. Start with one bounded task before scheduling recurring work.

Factory guide: https://docs.tessl.io/automations/factory-on-public-repositories
