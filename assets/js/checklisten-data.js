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
  }
};
