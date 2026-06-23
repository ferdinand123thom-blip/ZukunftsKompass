# CLAUDE.md — Projekt-Briefing ZukunftsKompass

> Dieses Dokument ist mein dauerhaftes Briefing. Ich lese es zu Beginn jeder Sitzung
> und richte meine Arbeit danach aus.

## Sprache
Antworte mit dem Nutzer **immer auf Deutsch**.

## Über das Projekt
ZukunftsKompass ist eine moderne, hochwertige und verständliche Website, die jungen
Menschen Orientierung für wichtige Lebensentscheidungen nach der Schule gibt:
**Geld, Wohnen, Ausbildung, Studium, Beruf, Versicherungen und Verträge**.

Die Seite soll wie ein **professioneller, vertrauenswürdiger digitaler Ratgeber**
wirken – nicht wie ein Schulprojekt.

## Ziel und Strategie
- Zuerst **echten Mehrwert** für Jugendliche liefern und **Vertrauen aufbauen**.
- Gleichzeitig **dezent und seriös** die Kompetenz der **Deutsche Finanz Service GmbH**
  und des **Bankshop** im Bereich Finanzbildung und Zukunftsplanung sichtbar machen.
- **Bildungscharakter steht immer vorn**; Werbung wird vermieden.
- Ein wirtschaftlicher Nutzen darf **langfristig** entstehen, ohne dass die Seite wie
  Reklame wirkt.

## Arbeitsweise
- **Bestehenden Code respektieren** und intelligent weiterentwickeln – nicht alles neu
  erfinden.
- Reihenfolge: **erst analysieren**, dann die wichtigsten Verbesserungen erkennen, dann
  **sauber und nachvollziehbar umsetzen**.
- Bei **größeren Änderungen über mehrere Dateien** vorher **kurz erklären**, was
  geändert wird und warum.
- Gute bestehende Seiten **nicht verschlechtern**; funktionierende Inhalte **nicht ohne
  Grund entfernen**.
- Ergebnis soll **einheitlich, modern, mobilfreundlich und professionell** wirken.

## Technik
- **Statische Website**: HTML, **eine zentrale CSS-Datei**, etwas JavaScript.
- **GitHub** bleibt die zentrale technische Grundlage; Änderungen werden hier
  **committet und gepusht**.
- Kein Build-Schritt, kein Framework – schlanke, wartbare Struktur bewahren.

### Projektstruktur (Stand der Analyse)
- `index.html` — Startseite
- `assets/css/styles.css` — **zentrale Stildatei** (Änderungen am Design hier bündeln)
- `assets/js/main.js` — zentrales JavaScript
- `themen/` — sechs Themenbereiche, jeweils mit `index.html` plus Detailseiten:
  - `geld-finanzen/`
  - `wohnen/`
  - `ausbildung-studium/`
  - `beruf-arbeit/`
  - `versicherungen/`
  - `vertraege-rechtliches/`

### Konventionen
- Neue Inhaltsseiten in den passenden `themen/`-Ordner einsortieren und sich am Aufbau
  bestehender Seiten orientieren (Struktur, Klassen, Tonalität).
- Styling **zentral** in `styles.css` pflegen statt verstreutem Inline-CSS.
