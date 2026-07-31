# Siddhi More — Personal Portfolio

A premium, animation-rich personal portfolio built with **plain HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build tools, no dependencies to install.

## Folder structure

```
portfolio/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/          # SVG placeholders — swap for real photos/screenshots
├── assets/          # Resume + certificate placeholder files
└── README.md
```

## Running it locally

No build step is required. Pick any one of these:

1. **Just open it** — double-click `index.html` and it will open in your browser.
2. **VS Code Live Server** — install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".
3. **Python's built-in server** (recommended, avoids any local file-access quirks with fonts/canvas):
   ```bash
   cd portfolio
   python3 -m http.server 5500
   ```
   Then visit `http://localhost:5500` in your browser.

## What to customize before publishing

| Item | Where |
|---|---|
| Name, tagline, bio copy | `index.html` — Hero & About sections |
| Profile photo | `images/profile-placeholder.svg` → replace with a real photo (keep the filename or update the `src` in `index.html`) |
| Project images, links, descriptions | The `PROJECTS` array at the top of `js/script.js` |
| Resume PDF | `assets/resume.pdf` → replace with your real resume |
| Internship certificates | `assets/certificate-*.pdf` |
| Email, phone, social links | Hero social icons + Contact section in `index.html` |
| Skills & percentages | Skills section in `index.html` (`data-fill` / `data-counter` attributes) |
| Testimonials | Testimonials section in `index.html` |
| Colors / theme | CSS variables at the top of `css/style.css` (`:root`) |

## Features included

- Dark theme by default with a **light/dark toggle** saved to `localStorage`
- Animated hero with a mouse-reactive **canvas network background**, floating gradient blobs and a typing effect
- Scroll progress bar, custom cursor + cursor glow (desktop only), glass navbar that activates on scroll
- Scroll-triggered fade/slide reveals via `IntersectionObserver`
- Animated number counters, skill progress bars and circular skill indicators
- Vertical timelines for Education and Experience
- Projects grid with **live search + category filtering** and a **project detail modal**
- Testimonials carousel with autoplay, dots and manual controls
- Contact form with real-time client-side validation and a success state (front-end only — wire up your own backend or a service like Formspree to actually send email)
- Fully responsive from desktop down to small mobile screens, no horizontal scroll
- Accessible: semantic landmarks, ARIA labels, visible focus states, skip-to-content link, `prefers-reduced-motion` respected

## Wiring up the contact form

The form currently simulates a successful submission client-side. To make it functional, either:

- Point the `<form>` at a service like **Formspree**, **Web3Forms**, or **EmailJS** and update `js/script.js`'s submit handler to call their API, or
- Add your own backend endpoint (e.g. a small FastAPI route) and `fetch()` it from the same handler.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses `backdrop-filter`, CSS custom properties, and the Canvas API — all broadly supported since 2021+.

---

Built with care, one section at a time. Good luck with the recruiter pipeline. 🚀
