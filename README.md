# Video Review Dashboard

A self-contained HTML, CSS, and JavaScript dashboard for reviewing and tagging MP4 videos. The interface mirrors the original
React prototype but now runs without any build tooling or package dependencies.

## Getting started

Open `index.html` in your browser. All behaviour is implemented with vanilla JavaScript in `app.js` and the layout is styled by
`styles.css`.

## Customisation

- Update the video metadata in `app.js` by editing the `RAW_VIDEOS` array. Each item supports `filename`, `src`, `poster`,
  `title`, and `description` fields.
- Adjust tag categories inside `app.js` by modifying the `TAG_CATEGORIES` array. Tags toggleable by reviewers update in real time
  in the interface.
- The layout and theme tokens live in `styles.css`. Tweak the CSS variables at the top of the file to update the colour palette
  and typography.

## Roadmap placeholders

- **Analysis** – Reserved for charting tag usage, reviewer activity, and other insights once a data layer is available.
- **Video Library** – Intended for search and filtering experiences built on top of saved tags and metadata.
