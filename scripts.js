document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("videoPlayer");
    const overlay = document.getElementById("overlay");
    const formContainer = document.getElementById("formContainer");
    const progressAndFormContainer = document.createElement("div");
    progressAndFormContainer.id = "progressAndFormContainer";
    formContainer.appendChild(progressAndFormContainer);

    const playButton = document.getElementById("playButton");
    const videoPath = "videos/home-2/main_clip.mp4";
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
            let decisionOptions;
    
            // Agregar lógica adicional según la estructura de tu historia
            if (currentSrc.includes("main_clip.mp4")) {
                decisionOptions = [
                    { video: "alacena.mp4", title: "Ir a la alacena" },
                    { video: "2do-piso.mp4", title: "Subir al segundo piso" },
                ];
            }else if (currentSrc.includes("alacena.mp4")) {
                decisionOptions = [
                    { video: "IMG_0051.mp4", title: "Abrir la alacena" },
                    { video: "IMG_0062.mp4", title: "Tomar dulces" },
                ];
                
            }else if (currentSrc.includes("IMG_0062.mp4")) {
                decisionOptions = [
                    { video: "dejar-dulces_final.mp4", title: "Dejar los dulces" },
                    { video: "sentarse-silla.mp4", title: "Sentarse en la silla" },
                ];
                
            }else if (currentSrc.includes("sentarse-silla.mp4")) {
                decisionOptions = [
                    { video: "levantarse-mesa.mp4", title: "Levantarse de la mesa" },
                    { video: "admirar-planta_final.mp4", title: "Admirar la planta" },
                ];
                
            }else if (currentSrc.includes("levantarse-mesa.mp4")) {
                decisionOptions = [
                    { video: "salir-calle_final.mp4", title: "Salir a la calle" },
                    { video: "abrir-cava_final.mp4", title: "Abrir cava" },
                ];
                
            }else if (currentSrc.includes("IMG_0051.mp4")) {
                decisionOptions = [
                    { video: "IMG_0052.mp4", title: "Cerrar la alacena" },
                    { video: "tomar-comida_final.mp4", title: "Tomar comida" },
                ];
            }else if (currentSrc.includes("IMG_0052.mp4")) {
                decisionOptions = [
                    { video: "salir-jardin.mp4", title: "Salir al jardin" },
                    { video: "ir-sillon.mp4", title: "Ir al sillón" },
                ];
            }else if (currentSrc.includes("ir-sillon.mp4")) {
                decisionOptions = [
                    { video: "acariciar-gato_final.mp4", title: "Acariciar al gato" },
                    { video: "ir-2dopiso.mp4", title: "ir al segundo piso" },
                ];
            }else if (currentSrc.includes("ir-2dopiso.mp4")) {
                decisionOptions = [
                    { video: "subir-tercerpiso.mp4", title: "Subir al tercer piso" },
                    { video: "cuarto-2.mp4", title: "Ir al cuarto 2" },
                ];
            }else if (currentSrc.includes("salir-jardin.mp4")) {
                decisionOptions = [
                    { video: "ingresar-casa.mp4", title: "Entrar a la casa" },
                    { video: "barrer-piedras_final.mp4", title: "Barrer piedras" },
                ];
            }else if (currentSrc.includes("ingresar-casa.mp4")) {
                decisionOptions = [
                    { video: "salir-calle_final.mp4", title: "Salir a la calle" },
                    { video: "abrir-cava_final.mp4", title: "Abrir cava" },
                ];
            }  
             
            //H2
            else if (currentSrc.includes("2do-piso.mp4")) {
                decisionOptions = [
                    { video: "subir-tercerpiso.mp4", title: "Subir al tercer piso" },
                    { video: "cuarto-2.mp4", title: "Ir al cuarto 2" },
                ];
            } else if (currentSrc.includes("cuarto-2.mp4")) {
                decisionOptions = [
                    { video: "salir-estudio.mp4", title: "Salir al estudio" },
                    { video: "cuarto-2.mp4", title: "Acostarse en la cama" },
                ];
            } else if (currentSrc.includes("salir-estudio.mp4")) {
                decisionOptions = [
                    { video: "subir-tercerpiso.mp4", title: "Subir al tercer piso" },
                    { video: "bajar-piso1.mp4", title: "Bajar al primer piso" },
                ];
            } else if (currentSrc.includes("subir-tercerpiso.mp4")) {
                decisionOptions = [
                    { video: "patio_final.mp4", title: "Ir al patio" },
                    { video: "rooftop_final.mp4", title: "Ir al fooftop" },
                ];
            } else if (currentSrc.includes("bajar-piso1.mp4")) {
                decisionOptions = [
                    { video: "alacena.mp4", title: "Ir a la alacena" },
                    { video: "2do-piso.mp4", title: "Subir al segundo piso" },
                ];
            }
            const initialForm = createForm(decisionOptions);
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
        if (videoPlayer.src !== "videos/home-2/" + videoName) {
            videoPlayer.src = "videos/home-2/" + videoName;
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
    
        if (videoPlayer.src.includes("main_clip.mp4")) {
            // Decisiones principales
            defaultOptions = [
                { video: "h1.mp4", title: "Tomar decisión en h1" },
                { video: "h2.mp4", title: "Tomar decisión en h2" },
            ];
        } else if (videoPlayer.src.includes("h1.mp4")) {
            // Decisiones en h1
            defaultOptions = [
                { video: "h1_d1.mp4", title: "Tomar decisión en h1_d1" },
                { video: "h1_d2.mp4", title: "Tomar decisión en h1_d2" },
            ];
        } else if (videoPlayer.src.includes("h1_d1.mp4")) {
            // Decisiones en h1_d1
            defaultOptions = [
                { video: "h1_d1_s1.mp4", title: "Tomar decisión en h1_d1_s1" },
                { video: "h1_d2_s2.mp4", title: "Tomar decisión en h1_d2_s2" },
            ];
        } else if (videoPlayer.src.includes("h1_d1_s1.mp4")) {
            // Decisiones en h1_d1_s1
            defaultOptions = [
                { video: "h1_d1_s1_1_final.mp4", title: "Final 1" },
            ];
        } else if (videoPlayer.src.includes("h1_d2.mp4")) {
            // Decisiones en h1_d2
            // (Agregar más opciones según sea necesario)
        } else if (videoPlayer.src.includes("h2.mp4")) {
            // Decisiones en h2
            defaultOptions = [
                { video: "h2_d1.mp4", title: "Tomar decisión en h2_d1" },
                { video: "h2_d2.mp4", title: "Tomar decisión en h2_d2" },
            ];
        } else if (videoPlayer.src.includes("h2_d1.mp4")) {
            // Decisiones en h2_d1
            // (Agregar más opciones según sea necesario)
        } else if (videoPlayer.src.includes("h2_d2.mp4")) {
            // Decisiones en h2_d2
            defaultOptions = [
                { video: "h2_d2_s1_final.mp4", title: "Final 1" },
                { video: "h2_d2_s2_final.mp4", title: "Final 2" },
            ];
        }
    
        const randomOption = defaultOptions[Math.floor(Math.random() * defaultOptions.length)];
        startStory(randomOption.video);
    }
    
});