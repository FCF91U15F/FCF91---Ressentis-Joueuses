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
   MESSAGES APRÈS LA SÉANCE
   ========================================================= */

const MESSAGES_GENERAUX = [
  "Les grandes saisons se construisent grâce aux petits détails.",
  "Chaque séance est une étape de plus dans ta progression.",
  "La régularité transforme les efforts en progrès durables.",
  "Le travail réalisé aujourd’hui prépare les réussites de demain.",
  "Chaque réponse nous aide à mieux accompagner toute l’équipe.",
  "Une équipe progresse lorsque chacune prend soin des détails.",
  "Les progrès les plus solides se construisent séance après séance.",
  "Ton engagement quotidien participe à la force du collectif.",
  "Le sérieux dans les petites choses fait la différence sur le terrain.",
  "Chaque entraînement contribue à construire la joueuse que tu veux devenir.",
  "Le collectif avance grâce à l’implication de chacune.",
  "Les efforts répétés finissent toujours par laisser une trace.",
  "Une grande équipe commence par des joueuses responsables.",
  "Continuer à apprendre est déjà une manière de progresser.",
  "Les habitudes d’aujourd’hui construisent les performances de demain."
];

const MESSAGES_RECUPERATION = [
  "La récupération fait pleinement partie de l’entraînement.",
  "Maintenant que la séance est terminée, pense à bien récupérer.",
  "Hydratation, alimentation et sommeil préparent déjà la prochaine séance.",
  "Ton corps continue de travailler après l’entraînement : prends-en soin.",
  "Bien récupérer aujourd’hui permet de mieux progresser demain.",
  "Le repos est aussi une qualité importante chez une sportive.",
  "Une bonne nuit de sommeil fait partie de ta progression.",
  "Après l’effort, la récupération devient une priorité.",
  "Prendre soin de son corps, c’est aussi respecter son projet sportif.",
  "Les séances exigeantes ont besoin d’une récupération sérieuse."
];

const MESSAGES_EFFORT_ELEVE = [
  "La séance a été exigeante. Le travail est fait, place maintenant à la récupération.",
  "Les efforts importants font progresser lorsqu’ils sont suivis d’une bonne récupération.",
  "Tu as vécu une séance intense. Pense maintenant à recharger tes batteries.",
  "Une forte intensité demande ensuite du repos, de l’hydratation et un bon sommeil.",
  "Les séances difficiles construisent la progression lorsqu’on sait ensuite récupérer.",
  "Ton corps a beaucoup travaillé. Accorde-lui maintenant l’attention nécessaire.",
  "L’effort d’aujourd’hui doit être accompagné d’une récupération de qualité.",
  "Après une séance intense, les petits gestes de récupération deviennent essentiels."
];

const MESSAGES_SOMMEIL_FAIBLE = [
  "Le sommeil est ton entraînement invisible. Essaie de bien récupérer cette nuit.",
  "Une bonne nuit de sommeil peut faire une grande différence dans ta progression.",
  "Ton corps a besoin de repos pour profiter pleinement du travail réalisé.",
  "Pense à préserver ton sommeil : il est essentiel à la récupération.",
  "La récupération commence souvent par une nuit calme et suffisamment longue.",
  "Prendre soin de ton sommeil, c’est aussi prendre soin de tes performances.",
  "Ce soir, donne à ton corps le temps nécessaire pour récupérer.",
  "Le repos permet à ton organisme d’assimiler les efforts de la séance."
];

const MESSAGES_HUMEUR_BASSE = [
  "Merci d’avoir partagé ton ressenti avec sincérité. Chaque journée est différente.",
  "Une séance ne résume jamais ton parcours. Continue à avancer à ton rythme.",
  "Les journées plus difficiles font aussi partie de la progression.",
  "Ton ressenti est important et le groupe est là pour avancer ensemble.",
  "Prendre le temps de reconnaître son état du jour est une force.",
  "Merci pour ton honnêteté. N’hésite jamais à échanger avec le staff.",
  "Chaque nouvelle journée offre une nouvelle occasion d’avancer.",
  "Les difficultés du jour peuvent devenir les forces de demain."
];

const MESSAGES_DOULEUR = [
  "Merci d’avoir signalé cette douleur. Cela nous aide à mieux t’accompagner.",
  "Signaler une gêne rapidement est une attitude responsable.",
  "Prendre soin de son corps est une partie essentielle de la progression.",
  "Ton signalement est important. N’hésite pas à en parler directement au staff.",
  "Écouter son corps est une qualité indispensable chez une sportive.",
  "Une douleur exprimée tôt est plus facile à comprendre et à accompagner.",
  "Merci pour ta sincérité. Le staff prendra ton ressenti en compte.",
  "Ta santé reste prioritaire. Pense à échanger avec le staff si la gêne persiste."
];

const MESSAGES_BONNE_DYNAMIQUE = [
  "Continue à construire sur cette bonne dynamique avec sérieux et régularité.",
  "Lorsque les sensations sont bonnes, profite-en pour consolider tes progrès.",
  "Cette bonne dynamique est le résultat des efforts réalisés au quotidien.",
  "Les bonnes sensations se cultivent grâce à la régularité.",
  "Continue sur cette voie tout en restant attentive aux besoins de ton corps.",
  "La constance est l’une des plus grandes forces d’une sportive.",
  "Une bonne dynamique individuelle peut aussi faire grandir toute l’équipe.",
  "Continue à avancer avec la même envie et le même sérieux.",
  "Le travail régulier construit une confiance durable.",
  "Profite de cette dynamique pour continuer à apprendre et progresser."
];

