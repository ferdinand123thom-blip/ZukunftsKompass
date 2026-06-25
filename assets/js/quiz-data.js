/* =============================================================================
   quiz-data.js – Die Fragen für den Zukunfts-Check
   -----------------------------------------------------------------------------
   Diese Datei enthält NUR die Fragen, getrennt von der Programmlogik (quiz.js).
   So kannst du Fragen bequem ergänzen, ändern oder löschen, ohne die Logik
   anzufassen.

   SO FÜGST DU EINE NEUE FRAGE HINZU:
   Kopiere einen Block { ... } und passe ihn an. Jede Frage ist ein Objekt mit
   diesen Feldern:

     {
       frage:      "Der Fragetext, der oben angezeigt wird.",
       thema:      "Geld & Finanzen",   // Anzeigename des Themas (für die Lern-Links am Ende)
       antworten: [
         { text: "Eine falsche Antwort",  richtig: false },
         { text: "Die richtige Antwort",  richtig: true  },  // genau EINE Antwort hat richtig: true
         { text: "Noch eine falsche",     richtig: false }
       ],
       erklaerung: "Kurze Erklärung, die nach dem Antworten erscheint.",
       link:       "themen/geld-finanzen/girokonto-eroeffnen.html"  // Pfad RELATIV zu quiz.html
     }

   WICHTIG:
   - Die Eigenschaft "richtig" gehört fest zur jeweiligen Antwort. Die Reihenfolge
     der Antworten wird beim Quiz zufällig gemischt – die richtige Antwort bleibt
     dadurch trotzdem korrekt zugeordnet.
   - Es muss genau EINE Antwort "richtig: true" haben.
   - Trage als "link" einen gültigen Pfad zu einer bestehenden Themenseite ein.
   - Die Anzahl der Fragen ist frei: Die Fortschrittsanzeige ("Frage X von Y")
     zählt automatisch mit.
   ============================================================================= */

