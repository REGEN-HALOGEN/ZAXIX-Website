# Infrastructure Media Guidelines

This project reads media files from `public/Infra` and shows them in the **Infrastructure** gallery embedded on the homepage (`#infrastructure`).

Embedding behavior

- The `Infrastructure` section is embedded into the main page and reachable by scrolling to `#infrastructure`.
- The site header contains a link to `#infrastructure` which performs a smooth scroll when clicked on the same page, and navigates to `/#infrastructure` when clicked from other routes. The header link is placed **after Systems** and **before About** in the main nav.

How it works

- Run `npm run generate-infra-manifest` to generate `public/Infra/manifest.json` which the app reads at runtime from `/Infra/manifest.json`.
- The script includes supported image and video extensions and attempts to find a poster image for videos when a same-named image exists.

Naming recommendations

- Use readable names: `sterilizing-tunnel-demo.mp4` → caption will be `Sterilizing Tunnel Demo`.
- For videos, add a poster with the same base name (e.g., `sterilizing-tunnel-demo.jpg`) for better UX.

Accessibility & best practices

- Ensure videos have captions/subtitles (VTT) using the same base file name (`video.vtt`) if available.
- Add alt text by naming files descriptively — the gallery derives alt text from filenames.

Testing

- Use `npm run test:infra` to validate that `public/Infra/manifest.json` exists and referenced files are present.

Maintenance

- Whenever you add or remove files, re-run `npm run generate-infra-manifest`.

Edge cases

- Hidden files (starting with `.`) and `manifest.json` itself are ignored.
- Unsupported file types are ignored.
- Empty manifest shows a friendly placeholder with instructions to add assets.
