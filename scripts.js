document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("videoPlayer");
    const overlay = document.getElementById("overlay");
    const formContainer = document.getElementById("formContainer");
    const progressAndFormContainer = document.createElement("div");
    progressAndFormContainer.id = "progressAndFormContainer";
    formContainer.appendChild(progressAndFormContainer);

    const playButton = document.getElementById("playButton");
    const videoPath = "videos/home/main_clip.mp4";
    const progressBarDuration = 10;

    let isVideoPlaying = false;
    let isDecisionPrompted = false;

    playButton.addEventListener("click", playMainClip);

    function playMainClip() {
        if (!isVideoPlaying) {
            videoPlayer.src = videoPath;
            videoPlayer.play();
            resetProgressBar();
            isVideoPlaying = true;
            playButton.style.display = "none"; // Ocultar el botón de reproducción al inicio
        }
    }

    videoPlayer.addEventListener("ended", function () {
        isVideoPlaying = false;
        const currentSrc = videoPlayer.src;
        if (currentSrc.includes("_final")) {
            showFinalOptions();
        } else {
            overlay.style.display = "flex";
            showInitialOptions(currentSrc);
            resetProgressBar();
            startProgressBar(currentSrc);
        }
    });

    function showInitialOptions(currentSrc) {
        if (!isDecisionPrompted) {
            let options;

            if (currentSrc.includes("h2_d2.mp4")) {
                options = [
                    { video: "h2_d2_sec1_final.mp4", title: "Ir al cuarto 3" },
                    { video: "h2_d2_sec2_final.mp4", title: "Ir al Rooftop" },
                ];
            } else if (currentSrc.includes("h2.mp4")) {
                options = [
                    { video: "h2_d1_final.mp4", title: "Ponerse a trabajar" },
                    { video: "h2_d2.mp4", title: "Subir al 3er piso" },
                ];
            } else {
                options = [
                    { video: "h1_final.mp4", title: "Cerrar las persianas" },
                    { video: "h2.mp4", title: "Sentarse en la silla" },
                ];
            }

            const initialForm = createForm(options);
            formContainer.innerHTML = "";
            formContainer.appendChild(initialForm);
            isDecisionPrompted = true;
        }
    }

    function showFinalOptions() {
        hideForm();
        const currentSrc = videoPlayer.src;

        if (currentSrc.includes("_final")) {
            const finTitle = document.createElement("h1");
            finTitle.classList.add("animate__animated", "animate__fadeIn"); // Agrega las clases de animación
            finTitle.innerText = "FIN";
            finTitle.style.color = "white";
            finTitle.style.fontFamily = "sans-serif";
            finTitle.style.fontSize = "10rem";
            formContainer.innerHTML = "";
            formContainer.appendChild(finTitle);
        } else {
            let finalOptions = [];

            if (currentSrc.includes("h2_d1.mp4")) {
                finalOptions = [
                    { video: "h2_d1_final.mp4", title: "Ponerse a trabajar" },
                ];
            } else if (currentSrc.includes("h2_d2.mp4")) {
                finalOptions = [
                    { video: "h2_d2_sec1_final.mp4", title: "Ir al cuarto 3" },
                    { video: "h2_d2_sec2_final.mp4", title: "Ir al Rooftop" },
                ];
            }

            progressAndFormContainer.style.display = "block";
            progressAndFormContainer.classList.add("animate__animated", "animate__fadeIn"); // Agrega las clases de animación
            startProgressBar();

            const finalForm = createForm(finalOptions);
            formContainer.innerHTML = "";
            formContainer.appendChild(finalForm);
        }
    }

    function hideForm() {
        const form = formContainer.querySelector("form");
        if (form) {
            form.classList.add("animate__animated", "animate__fadeOut"); // Agrega las clases de animación al formulario
            setTimeout(() => {
                formContainer.innerHTML = "";
                form.classList.remove("animate__animated", "animate__fadeOut"); // Restablece las clases después de la animación
            }, 500); // Ajusta según la duración de la animación
            isDecisionPrompted = false;
        }
    }

    function createForm(options) {
        const form = document.createElement("form");
        form.classList.add("d-flex", "flex-column", "align-items-center"); // Clases de Bootstrap para diseño flexible
    
        // Agregar la barra de progreso al formulario antes que los botones
        appendProgressBar(form);
    
        // Crear un contenedor para los botones
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("d-flex", "flex-row", "justify-content-center", "align-items-center", "flex-wrap"); // Clases de Bootstrap para diseño flexible
    
        options.forEach((option) => {
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("btn", "btn-outline-light", "mx-1", "my-2"); // Clases de Bootstrap para estilos de botones
            button.innerText = option.title;
            button.addEventListener("click", function () {
                hideForm();
                startStory(option.video);
            });
            buttonsContainer.appendChild(button);
        });
    
        // Agregar el contenedor de botones al formulario
        form.appendChild(buttonsContainer);
    
        return form;
    }
    
    

    function startStory(videoName) {
        // Ocultar el overlay al cargar un nuevo clip
        overlay.style.display = "none";
        if (videoPlayer.src !== "videos/home/" + videoName) {
            videoPlayer.src = "videos/home/" + videoName;
            videoPlayer.play();
            resetProgressBar();
            startProgressBar(videoPlayer.src);
            isVideoPlaying = true;
            playButton.style.display = "none"; // Ocultar el botón de reproducción cuando se inicie un nuevo vídeo
        }
    }

    function appendProgressBar(container) {
        const progressBar = document.createElement("progress");
        progressBar.id = "progressBar";
        progressBar.max = "100";
        progressBar.value = "100";

        container.appendChild(progressBar);
    }

    function startProgressBar() {
        let progressValue = 100;
        const interval = (progressBarDuration * 1000) / 100;

        const progressBar = document.getElementById("progressBar");

        if (progressBar) {
            progressBar.value = progressValue;

            const progressInterval = setInterval(function () {
                progressValue -= 1;
                progressBar.value = progressValue;

                if (progressValue <= 0) {
                    clearInterval(progressInterval);
                    resetProgressBar();
                    if (!isVideoPlaying) {
                        loadRandomClip();
                    }
                }
            }, interval);
        }
    }

    function resetProgressBar() {
        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
            progressBar.value = 100;
        }
    }

    function hideProgressAndFormContainer() {
        if (progressAndFormContainer.style.display !== "none") {
            progressAndFormContainer.classList.add("animate__animated", "animate__fadeOut"); // Agrega las clases de animación
            setTimeout(() => {
                progressAndFormContainer.style.display = "none";
                progressAndFormContainer.classList.remove("animate__animated", "animate__fadeOut"); // Restablece las clases después de la animación
            }, 500); // Ajusta según la duración de la animación
        }
    }

    function loadRandomClip() {
        hideForm();
        hideProgressAndFormContainer();

        let defaultOptions;
        if (videoPlayer.src.includes("h2_d2.mp4")) {
            defaultOptions = [
                { video: "h2_d2_sec1_final.mp4", title: "Ir al cuarto 3" },
                { video: "h2_d2_sec2_final.mp4", title: "Ir al Rooftop" },
            ];
        } else if (videoPlayer.src.includes("h2.mp4")) {
            defaultOptions = [
                { video: "h2_d1_final.mp4", title: "Ponerse a trabajar" },
                { video: "h2_d2.mp4", title: "Subir al 3er piso" },
            ];
        } else {
            defaultOptions = [
                { video: "h1_final.mp4", title: "Cerrar las persianas" },
                { video: "h2.mp4", title: "Sentarse en la silla" },
            ];
        }

        const randomOption = defaultOptions[Math.floor(Math.random() * defaultOptions.length)];
        startStory(randomOption.video);
    }
});
