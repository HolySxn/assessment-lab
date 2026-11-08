# Verification record

Verified on 8 November 2026.

- TypeScript check and Vite production build: passed.
- Seven automated test groups: passed, including all 125 rating combinations, 0/100 boundaries, incomplete input, invalid restored state, and reset defaults.
- Browser activity: initial score locked; rubric and feedback revealed; no criterion rating preselected; comparison disabled until all three criteria were rated.
- Keyboard: slider Home/End/arrow input worked; radio arrow input changed the selected criterion score.
- Browser calculation: initial grade 100, ratings 3/1/0 produced 32.5 and a difference of -67.5, with the correct per-criterion breakdown.
- Session reload: initial grade, rubric scores, comparison step, reflection, and team edits were retained.
- Reset: returned to the initial step and removed criterion selections; temporary test reflections and team edits were removed.
- Navigation: activity, evidence, recommendations, references, team, and overview anchors worked.
- Grade illustration: the reveal toggle opened the criteria/evidence/feedback layers and exposed the expanded state.
- Responsive layout: inspected at desktop/tablet size and a 390 px viewport; 320 px overflow was found and fixed. Final 320 px check reported matching document and viewport content widths of 305 px (the remaining width was the scrollbar).
- Browser console: no error or warning entries were returned during verification.
- Source audit: all ten bibliography entries and five DOI URLs match the supplied essay exactly.
- Research cross-check: publisher pages confirmed Biggs, Double, Panadero, and Wisniewski. The Koenka publisher page blocked direct retrieval; its DOI, bibliographic details, school population, and central comparison were confirmed on the author's Duke institutional record: https://scholars.duke.edu/publication/1427115.
- Reduced motion: the CSS disables animation, transitions, animated hover movement, and smooth scrolling under `prefers-reduced-motion: reduce`. This was inspected statically; OS-level motion emulation was not available in the browser tool.
- Print: a dedicated A3 landscape stylesheet and complete static academic poster are implemented. The embedded browser suppressed the print dialog. Firefox automation was stopped because the tool cannot enforce its URL policy for that Windows browser. The user is checking Firefox print preview independently; visual print validation is pending.
- Publication: the Site is registered as private but has not been published. Automatic approval review rejected source synchronization to the external Sites repository pending explicit user approval of that destination and content. Local source and production output are complete.

The team still needs to provide actual poster contributions and actual changes after peer feedback. No such information has been invented.
