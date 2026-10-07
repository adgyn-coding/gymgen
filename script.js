// Écouteur d'événement pour le bouton "Générer les exercices"
document.getElementById("generer").addEventListener("click", function () {
    let jour = document.getElementById("jour").value;
    let groupe = document.getElementById("groupe").value;

    // Récupérer les valeurs saisies par l'utilisateur
    let userSeries = document.getElementById("series").value;
    let userReps = document.getElementById("reps").value;
    let userTemps = document.getElementById("temps").value;
    let userRepos = document.getElementById("repos").value;

    // Liste des exercices avec des chemins d'images (utilisez des chemins relatifs ou des URLs absolues)
    // J'ai mis à jour les chemins pour utiliser vos images locales là où c'était indiqué.
    // Pour les placeholders, j'ai laissé les URLs placehold.co.
    // Important : assurez-vous que les chemins d'accès à vos images locales sont corrects !
    let exercices = {
        "pecs": [
            { nom: "Pompes militaires", images: ["Images d'exo/Pompes militaires.jpg"] },
            { nom: "Pompes surélevées", images: ["Images d'exo/Pompes surélevées.jpg"] },
            { nom: "Pompes pour les Lats", images: ["Images d'exo/Pompes pour les Lats.png"] },
            { nom: "Pompes sur tabouret", images: ["Images d'exo/Pompes sur tabouret.jpeg"] },
            { nom: "Pompes inversées avec haltère", images: ["Images d'exo/Pompes inversées avec haltère.png"] },            
            { nom: "Pompes main sur haltères", images: ["Images d'exo/Pompes main sur haltères1.jpg", "Images d'exo/Pompes main sur haltères2.jpg"] },
            { nom: "Pompes explosives", images: ["Images d'exo/Pompes explosives.jpeg"] }
        ],
        "epaules": [
            { nom: "Soulevé d'haltères vers le haut debout", images: ["Images d'exo/dumbbell-standing-overhead-press.png"] },
            { nom: "Rowing vertical", images: ["Images d'exo/Rowing verticale.png"] },
            { nom: "Soulevé d'haltères vers le haut debout rotation haltère", images: ["Images d'exo/Soulevé d'haltères vers le haut debout rotation haltère.jpg"] },
            { nom: "Élévations frontales", images: ["Images d'exo/dumbbell-front-raise.jpg"] },{ nom: "Élévations latérale", images: ["Images d'exo/lateral raise.jpg"] },
            { nom: "Pompes hindoues", images: ["Images d'exo/pompes-hindu-exercice-Litobox.png"] },
            { nom: "Pompes + Touché d'épaules", images: ["Images d'exo/shoulder-tap-push-up.png"] },
            { nom: "Soulevé d'haltères vers le haut assis", images: ["Images d'exo/Dumbbell-Shoulder-Press-resized.png"] },
            { nom: "Pompes piquées", images: ["Images d'exo/pike-push-up-muscles-sollicites.png"] },
            { nom: "Gainage + Touché d'épaules", type: "temps", images: ["Images d'exo/high-plank-shoulder-taps.jpg"] }
        ],
        "biceps": [
            { nom: "Curl", images: ["Images d'exo/Dumbbell-Alternate-Biceps-Curl-resized.png"] },
            { nom: "Curl assis", images: ["Images d'exo/dumbbell-reverse-grip-concentration-curl-resized.png"] },
            { nom: "Curl marteau", images: ["Images d'exo/Dumbbell-Hammer-Curl-resized.png"] },
            { nom: "Curl avant-bras", images: ["Images d'exo/reverse-grip-dumbbell-curl-resized.png"] },
            { nom: "Curl Zootman", images: ["Images d'exo/dumbbell-zottman-curl.png"] }
        ],
        "abdos": [
            { nom: "Crunchs", images: ["Images d'exo/Crunch.001.jpeg"] },
            { nom: "Cross crunchs", images: ["Images d'exo/cross-crunch.png"] },
            { nom: "Crunchs kicks", images: ["Images d'exo/Crunch kicks.jpg"] },
            { nom: "Crunchs Obliques", images: ["Images d'exo/Oblique-Crunch.png"] },
            { nom: "Leg raises", images: ["Images d'exo/leg-raise.png"] },
            { nom: "Russian twists", images: ["Images d'exo/russian-twist.jpg"] },
            { nom: "Flutter kicks", images: ["Images d'exo/Flutter-kicks.jpg"] },
            { nom: "Planche latérale", type: "temps", images: ["Images d'exo/Lateral-plank.jpg"] },
            { nom: "Planche vers V inversé", type: "temps", images: ["Images d'exo/pike_plan.png"] },
            { nom: "Marche en planche", type: "temps", images: ["Images d'exo/Plank walk.jpg"] },
            { nom: "Planche", type: "temps", images: ["Images d'exo/plank.jpg"] }
        ],
        "dos": [
            { nom: "Work upper back", images: ["Images d'exo/Work Back.png"] },
            { nom: "Work middle back", images: ["Images d'exo/Work middle back.png"] },
            { nom: "Single-Arm Row", images: ["Images d'exo/Single arm row.jpg"] },
            { nom: "Renegade Row", images: ["Images d'exo/Renegade-Row.png"] },
            { nom: "Work lower back", images: ["Images d'exo/Work lower back.jpg"] },
            { nom: "Gorilla Row", images: ["Images d'exo/Gorilla_Row.png"] },
            { nom: "Superman", images: ["Images d'exo/superman-w.png"] },
            { nom: "Tractions avec serviette", images: ["Images d'exo/traction-au-sol.jpg"] },
            { nom: "Trapeze work", images: ["Images d'exo/Shrugs.jpeg"] }
        ],
        "triceps": [
            { nom: "Triceps pont", images: ["Images d'exo/Triceps pont.jpg"] },
            { nom: "Dips sur lit", images: ["Images d'exo/Triceps Dips sur support.jpg"] },
            { nom: "Close-Grip Press au sol", images: ["Images d'exo/Close-grip-press.png"] },
            { nom: "Triceps derrière la tête", images: ["Images d'exo/Triceps OverHead.png"] },
            { nom: "Pompes diamant", images: ["Images d'exo/Diamond+Push+Ups.png"] }
        ]
    };

    let resultatHTML = `<h3>Exercices pour ${groupe.toUpperCase()} (${jour})</h3>`;

    if (groupe === "All") {
        Object.keys(exercices).forEach(muscle => {
            let exoList = exercices[muscle];
            let exo = exoList[Math.floor(Math.random() * exoList.length)];
            let typeAffichage = (exo.type === "temps") ? "secondes" : "reps";
            let valeur = (exo.type === "temps") ? userTemps : userReps;
            resultatHTML += `
                <div class="exercice-item">
                    <div class="exercice-text">
                        <p><b>${exo.nom} (${muscle})</b> - ${userSeries} séries de ${valeur} ${typeAffichage} <br><small style="color:gray;">Repos : ${userRepos} sec</small></p>
                    </div>
                    <div class="exercice-images">
                        ${exo.images.map(imgSrc => `<img src="${imgSrc}" alt="${exo.nom}" class="exercice-img zoomable-image" data-src-large="${imgSrc}">`).join('')}
                    </div>
                </div>
            `;
        });
    } else if (exercices[groupe]) {
        let exoList = exercices[groupe];
        let selection = [];
        // Sélectionne jusqu'à 2 exercices uniques si le groupe a suffisamment d'exercices
        const numToSelect = Math.min(2, exoList.length); 
        while (selection.length < numToSelect) {
            let exo = exoList[Math.floor(Math.random() * exoList.length)];
            if (!selection.includes(exo)) {
                selection.push(exo);
            }
        }

        selection.forEach(exo => {
            let typeAffichage = (exo.type === "temps") ? "secondes" : "reps";
            let valeur = (exo.type === "temps") ? userTemps : userReps;
            resultatHTML += `
                <div class="exercice-item">
                    <div class="exercice-text">
                        <p><b>${exo.nom}</b> - ${userSeries} séries de ${valeur} ${typeAffichage} <br><small style="color:gray;">Repos : ${userRepos} sec</small></p>
                    </div>
                    <div class="exercice-images">
                        ${exo.images.map(imgSrc => `<img src="${imgSrc}" alt="${exo.nom}" class="exercice-img zoomable-image" data-src-large="${imgSrc}">`).join('')}
                    </div>
                </div>
            `;
        });
    } else {
        resultatHTML = "<p style='color:red;'>Veuillez choisir un groupe musculaire valide.</p>";
    }

    document.getElementById("resultat").innerHTML = resultatHTML;
});


