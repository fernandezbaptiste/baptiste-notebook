# Authentication and storage

Sites handles sign-in and session cookies. The server reads identity through `app/chatgpt-auth.ts`; draft pages and the draft API both reject anonymous access. These responses must never be publicly cached. No passwords or model API keys are collected by the app.

The local Sites helper simulates sign-in only on loopback and strips incoming identity headers. That helper is development-only. Never expose the dev server to the internet.

Production trusts identity headers inserted by the Sites gateway. Do not deploy the worker directly to an untrusted public origin with this authentication adapter: visitors could forge those headers. If deploying elsewhere, replace the adapter with your host's verified server-side session implementation. Keep the route tests and add your provider's integration tests.

Sample stories, drafts and author context in this open-source repository are public. Sign-in controls the drafting UI; it does not make tracked source files confidential. Private future content belongs in authenticated storage, not this public Git repository.

Editor changes are saved only in the current browser, namespaced by Site user and story. They are not sent to LinkedIn, synced between devices, or supplied to the content skill. On a shared computer, reset edits or clear site storage before leaving.
