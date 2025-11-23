# Repository Guidelines

## Project Structure & Module Organization
- `book.toml`: mdBook configuration; outputs to `book/`.
- `src/`: Markdown sources (Japanese). Chapters live in `src/chapter_N/` with `README.md` and numbered sections (e.g., `3-1.md`).
- `src/SUMMARY.md`: Navigation and build order. Always add new pages here.
- `book/`: Generated site (do not edit; CI publishes this).
- `.github/workflows/deploy.yml`: GitHub Pages deployment on pushes to `main`.

## Build, Test, and Development Commands
- `mdbook build`: Build the static site into `book/`.
- `mdbook serve -n 0.0.0.0 -p 3000`: Live-reload server for local preview.
- Example workflow: edit files in `src/` → run `mdbook build` → open `book/index.html` or use `mdbook serve`.

## Coding Style & Naming Conventions
- Language: Japanese content; keep headings and terms consistent with existing chapters.
- Markdown: Use ATX headings (`#`, `##`), wrap lines at ~100 cols, lists with `-`.
- Code fences: specify language, e.g.,
  ```dart
  void main() => print('Hello, World!');
  ```
  ```sh
  mdbook build
  ```
- Files: `chapter_N/README.md` as chapter index; section files `N-M.md` (match `SUMMARY.md`).
- Assets: place images per chapter (e.g., `src/chapter_3/img/fig1.png`) and reference relatively.

## Testing Guidelines
- No unit tests; the build is the check. Ensure `mdbook build` passes with no errors/warnings.
- Validate links and images render in `mdbook serve` before opening a PR.

## Commit & Pull Request Guidelines
- Current history is informal; adopt Conventional Commits going forward:
  - `feat: add 3-2 variables examples`
  - `fix: correct link in chapter_5 README`
- PRs: small, focused changes with clear description, screenshots of rendered pages when layout/figures change, and references to issues.
- Do not commit `book/`; CI publishes from `main` via GitHub Actions.

## Security & Configuration Tips
- Pages deploy uses `GITHUB_TOKEN`; no extra secrets required.
- To use a custom domain, set `cname` in `.github/workflows/deploy.yml` and configure DNS.
- Avoid external scripts; prefer local assets committed under `src/`.
