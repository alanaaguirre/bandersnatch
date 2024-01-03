document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("videoPlayer");
    const overlay = document.getElementById("overlay");
    const formContainer = document.getElementById("formContainer");
    const progressAndFormContainer = document.createElement("div");
    progressAndFormContainer.id = "progressAndFormContainer";
    formContainer.appendChild(progressAndFormContainer);

    const videoPath = "videos/home/main_clip.mp4";
    const progressBarDuration = 10;

    videoPlayer.addEventListener("click", function () {
        videoPlayer.src = videoPath;
        videoPlayer.play();
        resetProgressBar();
    });

    videoPlayer.addEventListener("ended", function () {
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
        let options;

        if (currentSrc.includes("h2_d2.mp4")) {
            options = [
                { video: "h2_d2_sec1_final.mp4", title: "Ir al cuarto 3" },
                { video: "h2_d2_sec_final.mp4", title: "Ir al Rooftop" },
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
        formContainer.innerHTML = ""; // Limpiar contenido previo
        formContainer.appendChild(initialForm);
    }

    function showFinalOptions() {
        hideForm();
        const currentSrc = videoPlayer.src;

        if (currentSrc.includes("_final")) {
            const finTitle = document.createElement("h1");
            finTitle.innerText = "FIN";
            finTitle.style.color = "white";
            finTitle.style.fontFamily = "sans-serif";
            finTitle.style.fontSize = "10rem";
            formContainer.innerHTML = ""; // Limpiar contenido previo
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
                    { video: "h2_d2_sec_final.mp4", title: "Ir al Rooftop" },
                ];
            }

            progressAndFormContainer.style.display = "block";
            startProgressBar();

            const finalForm = createForm(finalOptions);
            formContainer.innerHTML = ""; // Limpiar contenido previo
            formContainer.appendChild(finalForm);
        }
    }

    function hideForm() {
        formContainer.innerHTML = "";
    }

    function createForm(options) {
        const form = document.createElement("form");

        options.forEach((option) => {
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("action-button");
            button.innerText = option.title;
            button.addEventListener("click", function () {
                hideForm();
                startStory(option.video);
            });
            form.appendChild(button);
        });

        // Agregar la barra de progreso al formulario
        appendProgressBar(form);

        return form;
    }

    function startStory(videoName) {
        videoPlayer.src = "videos/home/" + videoName;
        videoPlayer.play();
        resetProgressBar();
        startProgressBar(videoPlayer.src);
    }

    function appendProgressBar(container) {
        const progressBar = document.createElement("progress");
        progressBar.id = "progressBar";
        progressBar.max = "100";
        progressBar.value = "100";

        container.appendChild(progressBar);
    }

    function startProgressBar(currentSrc) {
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

                    // Si el usuario no ha tomado una decisión, cargar un clip aleatorio
                    if (!currentSrc.includes("_final")) {
                        loadRandomClip(currentSrc);
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
        // Ocultar el contenedor que alberga la barra de progreso y el formulario
        progressAndFormContainer.style.display = "none";
    }

    function loadRandomClip(currentSrc) {
        // Ocultar el formulario y la barra de progreso
        hideForm();
        hideProgressAndFormContainer();
    
        // Lógica para cargar un clip aleatorio entre las opciones predeterminadas
        let defaultOptions;
        if (currentSrc.includes("h2_d2.mp4")) {
            defaultOptions = [
                { video: "h2_d2_sec1_final.mp4", title: "Ir al cuarto 3" },
                { video: "h2_d2_sec_final.mp4", title: "Ir al Rooftop" },
            ];
        } else if (currentSrc.includes("h2.mp4")) {
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
