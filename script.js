"use strict";

/* =========================================================
   CONNEXION GOOGLE SHEETS — FCF91 U15F
   ========================================================= */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxJB9h5SNdiQyBCc3WJ2xuU5RZt5ZI0Okk6EaExCfz6Hv-Hn84krk6dbLgbiFcHQ7quHA/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ressentiForm");
  const rpeValue = document.getElementById("rpeValue");
  const message = document.getElementById("formMessage");
  const submitButton = form?.querySelector(".submit-button");

  if (!form) {
    console.error("Le formulaire #ressentiForm est introuvable.");
    return;
  }

  /* Mise à jour de la valeur RPE affichée */
  const rpeInputs = form.querySelectorAll('input[name="rpe"]');

  rpeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (rpeValue) {
        rpeValue.textContent = input.value;
      }
    });
  });

  /* Envoi du formulaire */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const prenom = String(formData.get("prenom") || "").trim();

    if (!prenom) {
      afficherMessage(
        message,
        "Merci d’indiquer ton prénom.",
        "error"
      );

      document.getElementById("prenom")?.focus();
      return;
    }

    verrouillerBouton(submitButton, true);
    afficherMessage(message, "Enregistrement en cours…", "loading");

    try {
      const donnees = new URLSearchParams();

      donnees.append("prenom", prenom);
      donnees.append("humeur", formData.get("humeur") || "");
      donnees.append("sommeil", formData.get("sommeil") || "");
      donnees.append("rpe", formData.get("rpe") || "");
      donnees.append("douleur", formData.get("douleur") || "");
      donnees.append("facteur", formData.get("facteur") || "");
      donnees.append(
        "commentaire",
        String(formData.get("commentaire") || "").trim()
      );

      /*
       * Le mode no-cors évite le blocage entre GitHub Pages
       * et Google Apps Script.
       *
       * La réponse Google ne peut pas être lue dans ce mode,
       * mais les données sont bien envoyées au Google Sheets.
       */
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: donnees.toString()
      });

      afficherMessage(
        message,
        "✓ Ton ressenti a bien été enregistré.",
        "success"
      );

      reinitialiserFormulaire(form, rpeValue);
    } catch (error) {
      console.error("Erreur lors de l’envoi :", error);

      afficherMessage(
        message,
        "Une erreur est survenue. Vérifie ta connexion et réessaie.",
        "error"
      );
    } finally {
      verrouillerBouton(submitButton, false);
    }
  });
});

/* =========================================================
   FONCTIONS UTILITAIRES
   ========================================================= */

function verrouillerBouton(button, verrouille) {
  if (!button) {
    return;
  }

  button.disabled = verrouille;
  button.textContent = verrouille
    ? "ENREGISTREMENT…"
    : "ENVOYER";
}

function afficherMessage(element, texte, type) {
  if (!element) {
    return;
  }

  element.textContent = texte;
  element.className = `form-message ${type}`;
}

function reinitialiserFormulaire(form, rpeValue) {
  form.reset();

  /* Valeurs par défaut après l’envoi */
  selectionnerValeur(form, "humeur", "3");
  selectionnerValeur(form, "sommeil", "3");
  selectionnerValeur(form, "rpe", "5");

  if (rpeValue) {
    rpeValue.textContent = "5";
  }

  document.getElementById("prenom")?.focus();
}

function selectionnerValeur(form, nom, valeur) {
  const input = form.querySelector(
    `input[name="${nom}"][value="${valeur}"]`
  );

  if (input) {
    input.checked = true;
  }
}
