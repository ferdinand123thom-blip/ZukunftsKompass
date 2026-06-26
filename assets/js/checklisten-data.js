/* =============================================================================
   checklisten-data.js – Die Inhalte der Checklisten
   -----------------------------------------------------------------------------
   Diese Datei enthält NUR die Inhalte, getrennt von der Logik (checkliste.js).
   So kannst du Checklisten bequem ergänzen, ändern oder löschen.

   SO LEGST DU EINE NEUE CHECKLISTE AN:
   Füge dem Objekt CHECKLISTEN einen neuen Eintrag hinzu. Der Schlüssel ("id")
   ist gleichzeitig die Adresse in der URL (checkliste.html?id=DEINE-ID) und
   sollte nur aus Kleinbuchstaben und Bindestrichen bestehen.

     "erster-job": {
       titel: "Erster Job",                       // Überschrift auf dem Blatt
       intro: "Kurzer Einleitungssatz …",         // ein Satz unter dem Titel
       pdf:   "assets/downloads/DATEINAME.pdf",    // Pfad zur PDF (relativ zum Stammordner)
       phasen: [
         {
           name: "Name der Phase",                 // goldene Phasen-Überschrift
           aufgaben: [
             { text: "Aufgabe mit Artikel-Link", link: "themen/…/artikel.html" },
             { text: "Aufgabe ohne Link" }         // einfach "link" weglassen
           ]
         }
         // … weitere Phasen
       ]
     }

   Hinweise:
   - Eine neue Checkliste erscheint automatisch als Karte auf checklisten.html.
   - Punkte ohne passenden Artikel bekommen einfach kein "link".
   - Es wird nichts gespeichert: Häkchen sind nur eine Markierung während des
     Besuchs und sind nach dem Neuladen wieder leer (Datenschutz).
   ============================================================================= */

