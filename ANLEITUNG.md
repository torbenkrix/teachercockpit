# TeachercocKpit-Website – Anleitung

Statische Seite, keine Abhängigkeiten, keine externen Ressourcen. Läuft auf jedem Webspace und auf GitHub Pages.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Startseite: Hero, Funktionen, Schultag, Einblicke, Datenschutz, Fächer, Preis, Abgrenzung, FAQ, Kontakt |
| `datenschutz.html` | Pflicht-Rechtsseite, final (Website-Fassung; die App-Erklärung liegt separat im Store) |
| `impressum.html` | Pflicht-Rechtsseite |
| `style.css` | Gemeinsames Design (Markenfarbe `#2c6e63`), keine externen Fonts oder CDNs |
| `config.js` | **Die eine Stelle für alle Angaben** (Name, Anschrift, E-Mail, Preis, Store-Link, USt-IdNr.) |
| `screenshots/` | Zehn Bilder, 1280×720, aus dem Testmodus mit fiktiven Beispieldaten |

**Rechtstexte und Kontaktdaten sind bereits eingetragen.** Impressum und Datenschutzerklärung stehen final (Stand 17. August 2026), `config.js` enthält Adresse, E-Mail und Preise. Zu tun bleibt nur der Store-Link, sobald es ihn gibt.

---

## Der eine Schalter: `storeUrl`

In `config.js` steht `storeUrl: ""`. Solange das so ist:

- zeigen alle drei Kauf-Knöpfe **„Bald im Microsoft Store"** und sind nicht klickbar,
- steht unter dem Preis ein Hinweiskasten *„Noch nicht im Store verfügbar"*.

Sobald du die Store-URL einträgst, passiert beides automatisch: Die Knöpfe werden aktiv, heißen „Im Microsoft Store holen" und öffnen den Store in einem neuen Tab – und der Hinweiskasten verschwindet. Du musst an keiner anderen Stelle etwas ändern.

Dasselbe Prinzip beim Preis: `priceIntro` leer setzen, wenn der Einführungspreis ausläuft – dann steht nur noch der reguläre Preis da, und der Hinweis auf die Befristung blendet sich aus.

---

## Veröffentlichen (GitHub Pages)

1. Auf github.com ein neues **öffentliches** Repository anlegen, z. B. `teachercockpit-website`.
2. Den **Inhalt** dieses Ordners hochladen (nicht den Ordner selbst) – „Add file → Upload files", Drag & Drop genügt, kein Git nötig. Der Unterordner `screenshots/` muss mit.
3. Repository → **Settings → Pages** → unter „Branch" `main` und `/ (root)` wählen → Save.
4. Nach ein bis zwei Minuten läuft die Seite unter
   `https://DEINNAME.github.io/teachercockpit-website/`
5. Die Datenschutz-URL lautet dann
   `https://DEINNAME.github.io/teachercockpit-website/datenschutz.html`
   → diese URL im **Partner Center** als „Datenschutzrichtlinien-URL" eintragen.

Eine eigene Domain lässt sich später aufschalten (Settings → Pages → Custom domain), ohne dass an den Dateien etwas geändert werden muss.

---

## Screenshots austauschen oder ergänzen

Die Bilder entstehen reproduzierbar aus der App:

```
npx electron tools/store-shots.js light 1280 01,02,03,07,10,11,13,17,18,25
```

Ergebnis liegt in `tools/out/store/web1280_hell/` und wird nach `website/screenshots/` kopiert. Ohne die Nummernliste am Ende entstehen alle 24 Ansichten; `dark` statt `light` erzeugt die dunkle Fassung.

**Warum 1280 und nicht 1920:** Ein 1920er-Screenshot wird auf der Seite auf etwa 1050 px verkleinert – die 13-px-Schrift der App landet dann bei rund 7 px und ist unlesbar. Bei 1280 px Ausgangsbreite bleibt sie bei etwa 11 px. Für den **Microsoft Store** gilt das Gegenteil: dort werden die Bilder groß angezeigt, deshalb liegen in `tools/out/store/hell/` und `/dunkel/` die 1920er-Fassungen.

**Zur Lesbarkeit auf großen Monitoren:** Die Seite ist auf 1100 px Inhaltsbreite begrenzt – im Vollbild wird also der Rand breiter, nicht das Bild. Deshalb sind **alle** Screenshots anklickbar: Ein Klick öffnet sie in einer Vollbildansicht, dort erscheinen sie 1:1 und damit in Originalgröße. Pfeiltasten blättern, Esc schließt. Das Ganze steckt in `index.html` am Seitenende, braucht keine Bibliothek und funktioniert auch ohne JavaScript – dann öffnet der Klick das Bild einfach direkt.

**Achtung bei neuen Bildern:** Zwei Ansichten taugen nicht als Produktbild, weil die Beispieldaten sie leer lassen – die **Klassenleitung** (zeigt nur „Keine Klasse markiert") und die **Ordner-Übersicht der U-Planung** (ein Ordner, viel Weißraum). Statt ihrer sind die Kursübersicht und der *geöffnete* Planungsordner eingebunden. Wer weitere Bilder ergänzt: vorher ansehen, nicht nur den Dateinamen prüfen.

Die Screenshots laufen im Testmodus mit erfundenen Beispieldaten – es sind zu keinem Zeitpunkt echte Schülerdaten zu sehen. Zusätzlich blendet das Werkzeug Zustandsmeldungen aus (Testmodus-Leiste, Sicherungs-Mahnung, Beamer-Rückfrage), die nur erscheinen, weil die Spielwiese bei jedem Lauf frisch startet.

---

## Wenn du Texte änderst

Zwei Dinge, die auf der Seite bewusst so formuliert sind:

**Keine Aufforderung zu Bewertungen.** Weder „Bewerte uns" noch Sterne oder Rezensionen – das kann die Store-Zertifizierung kosten. Die Regel gilt in der Anwendung ohnehin und ist dort durch einen Test abgesichert.

**Kein „DSGVO-konform".** Ob der Einsatz zulässig ist, hängt am Gerät und an der Schulordnung, nicht an der Software. Belegbar und ebenso wirksam ist die Formulierung, die auf der Seite steht: *die Daten verlassen dein Gerät nicht*.

Ebenfalls bewusst: Die Seite verspricht keine Funktionen, die noch nicht stehen. Direkter Mailversand aus der Anwendung und Dateien innerhalb der Vollsicherung gibt es derzeit nicht – entsprechend steht davon nichts auf der Seite.

---

## Checkliste

- [x] `config.js`: Name, Anschrift, E-Mail, Preise eingetragen
- [x] Datenschutz und Impressum final, Entwurfs-Kästen entfernt
- [ ] Kurze juristische Prüfung der Rechtstexte (empfohlen, kein Rechtsrat von mir)
- [ ] `storeUrl` nachtragen, sobald der Store-Eintrag steht
- [ ] Bei Ablauf des Einführungspreises: `priceIntro` auf "" setzen
