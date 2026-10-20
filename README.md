# Suryaprakash R. – Portfolio

Plain HTML, CSS and JavaScript. No build step, backend or framework.

## Run locally
Open `index.html` in a browser, or from this folder run `python3 -m http.server 8000` and visit http://localhost:8000.
Fonts (Manrope, DM Sans, Instrument Serif) load from Google Fonts; the page falls back to system fonts offline.

## Files
- `index.html` – content and structure
- `style.css` – styling; colours and fonts are custom properties at the top
- `script.js` – mobile menu, scroll reveal, footer year, missing-image fallback
- `assets/` – portrait and static files
- `assets/projects/` – project images

## Required: add the CV
Place the real CV in the project root named exactly **`Suryaprakash_R_CV.pdf`**.
Until it exists, both "Download CV" links will fail (no file is included on purpose).

## Add the experience certificate
Place the GVQ Design Studio experience certificate in the project root named exactly **`GVQ_Experience_Certificate.pdf`**. The "View experience certificate" button opens it in a new tab.

## Add the portrait
Save a photo as `assets/portrait.jpg` (about 4:5 portrait ratio). Until then a placeholder shows. Update the caption in `index.html` (`<figcaption>`) afterwards.

## Add the residential plan PDF
Save the project PDF as `assets/projects/residential-building-plan.pdf`. The "View Work" button in the Selected Projects section opens this file in a new tab.

## Notes
All content comes only from the supplied CV details. The exact RM CADD Center course title was not provided, so none is shown; add it in the Education section if you want it.