const CHECKLISTEN = {
  "erste-eigene-wohnung": {
    titel: "Erste eigene Wohnung",
    intro: "Schritt für Schritt zur ersten eigenen Wohnung – damit du von der Budgetplanung bis zum Einzug nichts Wichtiges vergisst.",
    icon: "haus", // Karten-Icon: "haus", "koffer", "ausweis" oder "klemmbrett" (Standard, wenn weggelassen)
    pdf: "assets/downloads/checkliste-erste-eigene-wohnung.pdf",
    phasen: [
      {
        name: "Phase 1 – Vorbereitung & Budget",
        aufgaben: [
          { text: "Budget prüfen: Was kann ich mir an Warmmiete leisten?", link: "themen/wohnen/haushaltskosten-planen.html" },
          { text: "Einmalkosten einplanen: Kaution, Umzug, Erstausstattung", link: "themen/geld-finanzen/budget-erstellen.html" },
          { text: "Wunsch-Wohnung klären: Lage, Größe, Ausstattung", link: "themen/wohnen/erste-wohnung-finden.html" }
        ]
      },
      {
        name: "Phase 2 – Wohnung & Mietvertrag",
        aufgaben: [
          { text: "Wohnung besichtigen und genau prüfen", link: "themen/wohnen/erste-wohnung-finden.html" },
          { text: "Mietvertrag in Ruhe prüfen, bevor du unterschreibst", link: "themen/wohnen/mietvertrag-verstehen.html" },
          { text: "Kaution klären (Höhe, Fälligkeit, Ratenzahlung?)", link: "themen/wohnen/mietvertrag-verstehen.html" },
          { text: "Nebenkosten verstehen: Was ist enthalten?", link: "themen/wohnen/nebenkosten-verstehen.html" },
          { text: "Übergabeprotokoll: Mängel & Zählerstände festhalten" }
        ]
      },
      {
        name: "Phase 3 – Verträge & Versicherungen",
        aufgaben: [
          { text: "Strom (und ggf. Gas) anmelden", link: "themen/wohnen/stromvertrag-abschliessen.html" },
          { text: "Internet & Telefon früh beauftragen (lange Wartezeit!)", link: "themen/wohnen/internetvertrag-abschliessen.html" },
          { text: "Rundfunkbeitrag anmelden", link: "themen/wohnen/rundfunkbeitrag-verstehen.html" },
          { text: "Private Haftpflichtversicherung abschließen", link: "themen/versicherungen/haftpflichtversicherung.html" },
          { text: "Hausratversicherung prüfen", link: "themen/versicherungen/hausratversicherung.html" }
        ]
      },
      {
        name: "Phase 4 – Behörden & Einzug",
        aufgaben: [
          { text: "Beim Bürgeramt ummelden – Frist: 14 Tage" },
          { text: "Nachsendeauftrag bei der Post einrichten" },
          { text: "Neue Adresse mitteilen: Bank, Krankenkasse, Arbeitgeber" },
          { text: "Erstausstattung besorgen (Möbel, Küche, Putzmittel)" },
          { text: "Umzug organisieren (Helfer, Kartons, Transporter)" }
        ]
      }
    ]
  },

  "erster-job": {
    titel: "Erster Job",
    intro: "Dein Start ins Berufsleben – von den Unterlagen bis zur ersten Gehaltsabrechnung, Schritt für Schritt.",
    icon: "koffer",
    pdf: "assets/downloads/checkliste-erster-job.pdf",
    phasen: [
      {
        name: "Phase 1 – Vor dem ersten Tag: Unterlagen & Formalitäten",
        aufgaben: [
          { text: "Steuer-ID (Steuer-Identifikationsnummer) bereithalten" },
          { text: "Krankenkasse wählen und Mitgliedsbescheinigung anfordern", link: "themen/versicherungen/krankenversicherung.html" },
          { text: "Sozialversicherungsnummer bereithalten (SV-Ausweis)" },
          { text: "Gehaltskonto bereithalten: IBAN für die Gehaltszahlung", link: "themen/geld-finanzen/girokonto-eroeffnen.html" },
          { text: "Weitere Dokumente klären: Personalausweis, ggf. Führungszeugnis" }
        ]
      },
      {
        name: "Phase 2 – Arbeitsvertrag & deine Rechte",
        aufgaben: [
          { text: "Arbeitsvertrag genau prüfen, bevor du unterschreibst (Arbeitszeit, Urlaub, Kündigungsfristen)", link: "themen/beruf-arbeit/ersten-arbeitsvertrag-pruefen.html" },
          { text: "Probezeit verstehen (oft kürzere Kündigungsfristen)", link: "themen/beruf-arbeit/ersten-arbeitsvertrag-pruefen.html" },
          { text: "Mindestlohn und faire Bezahlung kennen", link: "themen/beruf-arbeit/mindestlohn-verstehen.html" },
          { text: "Urlaub & Krankheit: deine Rechte und Pflichten (Krankmeldung)", link: "themen/beruf-arbeit/urlaub-und-krankheit-im-job.html" }
        ]
      },
      {
        name: "Phase 3 – Gehalt & Abgaben verstehen",
        aufgaben: [
          { text: "Brutto und Netto verstehen: Was bleibt übrig?", link: "themen/beruf-arbeit/brutto-vs-netto.html" },
          { text: "Sozialabgaben verstehen (die fünf Versicherungen)", link: "themen/beruf-arbeit/sozialabgaben-verstehen.html" },
          { text: "Erste Gehaltsabrechnung prüfen und verstehen", link: "themen/geld-finanzen/gehaltsabrechnung-verstehen.html" }
        ]
      },
      {
        name: "Phase 4 – Absichern & vorsorgen",
        aufgaben: [
          { text: "Private Haftpflichtversicherung prüfen", link: "themen/versicherungen/haftpflichtversicherung.html" },
          { text: "Berufsunfähigkeitsversicherung prüfen (jung oft günstig)", link: "themen/versicherungen/berufsunfaehigkeitsversicherung.html" },
          { text: "Vermögenswirksame Leistungen (VL) checken – zahlt dein Arbeitgeber mit?" },
          { text: "Betriebliche Altersvorsorge prüfen", link: "themen/beruf-arbeit/betriebliche-altersvorsorge.html" },
          { text: "Ersten Arbeitstag vorbereiten: Treffpunkt, Anfahrt, Unterlagen, Kleidung" },
          { text: "Am Jahresende: Steuererklärung kann sich lohnen (oft Geld zurück)", link: "themen/geld-finanzen/erste-steuererklaerung-machen.html" }
        ]
      }
    ]
  },

  "ab-18": {
    titel: "Ab 18",
    intro: "Volljährig – was sich rechtlich und finanziell ändert und was du jetzt selbst in die Hand nimmst.",
    icon: "ausweis",
    pdf: "assets/downloads/checkliste-ab-18.pdf",
    phasen: [
      {
        name: "Phase 1 – Rechtlich erwachsen: was jetzt gilt",
        aufgaben: [
          { text: "Volle Geschäftsfähigkeit: du schließt Verträge jetzt selbst ab", link: "themen/vertraege-rechtliches/vertraege-kuendigen-und-laufzeiten-verstehen.html" },
          { text: "Volle Haftung: für eigene Schäden stehst du jetzt selbst gerade" },
          { text: "Personalausweis prüfen: gültig und griffbereit" },
          { text: "Wahlrecht nutzen: ab 18 darfst du den Bundestag mitwählen" }
        ]
      },
      {
        name: "Phase 2 – Geld & Konto in eigener Hand",
        aufgaben: [
          { text: "Eigenes Girokonto in deinem Namen (volle Kontohoheit)", link: "themen/geld-finanzen/girokonto-eroeffnen.html" },
          { text: "Überblick über Einnahmen & Ausgaben aufbauen", link: "themen/geld-finanzen/budget-erstellen.html" },
          { text: "Notgroschen anlegen", link: "themen/geld-finanzen/notgroschen-aufbauen.html" },
          { text: "SCHUFA & Bonität: ab jetzt zählt dein Zahlungsverhalten", link: "themen/geld-finanzen/schufa-verstehen.html" },
          { text: "Kindergeld läuft bei Ausbildung/Studium weiter (bis 25) – ggf. aufs eigene Konto" }
        ]
      },
      {
        name: "Phase 3 – Verträge bewusst abschließen",
        aufgaben: [
          { text: "Handyvertrag & Co.: Laufzeiten und Kosten verstehen", link: "themen/vertraege-rechtliches/handyvertraege-verstehen.html" },
          { text: "Abofallen erkennen und vermeiden", link: "themen/vertraege-rechtliches/abofallen-erkennen.html" },
          { text: "Widerrufsrecht kennen (14 Tage bei Online-Käufen)", link: "themen/vertraege-rechtliches/widerrufsrecht-kennen.html" },
          { text: "Schuldenfalle vermeiden: nicht mehr ausgeben, als du hast", link: "themen/geld-finanzen/schulden-vermeiden.html" }
        ]
      },
      {
        name: "Phase 4 – Absichern & vorausschauen",
        aufgaben: [
          { text: "Versicherungsschutz der Eltern prüfen (Haftpflicht, Hausrat)", link: "themen/versicherungen/haftpflichtversicherung.html" },
          { text: "Krankenversicherung klären: Familienversicherung gilt bis 25 (Schule/Studium)", link: "themen/versicherungen/krankenversicherung.html" },
          { text: "Eigene Daten schützen: bewusst mit persönlichen Daten umgehen", link: "themen/vertraege-rechtliches/datenschutz-und-persoenliche-daten-schuetzen.html" },
          { text: "Steuer-ID kennen; bei eigenem Einkommen lohnt sich oft eine Steuererklärung", link: "themen/geld-finanzen/erste-steuererklaerung-machen.html" },
          { text: "Führerschein: ab 18 darfst du unbegleitet fahren" }
        ]
      }
    ]
  }
};
