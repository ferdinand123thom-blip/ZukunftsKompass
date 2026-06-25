/* =============================================================================
   quiz.js – Programmlogik für den Zukunfts-Check
   -----------------------------------------------------------------------------
   Steuert den Ablauf: Start -> Fragen -> Ergebnis. Die Fragen selbst stehen in
   quiz-data.js (Variable QUIZ_FRAGEN) und werden dort gepflegt.

   Ablauf je Frage: Antwort auswählen -> "Antwort bestätigen" -> Auswertung mit
   Erklärung und Themenlink -> "Weiter".

   Datenschutz: Es werden KEINE Daten gespeichert oder gesendet. Alles läuft nur
   im Arbeitsspeicher während der aktuellen Sitzung.
   ============================================================================= */

(function () {
  "use strict";

  /* --- Elemente einsammeln ------------------------------------------------ */
  const startScreen = document.getElementById("quiz-start");
  const fragenScreen = document.getElementById("quiz-frage");
  const ergebnisScreen = document.getElementById("quiz-ergebnis");

  const startBtn = document.getElementById("quiz-start-btn");
  const bestaetigenBtn = document.getElementById("quiz-bestaetigen-btn");
  const weiterBtn = document.getElementById("quiz-weiter-btn");
  const nochmalBtn = document.getElementById("quiz-nochmal-btn");

  const fortschrittText = document.getElementById("quiz-fortschritt-text");
  const fortschrittBalken = document.getElementById("quiz-fortschritt-balken");
  const frageText = document.getElementById("quiz-frage-text");
  const antwortenListe = document.getElementById("quiz-antworten");
  const feedbackBox = document.getElementById("quiz-feedback");

  const ergebnisPunkte = document.getElementById("quiz-ergebnis-punkte");
  const ergebnisFeedback = document.getElementById("quiz-ergebnis-feedback");
  const ergebnisLinks = document.getElementById("quiz-ergebnis-links");

  // Ohne die Fragendatei kann das Quiz nicht laufen – defensiv abbrechen.
  if (typeof QUIZ_FRAGEN === "undefined" || !Array.isArray(QUIZ_FRAGEN) || !QUIZ_FRAGEN.length) {
    return;
  }

  /* --- Zustand der aktuellen Runde --------------------------------------- */
  let runde = [];          // gemischte Fragen dieser Runde (mit gemischten Antworten)
  let aktuelleNr = 0;      // Index der aktuell gezeigten Frage
  let punkte = 0;          // richtig beantwortete Fragen
  let beantwortet = false; // ist die aktuelle Frage schon ausgewertet?
  let auswahl = null;      // aktuell ausgewählte Antwort (Objekt), noch nicht bestätigt
  let auswahlButton = null; // zugehöriger Button der Auswahl
  const ergebnisse = [];   // pro Frage: { frage, korrektText, warRichtig, thema, link }

  /* --- Fisher-Yates-Shuffle ---------------------------------------------- */
  // Mischt eine Kopie des Arrays gleichmäßig zufällig und gibt sie zurück.
  function mischen(liste) {
    const kopie = liste.slice();
    for (let i = kopie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const merker = kopie[i];
      kopie[i] = kopie[j];
      kopie[j] = merker;
    }
    return kopie;
  }

  /* --- Neue Runde vorbereiten -------------------------------------------- */
  function rundeVorbereiten() {
    // 1) Fragenreihenfolge mischen. 2) Pro Frage die Antworten mischen.
    //    Die "richtig"-Eigenschaft hängt am Antwort-Objekt -> bleibt korrekt.
    runde = mischen(QUIZ_FRAGEN).map(function (frage) {
      return {
        frage: frage.frage,
        thema: frage.thema,
        link: frage.link,
        erklaerung: frage.erklaerung,
        antworten: mischen(frage.antworten)
      };
    });
    aktuelleNr = 0;
    punkte = 0;
    ergebnisse.length = 0;
  }

  /* --- Bildschirm wechseln ----------------------------------------------- */
  function zeige(screen) {
    startScreen.hidden = screen !== startScreen;
    fragenScreen.hidden = screen !== fragenScreen;
    ergebnisScreen.hidden = screen !== ergebnisScreen;
  }

  /* --- Hilfsfunktion: die richtige Antwort einer Frage finden ------------ */
  function richtigeAntwort(frage) {
    for (let i = 0; i < frage.antworten.length; i++) {
      if (frage.antworten[i].richtig) {
        return frage.antworten[i];
      }
    }
    return null;
  }

  /* --- Eine Frage anzeigen ----------------------------------------------- */
  function frageAnzeigen() {
    beantwortet = false;
    auswahl = null;
    auswahlButton = null;

    const frage = runde[aktuelleNr];
    const gesamt = runde.length;
    const nummer = aktuelleNr + 1;

    fortschrittText.textContent = "Frage " + nummer + " von " + gesamt;
    const prozent = Math.round((nummer / gesamt) * 100);
    fortschrittBalken.style.width = prozent + "%";
    fortschrittBalken.parentElement.setAttribute("aria-valuenow", String(nummer));

    frageText.textContent = frage.frage;

    // Feedback und Buttons zurücksetzen
    feedbackBox.hidden = true;
    feedbackBox.innerHTML = "";
    weiterBtn.hidden = true;
    weiterBtn.textContent = (nummer === gesamt) ? "Ergebnis ansehen" : "Weiter";
    bestaetigenBtn.hidden = false;
    bestaetigenBtn.disabled = true;

    // Antwort-Buttons aufbauen (als Radio-Gruppe für Barrierefreiheit)
    antwortenListe.innerHTML = "";
    frage.antworten.forEach(function (antwort) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-antwort";
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", "false");
      btn.innerHTML =
        '<span class="quiz-antwort-icon" aria-hidden="true"></span>' +
        '<span class="quiz-antwort-text"></span>';
      btn.querySelector(".quiz-antwort-text").textContent = antwort.text;
      btn.addEventListener("click", function () {
        antwortWaehlen(btn, antwort);
      });
      li.appendChild(btn);
      antwortenListe.appendChild(li);
    });

    // Fokus auf die Frage legen (Screenreader / Tastatur)
    frageText.focus();
  }

  /* --- Antwort auswählen (noch NICHT auswerten) -------------------------- */
  function antwortWaehlen(button, antwort) {
    if (beantwortet) {
      return; // nach dem Bestätigen keine Änderung mehr
    }
    auswahl = antwort;
    auswahlButton = button;

    const buttons = antwortenListe.querySelectorAll(".quiz-antwort");
    buttons.forEach(function (b) {
      const gewaehlt = (b === button);
      b.classList.toggle("is-selected", gewaehlt);
      b.setAttribute("aria-checked", gewaehlt ? "true" : "false");
    });

    bestaetigenBtn.disabled = false;
  }

  /* --- Antwort bestätigen und auswerten ---------------------------------- */
  function bestaetigen() {
    if (beantwortet || !auswahl) {
      return;
    }
    beantwortet = true;

    const frage = runde[aktuelleNr];
    const buttons = antwortenListe.querySelectorAll(".quiz-antwort");

    buttons.forEach(function (b) {
      b.disabled = true;
      b.classList.add("is-locked");
      b.classList.remove("is-selected");
    });

    if (auswahl.richtig) {
      punkte++;
      auswahlButton.classList.add("is-correct");
      auswahlButton.setAttribute("aria-label", "Richtig: " + auswahl.text);
    } else {
      auswahlButton.classList.add("is-wrong");
      auswahlButton.setAttribute("aria-label", "Falsch: " + auswahl.text);
      // die richtige Antwort zusätzlich hervorheben
      buttons.forEach(function (b, i) {
        if (frage.antworten[i].richtig) {
          b.classList.add("is-correct", "is-solution");
        }
      });
    }

    // Ergebnis dieser Frage für den Ergebnis-Bildschirm merken
    const korrekt = richtigeAntwort(frage);
    ergebnisse.push({
      frage: frage.frage,
      korrektText: korrekt ? korrekt.text : "",
      warRichtig: auswahl.richtig === true,
      thema: frage.thema,
      link: frage.link
    });

    // Erklärung + Themenlink einblenden
    const titel = auswahl.richtig ? "Richtig!" : "Nicht ganz.";
    feedbackBox.className = "quiz-feedback " + (auswahl.richtig ? "is-correct" : "is-wrong");
    feedbackBox.innerHTML =
      '<p class="quiz-feedback-titel"></p>' +
      '<p class="quiz-feedback-text"></p>' +
      '<a class="quiz-feedback-link" target="_blank" rel="noopener noreferrer">Mehr dazu nachlesen <span aria-hidden="true">↗</span></a>';
    feedbackBox.querySelector(".quiz-feedback-titel").textContent = titel;
    feedbackBox.querySelector(".quiz-feedback-text").textContent = frage.erklaerung;
    const link = feedbackBox.querySelector(".quiz-feedback-link");
    link.href = frage.link;
    link.setAttribute("aria-label", "Mehr zum Thema „" + frage.thema + "“ nachlesen (öffnet in neuem Tab)");
    feedbackBox.hidden = false;

    bestaetigenBtn.hidden = true;
    weiterBtn.hidden = false;
    weiterBtn.focus();
  }

  /* --- Weiter zur nächsten Frage oder zum Ergebnis ----------------------- */
  function weiter() {
    aktuelleNr++;
    if (aktuelleNr < runde.length) {
      frageAnzeigen();
    } else {
      ergebnisAnzeigen();
    }
  }

  /* --- Freundliche Rückmeldung je nach Punktzahl ------------------------- */
  function rueckmeldung(punkte, gesamt) {
    const anteil = punkte / gesamt;
    if (anteil === 1) {
      return "Perfekt! Du kennst dich richtig gut aus – stark!";
    }
    if (anteil >= 0.8) {
      return "Sehr stark! Du hast den Durchblick bei den wichtigen Themen.";
    }
    if (anteil >= 0.6) {
      return "Gut gemacht! Du hast eine solide Grundlage – ein paar Punkte fehlen noch.";
    }
    if (anteil >= 0.4) {
      return "Schon einiges richtig! Mit ein bisschen Stöbern wirst du schnell sicherer.";
    }
    return "Guter Anfang – jede Frage war eine Mini-Lernrunde. Schau dir die Themen an, dann läuft’s beim nächsten Mal!";
  }

  /* --- Ergebnis anzeigen -------------------------------------------------- */
  function ergebnisAnzeigen() {
    const gesamt = runde.length;
    ergebnisPunkte.textContent = punkte + " von " + gesamt;
    ergebnisFeedback.textContent = rueckmeldung(punkte, gesamt);

    // Übersicht ALLER Fragen: richtig/falsch, richtige Antwort, Nachschlagen-Link
    ergebnisLinks.innerHTML = "";

    const titel = document.createElement("p");
    titel.className = "quiz-links-titel";
    titel.textContent = "Deine Antworten im Überblick:";
    ergebnisLinks.appendChild(titel);

    const ul = document.createElement("ul");
    ul.className = "quiz-review";

    ergebnisse.forEach(function (eintrag) {
      const li = document.createElement("li");
      li.className = "quiz-review-item " + (eintrag.warRichtig ? "is-correct" : "is-wrong");

      const icon = document.createElement("span");
      icon.className = "quiz-review-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = eintrag.warRichtig ? "✓" : "✗";

      const koerper = document.createElement("div");
      koerper.className = "quiz-review-body";

      const status = document.createElement("span");
      status.className = "sr-only";
      status.textContent = eintrag.warRichtig ? "Richtig beantwortet: " : "Falsch beantwortet: ";

      const frageP = document.createElement("p");
      frageP.className = "quiz-review-frage";
      frageP.appendChild(status);
      frageP.appendChild(document.createTextNode(eintrag.frage));

      const loesungP = document.createElement("p");
      loesungP.className = "quiz-review-loesung";
      const loesungLabel = document.createElement("strong");
      loesungLabel.textContent = "Richtige Antwort: ";
      loesungP.appendChild(loesungLabel);
      loesungP.appendChild(document.createTextNode(eintrag.korrektText));

      const a = document.createElement("a");
      a.className = "quiz-review-link";
      a.href = eintrag.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = "Nachschlagen <span aria-hidden=\"true\">↗</span>";
      a.setAttribute("aria-label", "Thema „" + eintrag.thema + "“ nachschlagen (öffnet in neuem Tab)");

      koerper.appendChild(frageP);
      koerper.appendChild(loesungP);
      koerper.appendChild(a);

      li.appendChild(icon);
      li.appendChild(koerper);
      ul.appendChild(li);
    });

    ergebnisLinks.appendChild(ul);

    zeige(ergebnisScreen);
    ergebnisPunkte.focus();
  }

  /* --- Quiz starten / neu starten ---------------------------------------- */
  function quizStarten() {
    rundeVorbereiten();
    zeige(fragenScreen);
    frageAnzeigen();
  }

  /* --- Knöpfe verdrahten -------------------------------------------------- */
  if (startBtn) startBtn.addEventListener("click", quizStarten);
  if (bestaetigenBtn) bestaetigenBtn.addEventListener("click", bestaetigen);
  if (weiterBtn) weiterBtn.addEventListener("click", weiter);
  if (nochmalBtn) nochmalBtn.addEventListener("click", quizStarten);
})();
