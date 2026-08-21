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

## SEO & Google (Stand 21.08.2026)

Die Seite ist für Suchmaschinen vorbereitet: Titel und Beschreibung mit Suchbegriffen, `canonical`-Adresse, Open-Graph-/Twitter-Vorschaukarten, Favicon, strukturierte Daten (SoftwareApplication mit Preis + FAQ als JSON-LD), `robots.txt` und `sitemap.xml`.

**Die Adresse steht überall als `https://teachercockpit.de/`** — die Seite läuft auf GitHub Pages mit teachercockpit.de als Custom Domain (Domain liegt bei Strato). Der GitHub-Hosting-Abschnitt der Datenschutzerklärung passt dazu unverändert: Gehostet wird weiterhin bei GitHub, nur die Adresse ist die eigene.

## Custom Domain einrichten (einmalig: Strato + GitHub)

Ziel: Die Browserleiste zeigt teachercockpit.de, die alte github.io-Adresse leitet automatisch um. **Reihenfolge einhalten** — erst DNS, dann GitHub, dann hochladen.

**Schritt 1 — Strato (DNS):** Strato-Kundenlogin → Domains → teachercockpit.de → **DNS-Verwaltung** (je nach Paket „Nameserver-/DNS-Einstellungen").

- **A-Record** der Hauptdomain (teachercockpit.de) auf GitHubs Pages-Server stellen: `185.199.108.153` — falls Strato mehrere IPv4-Einträge erlaubt, alle vier eintragen: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (Redundanz; eine genügt zum Funktionieren).
- **CNAME** für die Subdomain `www` auf `torbenkrix.github.io` (Punkt am Ende, falls Strato ihn verlangt).
- **NICHT anfassen: die MX-Einträge** — darüber läuft die Mail info@teachercockpit.de. A/CNAME betreffen nur den Web-Aufruf, die Mail bleibt unberührt.

**Schritt 2 — GitHub:** Repository → Settings → Pages → **Custom domain**: `teachercockpit.de` eintragen → Save. GitHub prüft den DNS-Eintrag (nach Strato-Änderung ein paar Minuten bis wenige Stunden Geduld). Sobald der Haken grün ist und das Zertifikat ausgestellt wurde: **„Enforce HTTPS" anhaken.**

**Schritt 3 — Hochladen:** Den aktuellen `website/`-Inhalt hochladen. Die Datei **`CNAME`** (Inhalt: `teachercockpit.de`) liegt jetzt mit im Ordner und muss bei **jedem** Upload dabei sein — GitHub liest die Domain-Bindung aus dieser Datei; ein Upload ohne sie löst die Domain wieder.

*Optional, empfohlen:* In den persönlichen GitHub-Einstellungen (Settings → Pages → „Verified domains") die Domain per TXT-Record verifizieren — schützt davor, dass jemand anders sie je auf ein eigenes Pages-Projekt binden kann.

## Bei Google anmelden (einmalig, ~10 Minuten — nur über dein Konto)

Mit der eigenen Domain geht die sauberste Variante, die **Domain-Property** (deckt http/https und www/ohne-www gemeinsam ab):

1. [search.google.com/search-console](https://search.google.com/search-console) → „Property hinzufügen" → links **Domain** → `teachercockpit.de` eingeben.
2. Google zeigt einen **TXT-Eintrag** → bei Strato in der DNS-Verwaltung als TXT-Record eintragen → in der Search Console „Bestätigen" (kann nach dem Eintragen einige Minuten dauern).
3. Links **Sitemaps** → `https://teachercockpit.de/sitemap.xml` eintragen → Senden.
4. Optional beschleunigen: oben in der URL-Prüfung `https://teachercockpit.de/` eingeben → „Indexierung beantragen".

Google findet die Seite auch ohne diese Anmeldung, aber deutlich langsamer — und nur mit der Search Console siehst du, wonach Leute suchen. Dasselbe gratis bei Bing: [bing.com/webmasters](https://www.bing.com/webmasters) (kann die Search-Console-Property importieren, kein zweiter DNS-Eintrag nötig).

**Wenn sich Preis oder Store-Link ändern:** auch im JSON-LD-Block in `index.html` mitziehen — der steht fest im HTML, weil Suchmaschinen `config.js` nicht ausführen.

---

## Checkliste

- [x] `config.js`: Name, Anschrift, E-Mail, Preise eingetragen
- [x] Datenschutz und Impressum final, Entwurfs-Kästen entfernt
- [x] `storeUrl` eingetragen (Store-ID 9N7FBMHQMJBT) — Seite ist erst nach der Store-Veröffentlichung erreichbar; bis dahin ggf. auf "" zurücksetzen
- [x] SEO-Grundausstattung (Meta, JSON-LD, Sitemap, robots.txt, Favicon)
- [ ] Kurze juristische Prüfung der Rechtstexte (empfohlen, kein Rechtsrat von mir)
- [ ] Google Search Console: Domain bestätigen + Sitemap einreichen (Schritte oben)
- [ ] Bei Ablauf des Einführungspreises: `priceIntro` auf "" setzen — auch im JSON-LD