/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ressentiForm");
  const header = document.querySelector(".ressenti-header");
  const prenomSelect = document.getElementById("prenom");
  const rpeValue = document.getElementById("rpeValue");
  const formMessage = document.getElementById("formMessage");
  const submitButton = form?.querySelector(".submit-button");

  const successCard = document.getElementById("successCard");
  const successPlayerName =
    document.getElementById("successPlayerName");
  const successMessage =
    document.getElementById("successMessage");

  /* Création de la liste déroulante */

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

  /* Mise à jour de l'affichage RPE */

 /* =========================================================
   NOUVELLE RÈGLE GRADUÉE RPE
   ========================================================= */

const rpeSlider = document.getElementById("rpe");
const rpeRuler = document.getElementById("rpeRuler");

function mettreAJourRpe() {
  if (!rpeSlider) {
    return;
  }

  const valeur = Number(rpeSlider.value);
  const minimum = Number(rpeSlider.min);
  const maximum = Number(rpeSlider.max);

  const pourcentage =
    ((valeur - minimum) / (maximum - minimum)) * 100;

  if (rpeValue) {
    rpeValue.textContent = String(valeur);
  }

  if (rpeRuler) {
    rpeRuler.style.setProperty(
      "--rpe-position",
      `${pourcentage}%`
    );
  }
}

if (rpeSlider) {
  rpeSlider.addEventListener(
    "input",
    mettreAJourRpe
  );

  rpeSlider.addEventListener(
    "change",
    mettreAJourRpe
  );

  mettreAJourRpe();
}

  /* Envoi du questionnaire */

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
        formMessage,
        "Merci de sélectionner ton prénom.",
        "error"
      );

      prenomSelect?.focus();
      return;
    }

    const humeur = Number(
      formData.get("humeur")
    );

    const sommeil = Number(
      formData.get("sommeil")
    );

    const rpe = Number(
      formData.get("rpe")
    );

    const douleur = String(
      formData.get("douleur") || ""
    );

    verrouillerBouton(
      submitButton,
      true
    );

    afficherMessage(
      formMessage,
      "Enregistrement en cours…",
      "loading"
    );

    try {
      const donnees = new URLSearchParams();

      donnees.append(
        "prenom",
        prenom
      );

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
        douleur
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

      const messagePersonnalise =
        choisirMessagePersonnalise({
          humeur,
          sommeil,
          rpe,
          douleur
        });

      afficherCarteRemerciement({
        prenom,
        message: messagePersonnalise,
        form,
        header,
        successCard,
        successPlayerName,
        successMessage
      });

    } catch (error) {
      console.error(
        "Erreur lors de l’envoi :",
        error
      );

      afficherMessage(
        formMessage,
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
   CHOIX DU MESSAGE
   ========================================================= */

function choisirMessagePersonnalise({
  humeur,
  sommeil,
  rpe,
  douleur
}) {
  let messagesPossibles = [];

  /*
   * La douleur reste prioritaire.
   */

  if (
    douleur
      .trim()
      .toLowerCase() === "oui"
  ) {
    messagesPossibles = MESSAGES_DOULEUR;
  }

  /*
   * Puis les situations de récupération.
   */

  else if (sommeil <= 2) {
    messagesPossibles =
      MESSAGES_SOMMEIL_FAIBLE;
  }

  else if (humeur <= 2) {
    messagesPossibles =
      MESSAGES_HUMEUR_BASSE;
  }

  else if (rpe >= 8) {
    messagesPossibles =
      MESSAGES_EFFORT_ELEVE;
  }

  /*
   * Bonne humeur, bon sommeil et RPE faible ou modéré.
   */

  else if (
    humeur >= 4 &&
    sommeil >= 4 &&
    rpe <= 5
  ) {
    messagesPossibles =
      MESSAGES_BONNE_DYNAMIQUE;
  }

  /*
   * Les autres situations mélangent
   * progression, collectif et récupération.
   */

  else {
    messagesPossibles = [
      ...MESSAGES_GENERAUX,
      ...MESSAGES_RECUPERATION
    ];
  }

  return choisirElementAleatoire(
    messagesPossibles
  );
}

/* =========================================================
   AFFICHAGE DE LA CARTE
   ========================================================= */

function afficherCarteRemerciement({
  prenom,
  message,
  form,
  header,
  successCard,
  successPlayerName,
  successMessage
}) {
  if (
    !successCard ||
    !successPlayerName ||
    !successMessage
  ) {
    return;
  }

  successPlayerName.textContent =
    prenom.toUpperCase();

  successMessage.textContent =
    message;

  form.classList.add("is-hidden");
  header?.classList.add("is-hidden");

  successCard.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   OUTILS
   ========================================================= */

function choisirElementAleatoire(liste) {
  const index = Math.floor(
    Math.random() * liste.length
  );

  return liste[index];
}

function verrouillerBouton(
  button,
  verrouille
) {
  if (!button) {
    return;
  }

  button.disabled = verrouille;

  button.textContent = verrouille
    ? "ENREGISTREMENT…"
    : "ENVOYER";
}

function afficherMessage(
  element,
  texte,
  type
) {
  if (!element) {
    return;
  }

  element.textContent = texte;
  element.className =
    `form-message ${type}`;
}