//Code pour les buttons de pause, d'arret, de reinstialisation, de choix de la durée et bip a la fin du chrono

const bipSon = new Audio("bip.mp3"); // le fichier son
let bipInterval = null;

let chrono = document.getElementById("chrono");
let toggleBtn = document.getElementById("toggleChrono");
let resetBtn = document.getElementById("resetChrono");
let chronoInput = document.getElementById("chronoInput");

let chronoInterval = null;
let secondes = parseInt(chronoInput.value);
let isRunning = false;

//Fonction d'affichage
function updateChronoDisplay() {
    let m = Math.floor(secondes / 60);
    let s = secondes % 60;
    chrono.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer/pauser le chronomètre
function toggleChrono() {
    if (!isRunning) {
        // Démarrer
        clearInterval(bipInterval); // Arrête le bip s'il est en cours
        bipInterval = null;
        chronoInterval = setInterval(() => {
            secondes--;
            if (secondes <= 0) {
                clearInterval(chronoInterval);
                chronoInterval = null;
                isRunning = false;
                toggleBtn.src = "media-play-svgrepo-com.svg";
                chrono.textContent = "Terminé !";

                // Le bip
                bipSon.play();
                bipInterval = setInterval(() => {
                    bipSon.play();
                }, 1000); // toutes les 1 seconde (pour bip continu)

            } else {
                updateChronoDisplay();
            }
        }, 1000);
        toggleBtn.src = "media-pause-svgrepo-com.svg";
        isRunning = true;
    } else {
        // Pause
        clearInterval(chronoInterval);
        chronoInterval = null;
        toggleBtn.src = "media-play-svgrepo-com.svg";
        isRunning = false;
    }
}

toggleBtn.addEventListener("click", toggleChrono);

//Bouton Reset
resetBtn.addEventListener("click", () => {
    clearInterval(chronoInterval);
    chronoInterval = null;
    clearInterval(bipInterval);
    bipInterval = null;
    isRunning = false;
    secondes = parseInt(chronoInput.value);
    updateChronoDisplay();
    toggleBtn.src = "media-play-svgrepo-com.svg";
});

//Initialisation
chronoInput.addEventListener("change", () => {
    secondes = parseInt(chronoInput.value);
    updateChronoDisplay();
    toggleBtn.src = "media-play-svgrepo-com.svg";
});

updateChronoDisplay();


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('zoomable-image')) {
        const imgSrc = e.target.dataset.srcLarge; // Utilisez data-src-large pour le zoom
        createImageOverlay(imgSrc);
    } else if (e.target.classList.contains('image-overlay') || e.target.classList.contains('close-button')) {
        removeImageOverlay();
    }
});

