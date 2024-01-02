
document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = document.getElementById("videoPlayer");
  const overlay = document.getElementById("overlay");
  const formContainer = document.getElementById("formContainer");

  const videoPath = "videos/home/main_clip.mp4";

  videoPlayer.addEventListener("click", function () {
    videoPlayer.src = videoPath;
    videoPlayer.play();
  });

  videoPlayer.addEventListener("ended", function () {
    const currentSrc = videoPlayer.src;
    if (currentSrc.includes("_final")) {
      showFinalOptions();
    } else {
      overlay.style.display = "flex";
      showInitialOptions(currentSrc);
    }
  });

  function showInitialOptions(currentSrc) {
  // Mostrar el formulario inicial con las opciones de Historia 1 y Historia 2
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
}

  function showFinalOptions() {
    // Ocultar el formulario actual antes de cargar uno nuevo
    hideForm();

    // Obtener la historia actual basada en el videoPlayer.src
    const currentSrc = videoPlayer.src;

    if (currentSrc.includes("_final")) {
      // Mostrar el título "FIN" en lugar del formulario
      const finTitle = document.createElement("h1");
      finTitle.innerText = "FIN";
      finTitle.style.color = "white";
      finTitle.style.fontFamily = "sans-serif";
      finTitle.style.fontSize = "10rem";
      formContainer.appendChild(finTitle);
    } else {
      // El código restante es el mismo que antes
      let finalOptions = [];

      if (currentSrc.includes("h2_d1.mp4")) {
        // Mostrar el formulario con las opciones finales para h2_d1.mp4
        finalOptions = [
          { video: "h2_d1_final.mp4", title: "Ponerse a trabajar" },
        ];
      } else if (currentSrc.includes("h2_d2.mp4")) {
        // Mostrar el formulario con las opciones finales para h2_d2.mp4
        finalOptions = [
          { video: "h2_d2_sec1_final.mp4", title: "Ir al cuarto 3" },
          { video: "h2_d2_sec2_final.mp4", title: "Ir al Rooftop" },
        ];
      }

      const finalForm = createForm(finalOptions);
      formContainer.appendChild(finalForm);
    }
  }

  function hideForm() {
    // Ocultar o destruir el formulario actual
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

    return form;
  }

  function startStory(videoName) {
    videoPlayer.src = "videos/home/" + videoName;
    videoPlayer.play();
  }
});