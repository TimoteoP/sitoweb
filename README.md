This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## MCP Environment Setup

- Purpose: Ensure VS Code launches MCP servers with required env vars.
- Files: `.vscode/mcp.json:1` uses `${env:VAR}` lookups. `.env.local` is for Next.js only and is not read by MCP.

### Launch VS Code with Env

- macOS/Linux: launch from a terminal session that has the vars loaded.
  - Example: `code .`
- Windows: open a terminal (PowerShell/CMD) where vars are set, then run `code .`.

### Define Needed Variables

- Required: `SUPABASE_PROJECT_REF`, `SUPABASE_ACCESS_TOKEN`, `REF_API_KEY`, `SEMGREP_APP_TOKEN`, `OPENAI_API_KEY`.
- Optional (app only): `BREVO_API_KEY`, `BREVO_LIST_ID`, `NEXT_PUBLIC_*` remain in `.env.local`.

### Quick Setup (shell profiles)

- zsh (macOS default): add to `~/.zshrc`
  - `export SUPABASE_PROJECT_REF=...`
  - `export SUPABASE_ACCESS_TOKEN=...`
  - `export REF_API_KEY=...`
  - `export SEMGREP_APP_TOKEN=...`
  - `export OPENAI_API_KEY=...`
  - Then: `source ~/.zshrc && code .`

- bash (Linux): add to `~/.bashrc` (or `~/.bash_profile` on macOS if using bash)
  - Same `export` lines as above, then `source ~/.bashrc && code .`

- Windows (PowerShell): set user env and restart VS Code
  - `setx SUPABASE_PROJECT_REF "..."`
  - `setx SUPABASE_ACCESS_TOKEN "..."`
  - `setx REF_API_KEY "..."`
  - `setx SEMGREP_APP_TOKEN "..."`
  - `setx OPENAI_API_KEY "..."`
  - Close all VS Code windows, reopen from the same terminal with `code .`

Notes

- Do not put secrets into `NEXT_PUBLIC_*`.
- If VS Code is launched from the Dock/Start menu, it may not inherit shell env. Prefer launching with `code .` from a terminal where your profile has been sourced.
