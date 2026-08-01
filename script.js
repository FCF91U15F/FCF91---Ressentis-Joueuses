"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ressentiForm");
    const rpeValue = document.getElementById("rpeValue");
    const message = document.getElementById("formMessage");

    const rpeInputs = document.querySelectorAll(
        'input[name="rpe"]'
    );

    rpeInputs.forEach((input) => {
        input.addEventListener("change", () => {
            if (rpeValue) {
                rpeValue.textContent = input.value;
            }
        });
    });

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (message) {
            message.textContent =
                "Ton ressenti a bien été enregistré.";
        }

        /*
         * La connexion avec Google Sheets
         * sera ajoutée ici lors de l'étape suivante.
         */
    });
});
