/* =========================================================================
   TEACHERCOCKPIT – ZENTRALE KONFIGURATION
   Dies ist die EINZIGE Datei, die du für die offenen Angaben anfassen musst.
   Alle Seiten (Start, Datenschutz, Impressum) lesen diese Werte aus.
   ========================================================================= */
window.SITE = {
  /* --- Marketing --------------------------------------------------------- */
  // Link zum Microsoft-Store-Eintrag. WICHTIG: 9P0T7LSNTL47 ist die Store-ID der APP.
  // Die Add-on-ID 9N7FBMHQMJBT gehoert NICHT hierher - Add-ons haben keine Produktseite
  // und liefern "Produkt nicht verfuegbar". Leer ("") = "Bald im Microsoft Store".
  storeUrl: "https://apps.microsoft.com/detail/9P0T7LSNTL47",

  // Preise. priceIntro leer lassen, wenn es keinen Einführungspreis (mehr)
  // gibt – dann steht nur der reguläre Preis auf der Seite.
  priceRegular: "24,99 €",
  priceIntro: "14,99 €",

  /* --- Kontakt / Rechtliches -------------------------------------------- */
  // Support- und Datenschutz-E-Mail (steht öffentlich auf der Website).
  supportEmail: "info@teachercockpit.de",

  // Name des Verantwortlichen – konsistent mit dem Publisher-Namen im
  // Microsoft Store halten.
  publisherName: "Torben Krix",

  // Ladungsfähige Anschrift (Impressumspflicht bei kommerziellem Angebot).
  addressLine1: "Kolpingweg 18",
  addressLine2: "45731 Waltrop",

  // Umsatzsteuer-Identifikationsnummer. Leer lassen (""), wenn nicht
  // vorhanden – bei Kleinunternehmerregelung nach § 19 UStG ist das der
  // Normalfall; die Zeile wird dann automatisch ausgeblendet.
  vatId: "",

  // Finale Schreibweise des App-Namens für Rechtstexte und Website.
  appName: "TeachercocKpit"
};

/* --- Ab hier nichts ändern: trägt die Werte in die Seiten ein ----------- */
document.addEventListener("DOMContentLoaded", function () {
  var S = window.SITE;

  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    if (S[key]) el.textContent = S[key];
  });

  // E-Mail-Links
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    if (S.supportEmail && S.supportEmail.indexOf("BEISPIEL") === -1) {
      el.setAttribute("href", "mailto:" + S.supportEmail);
      el.textContent = S.supportEmail;
    } else {
      el.removeAttribute("href");
      el.textContent = S.supportEmail + " (Platzhalter)";
    }
  });

  // Store-Buttons: ohne Link bleiben sie als "Bald im Microsoft Store" stehen
  // und sind nicht klickbar (CSS-Klasse is-pending).
  document.querySelectorAll("[data-store]").forEach(function (el) {
    if (S.storeUrl) {
      el.setAttribute("href", S.storeUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      if (!el.hasAttribute("data-store-keep-text")) el.textContent = "Im Microsoft Store holen";
      el.classList.remove("is-pending");
    }
  });

  // Preise: Einführungspreis wird groß gezeigt, der reguläre daneben
  // durchgestrichen. Ohne priceIntro steht nur der reguläre Preis da.
  document.querySelectorAll("[data-price]").forEach(function (el) {
    if (S.priceIntro && S.priceRegular) {
      el.innerHTML = '<span class="price-now">' + S.priceIntro + '</span>' +
                     '<span class="price-was">' + S.priceRegular + '</span>';
    } else if (S.priceRegular) {
      el.textContent = S.priceRegular;
    } else {
      el.textContent = "einmalig, fairer Preis";
    }
  });

  // Hinweiszeile zum Einführungspreis nur zeigen, wenn es einen gibt
  document.querySelectorAll("[data-intro-note]").forEach(function (el) {
    if (!S.priceIntro) el.style.display = "none";
  });

  // "Noch nicht im Store"-Kasten verschwindet, sobald der Store-Link steht
  document.querySelectorAll("[data-store-pending]").forEach(function (el) {
    if (S.storeUrl) el.style.display = "none";
  });

  // USt-IdNr. nur zeigen, wenn vorhanden
  document.querySelectorAll("[data-vat-row]").forEach(function (el) {
    if (S.vatId) {
      el.querySelector("[data-site='vatId']").textContent = S.vatId;
    } else {
      el.style.display = "none";
    }
  });
});
