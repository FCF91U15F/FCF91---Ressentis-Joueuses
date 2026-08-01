// =========================
// Sélection des boutons
// =========================

function setupSelectable(groupId, optionClass) {
    const group = document.getElementById(groupId);
    if (!group) return;

    const options = group.querySelectorAll(optionClass);

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            const input = option.querySelector('input');
            if (input) input.checked = true;
        });
    });
}

// Humeur
setupSelectable('humeurGroup', '.option');

// Sommeil
setupSelectable('sommeilGroup', '.option');

// RPE
const rpeGroup = document.getElementById('rpeGroup');

if (rpeGroup) {
    const rpeButtons = rpeGroup.querySelectorAll('.rpe-btn');
    const rpeValue = document.getElementById('rpeValue');

    rpeButtons.forEach(button => {
        button.addEventListener('click', () => {

            rpeButtons.forEach(b => b.classList.remove('selected'));

            button.classList.add('selected');

            const input = button.querySelector('input');
            if (input) {
                input.checked = true;
                rpeValue.textContent = input.value;
            }

        });
    });
}

// =========================
// Envoi du formulaire
// =========================

const form = document.getElementById('ressentiForm');

if (form) {
    form.addEventListener('submit', function(e){

        e.preventDefault();

        const data = {
            prenom: form.prenom.value,
            humeur: form.humeur.value,
            sommeil: form.sommeil.value,
            rpe: form.rpe.value,
            douleur: form.douleur.value,
            facteur: form.facteur.value
        };

        console.log(data);

        alert('Merci ! Ton ressenti a bien été enregistré.');

        // Plus tard :
        // fetch(URL_GOOGLE_SHEETS, { method: 'POST', body: JSON.stringify(data) });

    });
}
