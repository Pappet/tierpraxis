# Tierpraxis

Tierpflege-Spiel für Kinder: Tiere im Wartezimmer auswählen, behandeln, belohnen, schmücken.
Eine HTML-Datei, offline-fähige PWA, keine Werbung, keine Käufe, keine Datenübertragung.

## Ablauf

1. **Wartezimmer**: drei Tiere, jedes mit einer Sprechblase (🛁 Schlamm, 🩹 Dorn/Nagel, 🪮 Knoten, ✂️ Krallen, 🤒 Fieber). Tier antippen.
2. **Behandlung**: Werkzeug aus der Leiste auf das Tier ziehen und reiben / halten. Das nächste Werkzeug leuchtet gelb.
   - Schlamm (ganzes Tier): Schwamm (seift ein, macht Schaum) → Dusche (spült, macht nass) → Föhn
   - Dorn in der Pfote / Nagel im Huf (Pony, Einhorn): Zange → Salbe → Pflaster (Pflaster bleibt dran)
   - Verfilztes Fell (ganzes Tier): Bürste, bis alles glatt ist
   - Lange Krallen (Hund, Katze, Hase): Schere
   - Fieber: Thermometer an den Mund halten → Medizin
3. **Leckerli** zum Mund ziehen (Knochen, Fisch, Karotte, Apfel).
4. **Schmücken**: Schleife, Krone, Blume, Hut, Stern, Brille aufs Tier ziehen (antippen nimmt es wieder ab), Krallen/Hufe lackieren. Grüner Haken = fertig.
5. Das Tier landet als **Foto** an der Wand im Wartezimmer, es gibt einen Stern.

Falsches Werkzeug: nichts passiert, nach einer Weile kommt der Hinweis „Probier mal …". Nach 13 s ohne Aktion wackelt das richtige Werkzeug und es gibt eine Ansage; danach werden die Abstände länger und ab dem dritten Tipp wackelt es nur noch.

Hat ein Tier mehrere Probleme, wird immer nur das aktuelle angesagt, das nächste erst, wenn das vorige erledigt ist.

## Stufen (je 3 behandelte Tiere)

| behandelt | Probleme pro Tier | Werkzeuge in der Leiste |
|---|---|---|
| 0–2 | 1 | nötige + 2 andere |
| 3–5 | 1–2 | nötige + 3 andere |
| 6–8 | 2 | alle |
| ab 9 | 2–3 | alle |

Neue Tiere: Pony ab 3, Hase ab 6, Einhorn ab 10 behandelten Tieren (werden angekündigt, vorher nicht sichtbar).

## Bilder (assets/)

Die gemalten Tiere, Overlays, Räume und Freudenhüpfer liegen im Ordner `assets/`
(separater Download `tierpraxis-assets.zip`, einfach neben `index.html` entpacken).
Fehlt der Ordner, zeichnet das Spiel alles selbst – es läuft also auch ohne.

- `<tier>-normal|traurig|krank|froh.webp` – 800×640, freigestellt
- `<tier>-hops.webm` – Freudenhüpfer (VP9 mit Transparenz, 720 px), läuft einmal, wenn das Tier gesund ist
- `t-schlamm|schaum|nass|zottel.webp` – Texturen für die Schichten über dem ganzen Tier (Schlamm, Schaum, Nässe, Zotteln);
  was schon sauber ist, merkt sich das Spiel in einer kleinen Maske pro Schicht
- `o-*.webp` – Dorn, Nagel, Pflaster, Wunde, Salbe, lange/kurze Krallen (+ Schlamm/Schaum/Tropfen/Knoten für den Modus ohne Bilder)
- `bg-warte.webp`, `bg-raum.webp` – Hintergründe
- Positionen von Pfoten, Maul und Schlammstellen stehen in `BILD_GEO` in `index.html`.
  Sitzt etwas daneben, dort nachjustieren (viewBox-Einheiten, 400×320).

## Eltern

- **Reset**: Sternanzeige 5 Sekunden gedrückt halten.
- **Zurück-Geste** (Android) schließt die App nicht, sondern führt ins Wartezimmer.
- Spielstand in `localStorage` unter `tierpraxis-spielstand`.
- Nach jeder Änderung `VERSION` in `sw.js` hochzählen.

## Aufs Tablet

HTTPS ist Pflicht (Service Worker, Installation). Ordner z. B. per GitHub Pages oder Netlify Drop veröffentlichen,
auf dem Tablet in Chrome öffnen → Menü → „Zum Startbildschirm hinzufügen / App installieren".
Bei Family Link mit „Nur zugelassene Websites" die URL vorher freigeben. Danach läuft alles aus dem Cache, auch offline.
Die Schrift (Fredoka) wird einmalig von Google Fonts geladen; ohne sie greift die Systemschrift.