const QUIZ_FRAGEN = [
  {
    frage: "Was erlaubt dir ein „Dispo“ auf dem Girokonto?",
    thema: "Geld & Finanzen",
    antworten: [
      { text: "Überweisungen automatisch jeden Monat auszuführen", richtig: false },
      { text: "Dein Konto bis zu einem vereinbarten Betrag zu überziehen", richtig: true },
      { text: "Geld fest anzulegen und dafür Zinsen zu bekommen", richtig: false }
    ],
    erklaerung: "Ein Dispo lässt dich ins Minus gehen – ohne Dispo ist es für den Anfang oft sicherer.",
    link: "themen/geld-finanzen/girokonto-eroeffnen.html"
  },
  {
    frage: "Was bedeutet der Zinseszins-Effekt?",
    thema: "Geld & Finanzen",
    antworten: [
      { text: "Du bekommst Erträge nur auf deinen ursprünglich eingezahlten Betrag", richtig: false },
      { text: "Du bekommst später auch auf bereits entstandene Erträge wieder Erträge", richtig: true },
      { text: "Die Zinsen steigen jedes Jahr, weil die Bank sie automatisch erhöht", richtig: false }
    ],
    erklaerung: "Dein Geld arbeitet mit der Zeit immer stärker mit – ein Schneeballeffekt über lange Zeit.",
    link: "themen/geld-finanzen/zinseszins-verstehen.html"
  },
  {
    frage: "Wofür ist ein Notgroschen gedacht?",
    thema: "Geld & Finanzen",
    antworten: [
      { text: "Als Rücklage, die du nur im Notfall anfasst", richtig: true },
      { text: "Als Geld, das du für größere geplante Anschaffungen ansparst", richtig: false },
      { text: "Als Betrag, den du anlegst, um Gewinn zu machen", richtig: false }
    ],
    erklaerung: "Geld auf einem sicheren Konto, nur für Unerwartetes wie Reparaturen oder Nachzahlungen.",
    link: "themen/geld-finanzen/notgroschen-aufbauen.html"
  },
  {
    frage: "Was ist der SCHUFA-Score?",
    thema: "Geld & Finanzen",
    antworten: [
      { text: "Eine Liste aller deiner bisherigen Einkäufe", richtig: false },
      { text: "Eine statistische Prognose, wie wahrscheinlich du zahlst", richtig: true },
      { text: "Dein Gehalt, das Banken jederzeit einsehen können", richtig: false }
    ],
    erklaerung: "Die SCHUFA beschreibt ihren Score selbst als statistische Zahlungsprognose.",
    link: "themen/geld-finanzen/schufa-verstehen.html"
  },
  {
    frage: "Was ist das Risiko bei „später bezahlen“ (Klarna & Co.)?",
    thema: "Geld & Finanzen",
    antworten: [
      { text: "Du musst den gesamten Betrag sofort auf einmal zahlen", richtig: false },
      { text: "Du kannst den Überblick verlieren und Schulden anhäufen", richtig: true },
      { text: "Du zahlst von Tag eins an hohe Zinsen", richtig: false }
    ],
    erklaerung: "Riskant wird es, wenn man Zahlungen dauerhaft auf „später“ verschiebt.",
    link: "themen/geld-finanzen/klarna-und-buy-now-pay-later-verstehen.html"
  },
  {
    frage: "Was ist die „Warmmiete“?",
    thema: "Wohnen",
    antworten: [
      { text: "Die Miete inklusive Strom und Internet", richtig: false },
      { text: "Die Kaltmiete plus die Nebenkosten", richtig: true },
      { text: "Die Miete plus die Kaution", richtig: false }
    ],
    erklaerung: "Erst Kaltmiete und Nebenkosten zusammen zeigen, was Wohnen wirklich kostet.",
    link: "themen/wohnen/nebenkosten-verstehen.html"
  },
  {
    frage: "Was gilt für einen unterschriebenen Mietvertrag?",
    thema: "Wohnen",
    antworten: [
      { text: "Du kannst ihn in den ersten 14 Tagen einfach widerrufen", richtig: false },
      { text: "Er ist rechtlich verbindlich und verpflichtet dich zu festen Pflichten", richtig: true },
      { text: "Er gilt erst, wenn du die erste Miete überwiesen hast", richtig: false }
    ],
    erklaerung: "Mit der Unterschrift bist du z. B. an Miete und Kündigungsfristen gebunden.",
    link: "themen/wohnen/mietvertrag-verstehen.html"
  },
  {
    frage: "Wie oft fällt der Rundfunkbeitrag in einer WG an?",
    thema: "Wohnen",
    antworten: [
      { text: "Für jede volljährige Person einzeln", richtig: false },
      { text: "Nur einmal pro Wohnung, egal wie viele dort wohnen", richtig: true },
      { text: "Nur für die Person, die den Mietvertrag unterschrieben hat", richtig: false }
    ],
    erklaerung: "Der Beitrag gilt pro Wohnung – in der WG also nur einmal.",
    link: "themen/wohnen/rundfunkbeitrag-verstehen.html"
  },
  {
    frage: "Wie ist BAföG für Studierende meist aufgebaut?",
    thema: "Ausbildung & Studium",
    antworten: [
      { text: "Komplett geschenkt, es muss nie zurückgezahlt werden", richtig: false },
      { text: "Oft je zur Hälfte Zuschuss und zinsloses Darlehen", richtig: true },
      { text: "Ein normaler Kredit, den du komplett mit Zinsen zurückzahlst", richtig: false }
    ],
    erklaerung: "Einen Teil zahlst du später zurück – aber nicht alles und ohne Zinsen.",
    link: "themen/ausbildung-studium/bafoeg-verstehen.html"
  },
  {
    frage: "Was landet tatsächlich auf deinem Konto?",
    thema: "Beruf & Arbeit",
    antworten: [
      { text: "Das Brutto, also der Betrag vor allen Abzügen", richtig: false },
      { text: "Das Netto, also der Betrag nach Steuern und Sozialabgaben", richtig: true },
      { text: "Das Bruttogehalt plus Zuschläge", richtig: false }
    ],
    erklaerung: "Brutto ist vor Abzügen, Netto ist das, was übrig bleibt.",
    link: "themen/beruf-arbeit/brutto-vs-netto.html"
  },
  {
    frage: "Was ist der Mindestlohn?",
    thema: "Beruf & Arbeit",
    antworten: [
      { text: "Ein vom Arbeitgeber freiwillig gezahlter Mindestbetrag", richtig: false },
      { text: "Die gesetzliche Untergrenze, die der Arbeitgeber nicht unterschreiten darf", richtig: true },
      { text: "Der Durchschnittslohn in einer Branche", richtig: false }
    ],
    erklaerung: "Eine gesetzlich festgelegte Lohnuntergrenze.",
    link: "themen/beruf-arbeit/mindestlohn-verstehen.html"
  },
  {
    frage: "Was gilt in der Probezeit?",
    thema: "Beruf & Arbeit",
    antworten: [
      { text: "Beide Seiten können in dieser Zeit gar nicht kündigen", richtig: false },
      { text: "Es gelten oft kürzere Kündigungsfristen", richtig: true },
      { text: "Du bekommst in dieser Zeit noch kein volles Gehalt", richtig: false }
    ],
    erklaerung: "Beide Seiten prüfen, ob es passt – gekündigt werden kann schneller.",
    link: "themen/beruf-arbeit/ersten-arbeitsvertrag-pruefen.html"
  },
  {
    frage: "Wann hilft dir eine private Haftpflichtversicherung?",
    thema: "Versicherungen",
    antworten: [
      { text: "Wenn an deinen eigenen Sachen ein Schaden entsteht", richtig: false },
      { text: "Wenn du einer anderen Person einen Schaden zufügst", richtig: true },
      { text: "Wenn du im Ausland zum Arzt musst", richtig: false }
    ],
    erklaerung: "Sie springt ein, wenn du anderen einen Schaden verursachst.",
    link: "themen/versicherungen/haftpflichtversicherung.html"
  },
  {
    frage: "Was gilt in Deutschland für die Krankenversicherung?",
    thema: "Versicherungen",
    antworten: [
      { text: "Sie ist freiwillig, man muss sich nicht versichern", richtig: false },
      { text: "Es besteht grundsätzlich eine Versicherungspflicht", richtig: true },
      { text: "Nur wer arbeitet ist versichert, Studierende nicht", richtig: false }
    ],
    erklaerung: "Als Azubi, Studierende oder Berufstätige bist du in der Regel pflichtversichert.",
    link: "themen/versicherungen/krankenversicherung.html"
  },
  {
    frage: "Wie lange kannst du einen Online-Kauf in der Regel widerrufen?",
    thema: "Verträge & Rechtliches",
    antworten: [
      { text: "7 Tage", richtig: false },
      { text: "14 Tage", richtig: true },
      { text: "30 Tage", richtig: false }
    ],
    erklaerung: "Beim Online-Shopping gilt grundsätzlich ein vierzehntägiges Widerrufsrecht.",
    link: "themen/vertraege-rechtliches/online-kaeufe-und-rueckgabe.html"
  }
];