function createImageOverlay(imgSrc) {
    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;'; // Le symbole 'X'

    const img = document.createElement('img');
    img.src = imgSrc;
    img.classList.add('overlay-image');

    overlay.appendChild(closeButton);
    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

function removeImageOverlay() {
    const overlay = document.querySelector('.image-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}


//Bouton pour choisir les themes de couleur
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const themeMenu = document.getElementById("themeMenu");

let themeMenuOpen = false;

toggleThemeBtn.addEventListener("click", () => {
    themeMenuOpen = !themeMenuOpen;

    if (themeMenuOpen) {
        themeMenu.classList.add("show");
        toggleThemeBtn.src = "cross-svgrepo-com.svg"; // icône de croix
    } else {
        themeMenu.classList.remove("show");
        toggleThemeBtn.src = "palette-svgrepo-com (1).svg"; // retour à l’icône palette
    }
});


// Appliquer un thème au body
function applyTheme(themeName) {
    const body = document.body;
    // Enlève toutes les classes thème
    body.classList.remove('theme-light', 'theme-dark');
    // Ajoute la nouvelle classe
    body.classList.add('theme-' + themeName);
    // ➕ Lance l'animation
    body.classList.add('fade-theme');

    // Enlève la classe après animation (sinon elle reste collée)
    setTimeout(() => {
        body.classList.remove('fade-theme');
    }, 650); // doit correspondre au temps de l’animation

    // Sauvegarde dans localStorage
    localStorage.setItem('selectedTheme', themeName);
  }

  // Écoute les clics sur les <li> du menu
  document.querySelectorAll('#themeMenu li').forEach(item => {
    item.addEventListener('click', () => {
      const theme = item.dataset.theme;
      applyTheme(theme);
    });
  });

  // Charger le thème sauvegardé au démarrage
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme('light'); // thème par défaut
    }
  });

//Le serviceWorker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('✅ Service Worker enregistré', reg))
        .catch((err) => console.error('❌ Erreur Service Worker', err));
    });
  }

//Code pour l'exportation dans la galerie
document.getElementById("exporter").addEventListener("click", function () {
    let resultatDiv = document.getElementById("resultat");

    if (resultatDiv.innerHTML.trim() === "") {
        alert("Veuillez générer des exercices avant d'exporter !");
        return;
    }

    html2canvas(resultatDiv).then(canvas => {
        let image = canvas.toDataURL("image/png");
        let count = 1;

        let a = document.createElement("a");
        a.href = image;
        a.download = `exercices_de_la_semaine_${count + 1}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        alert("Image enregistrée !");
    });
});
