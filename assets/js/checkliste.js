/* =============================================================================
   checkliste.js – Logik für die Checklisten
   -----------------------------------------------------------------------------
   Wird auf BEIDEN Seiten eingebunden und erkennt anhand eines Mount-Elements,
   was zu tun ist:
     - #cl-overview  -> Übersichtsseite: Karten aus den Daten erzeugen
     - #cl-content   -> Einzelseite: gewählte Checkliste als Klemmbrett aufbauen

   Die Inhalte stehen in checklisten-data.js (Objekt CHECKLISTEN).

   Datenschutz: Es wird NICHTS gespeichert. Das Abhaken ist nur eine Markierung
   während des Besuchs und ist nach dem Neuladen wieder leer (kein localStorage).
   ============================================================================= */

(function () {
  "use strict";

  if (typeof CHECKLISTEN === "undefined") {
    return;
  }

  const overview = document.getElementById("cl-overview");
  if (overview) {
    renderOverview(overview);
  }

  const content = document.getElementById("cl-content");
  if (content) {
    renderSingle(content);
  }

  /* --- Icons für die Übersichtskarten ------------------------------------ */
  // Wähle das Icon pro Checkliste über das Feld "icon" in checklisten-data.js.
  // Ohne Angabe wird das Klemmbrett-Icon verwendet.
  function iconMarkup(name) {
    const icons = {
      klemmbrett:
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<rect x="5" y="4" width="14" height="17" rx="2"></rect>' +
        '<path d="M9 4a3 3 0 0 1 6 0"></path>' +
        '<path d="M9 11h6"></path><path d="M9 15h6"></path>' +
        "</svg>",
      haus:
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="m3 11 9-8 9 8"></path>' +
        '<path d="M5 10v10h14V10"></path>' +
        '<path d="M10 20v-6h4v6"></path>' +
        "</svg>",
      koffer:
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"></path>' +
        '<rect x="4" y="6" width="16" height="13" rx="2"></rect>' +
        '<path d="M4 12h16"></path>' +
        "</svg>",
      ausweis:
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<rect x="3" y="5" width="18" height="14" rx="2"></rect>' +
        '<circle cx="8.5" cy="11" r="2"></circle>' +
        '<path d="M13 10h5"></path><path d="M13 14h5"></path>' +
        '<path d="M5.5 16a3 3 0 0 1 6 0"></path>' +
        "</svg>",
      werkzeug:
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"></path>' +
        "</svg>",
      studium:
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="m3 8 9-4 9 4-9 4-9-4Z"></path>' +
        '<path d="M7 10.5v4.2c0 1.2 2.2 2.3 5 2.3s5-1.1 5-2.3v-4.2"></path>' +
        "</svg>"
    };
    return icons[name] || icons.klemmbrett;
  }

  /* --- Übersicht: aktive Karten aus den Daten erzeugen ------------------- */
  // Die Reihenfolge auf der Seite bestimmt das HTML: Jede aktive Karte ersetzt
  // ihren Platzhalter <div data-checkliste="ID"> an genau dieser Stelle. Fehlt
  // ein Platzhalter, wird die Karte hinten angehängt.
  function renderOverview(grid) {
    Object.keys(CHECKLISTEN).forEach(function (id) {
      const cl = CHECKLISTEN[id];
      const anzahl = cl.phasen.reduce(function (n, p) {
        return n + p.aufgaben.length;
      }, 0);

      const a = document.createElement("a");
      a.className = "cl-card";
      a.href = "checkliste.html?id=" + encodeURIComponent(id);
      a.innerHTML =
        '<span class="cl-card-icon" aria-hidden="true">' + iconMarkup(cl.icon) + "</span>" +
        '<h2 class="cl-card-title"></h2>' +
        '<p class="cl-card-text"></p>' +
        '<span class="cl-card-meta"></span>' +
        '<span class="cl-card-cta">Checkliste öffnen <span aria-hidden="true">→</span></span>';
      a.querySelector(".cl-card-title").textContent = cl.titel;
      a.querySelector(".cl-card-text").textContent = cl.kurz || cl.intro;
      a.querySelector(".cl-card-meta").textContent =
        cl.phasen.length + " Phasen · " + anzahl + " Schritte";

      const slot = grid.querySelector('[data-checkliste="' + id + '"]');
      if (slot) {
        grid.replaceChild(a, slot);
      } else {
        grid.appendChild(a);
      }
    });
  }

  /* --- Einzelseite: Checkliste auf dem "Blatt" aufbauen ------------------ */
  function renderSingle(mount) {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (!id || !CHECKLISTEN[id]) {
      id = Object.keys(CHECKLISTEN)[0]; // Fallback: erste Checkliste
    }
    const cl = CHECKLISTEN[id];

    // SEO: Titel und Beschreibung aus den Daten setzen
    document.title = cl.titel + " – Checkliste | Zukunftskompass";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute("content", "Checkliste „" + cl.titel + "“: " + cl.intro);
    }

    // PDF-Download-Button mit dem passenden Pfad versehen
    const pdf = document.getElementById("cl-pdf");
    if (pdf && cl.pdf) {
      pdf.href = cl.pdf;
    }

    // Titel + Einleitung
    const h1 = document.createElement("h1");
    h1.className = "cl-titel";
    h1.textContent = cl.titel;
    mount.appendChild(h1);

    const intro = document.createElement("p");
    intro.className = "cl-intro";
    intro.textContent = cl.intro;
    mount.appendChild(intro);

    // Phasen + Aufgaben
    let nr = 0;
    cl.phasen.forEach(function (phase) {
      const section = document.createElement("section");
      section.className = "cl-phase";

      const h2 = document.createElement("h2");
      h2.className = "cl-phase-titel";
      h2.textContent = phase.name;
      section.appendChild(h2);

      const ul = document.createElement("ul");
      ul.className = "cl-tasks";

      phase.aufgaben.forEach(function (aufgabe) {
        nr++;
        const textId = "cl-task-text-" + nr;

        const li = document.createElement("li");
        li.className = "cl-task";

        // Abhak-Kästchen (Button mit role=checkbox, per Tastatur bedienbar)
        const box = document.createElement("button");
        box.type = "button";
        box.className = "cl-check";
        box.setAttribute("role", "checkbox");
        box.setAttribute("aria-checked", "false");
        box.setAttribute("aria-labelledby", textId);
        box.innerHTML =
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17.5 19 6.5"></path></svg>';
        box.addEventListener("click", function () {
          const checked = box.getAttribute("aria-checked") === "true";
          box.setAttribute("aria-checked", checked ? "false" : "true");
          li.classList.toggle("is-done", !checked);
        });

        const body = document.createElement("div");
        body.className = "cl-task-body";

        const text = document.createElement("span");
        text.className = "cl-task-text";
        text.id = textId;
        text.textContent = aufgabe.text;
        body.appendChild(text);

        if (aufgabe.link) {
          const link = document.createElement("a");
          link.className = "cl-task-link";
          link.href = aufgabe.link;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.innerHTML = 'Mehr dazu <span aria-hidden="true">↗</span>';
          link.setAttribute("aria-label", "Mehr dazu: " + aufgabe.text + " (öffnet in neuem Tab)");
          body.appendChild(link);
        }

        li.appendChild(box);
        li.appendChild(body);
        ul.appendChild(li);
      });

      section.appendChild(ul);
      mount.appendChild(section);
    });
  }
})();
