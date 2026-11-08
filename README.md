# Assessment Lab

A responsive academic poster and audience activity built with React, TypeScript, and Vite. Academic content comes from **Fair Assessment Group Essay(1).docx**, titled *Fair Assessment and Student Learning in Higher Education*. All visitor-facing content is in English.

## Run locally

Use Node.js 22.13 or newer. From this project folder:

```sh
npm install
npm run dev
```

Open **http://127.0.0.1:5173/**. No login, API keys, database, or backend is required. Stop the development server with Ctrl+C.

Alternatively, use the included pnpm lockfile: `pnpm install --frozen-lockfile`, then `pnpm dev`.

```sh
npm test
npm run build
npm run preview
```

The production build is written to `dist/` and can be served by any static host. The optional Sites hosting configuration is in `.openai/hosting.json`; it is not required for local use.

## Complete these fields before the assessment

Edit **src/data.ts** for permanent changes:

- `team[].contribution`: actual **poster/website** work by each of the five members. The supplied essay's contribution statement has deliberately not been reused as poster contributions.
- `peerFeedback.changes`: actual peer feedback and the changes the team made. No feedback has been invented.

The **Edit team details** button also supports quick session edits for a presentation or printout. **Export team details** downloads a JSON copy. Browser edits are not shared, do not update the source file, and are lost when the browser session ends. Transfer the exported values into `src/data.ts` and rebuild to make permanent updates.

## Activity

1. Choose an initial grade, then save it to reveal the rubric.
2. Read constructive feedback and select a score from 0 to 4 for each criterion. Every level has a descriptor, and no scores are preselected.
3. Compare the grades and optionally record a reflection.

The calculation is `(clarity / 4 * 30) + (evidence / 4 * 40) + (alternatives / 4 * 30)`. For example, 3, 1, and 0 produce 32.5/100. There is no predetermined correct grade. The illustrative **72** in the hero is not an answer to the activity.

Activity responses remain in `sessionStorage` for this tab's browser session. No response data is sent to a service. If storage is blocked, the app continues using memory and explains that limitation. **Reset activity** clears the activity's initial choice, ratings, and reflection; it does not erase team edits.

## Print

Use **Print poster** in a normal browser. Select **A3**, **landscape**, **100% scale**, and disable browser headers/footers. Enable background graphics for the intended colour accents. The dedicated print view contains the argument, approach, evidence themes, accounts, limitations, proposed practices, all ten references with DOI links, contributions, and peer feedback. Controls and session grades are hidden; a concise explanation of the fictional demonstration is printed instead.

Some embedded app browsers suppress print dialogs. If the button does not open one, open the local URL in Firefox, Chrome, or Edge. Keep team contributions concise to preserve the single-page A3 layout; unusually long edits can add pages, so inspect print preview after editing.

## Accessibility and source boundaries

Native links, buttons, disclosure controls, radios, a labelled slider, and textareas support keyboard input. The page includes a skip link, visible focus indicators, announced criterion descriptors, and reduced-motion styles. The narrow navigation row can be scrolled horizontally or traversed with Tab.

The five scholarly publications, five course reflections, and three external interview accounts are labelled according to their role. Interviews are paraphrased individual accounts, not a representative survey. Proposed teaching practices and the website's rubric are not presented as interventions tested by this project. All ten bibliography entries and five DOI links reproduce the supplied essay.

The screen uses Google Fonts with system fallbacks; an internet connection improves typographic fidelity but is not needed for the activity. The print layout uses local Arial and Georgia.

## Source map

- `src/data.ts` — academic content, exact references, rubric descriptors, editable team defaults.
- `src/App.tsx` — interactive poster, activity, team editor, print edition.
- `src/scoring.ts` — weighted calculation and validated activity restoration.
- `src/styles.css` — responsive layout, reduced-motion rules, and A3 print styles.
- `tests/scoring.test.ts` — scoring boundaries, all 125 rating combinations, invalid state, reset defaults.
