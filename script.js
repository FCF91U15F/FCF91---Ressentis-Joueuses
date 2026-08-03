"use strict";

/* =========================================================
   CONNEXION GOOGLE SHEETS
   ========================================================= */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxJB9h5SNdiQyBCc3WJ2xuU5RZt5ZI0Okk6EaExCfz6Hv-Hn84krk6dbLgbiFcHQ7quHA/exec";

/* =========================================================
   LISTE DES JOUEUSES
   ========================================================= */

const JOUEUSES = [
  "Ylana",
  "Mélissa",
  "Lilia",
  "Anna",
  "Meissa",
  "Anaïs",
  "Camille",
  "Juliette",
  "Assia",
  "Ramatou",
  "Manel",
  "Éléna",
  "Milena",
  "Maïwenn",
  "Ange",
  "Ines",
  "Yasmine",
  "Élyssa",
  "Esther",
  "Khadija"
];

/* =========================================================
   INITIALISATION DE LA PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ressentiForm");
  const prenomSelect = document.getElementById("prenom");
  const rpeValue = document.getElementById("rpeValue");
  const message = document.getElementById("formMessage");
  const submitButton = form?.querySelector(".submit-button");

  /* Remplissage automatique de la liste déroulante */

  if (prenomSelect) {
    JOUEUSES
      .slice()
      .sort((a, b) =>
        a.localeCompare(b, "fr", {
          sensitivity: "base"
        })
      )
      .forEach((prenom) => {
        const option = document.createElement("option");

        option.value = prenom;
        option.textContent = prenom;

        prenomSelect.appendChild(option);
      });
  }

  if (!form) {
    console.error("Le formulaire #ressentiForm est introuvable.");
    return;
  }

  /* Mise à jour de la valeur RPE affichée */

  const rpeInputs = form.querySelectorAll(
    'input[name="rpe"]'
  );

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
    const prenom = String(
      formData.get("prenom") || ""
    ).trim();

    if (!prenom) {
      afficherMessage(
        message,
        "Merci de sélectionner ton prénom.",
        "error"
      );

      prenomSelect?.focus();
      return;
    }

    verrouillerBouton(submitButton, true);

    afficherMessage(
      message,
      "Enregistrement en cours…",
      "loading"
    );

    try {
      const donnees = new URLSearchParams();

      donnees.append("prenom", prenom);
      donnees.append(
        "humeur",
        formData.get("humeur") || ""
      );
      donnees.append(
        "sommeil",
        formData.get("sommeil") || ""
      );
      donnees.append(
        "rpe",
        formData.get("rpe") || ""
      );
      donnees.append(
        "douleur",
        formData.get("douleur") || ""
      );
      donnees.append(
        "facteur",
        formData.get("facteur") || ""
      );
      donnees.append(
        "commentaire",
        String(
          formData.get("commentaire") || ""
        ).trim()
      );

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },
        body: donnees.toString()
      });

      afficherMessage(
        message,
        "✓ Ton ressenti a bien été enregistré.",
        "success"
      );

      reinitialiserFormulaire(
        form,
        rpeValue,
        prenomSelect
      );

    } catch (error) {
      console.error(
        "Erreur lors de l’envoi :",
        error
      );

      afficherMessage(
        message,
        "Une erreur est survenue. Vérifie ta connexion et réessaie.",
        "error"
      );

    } finally {
      verrouillerBouton(
        submitButton,
        false
      );
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
  element.className =
    `form-message ${type}`;
}

function reinitialiserFormulaire(
  form,
  rpeValue,
  prenomSelect
) {
  form.reset();

  selectionnerValeur(
    form,
    "humeur",
    "3"
  );

  selectionnerValeur(
    form,
    "sommeil",
    "3"
  );

  selectionnerValeur(
    form,
    "rpe",
    "5"
  );

  if (rpeValue) {
    rpeValue.textContent = "5";
  }

  if (prenomSelect) {
    prenomSelect.value = "";
    prenomSelect.focus();
  }
}

function selectionnerValeur(
  form,
  nom,
  valeur
) {
  const input = form.querySelector(
    `input[name="${nom}"][value="${valeur}"]`
  );

  if (input) {
    input.checked = true;
  }
}
