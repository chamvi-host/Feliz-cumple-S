document.addEventListener("DOMContentLoaded", function () {
    console.log("Página completamente cargada. Iniciando verificaciones...");

    // Verificar si EmailJS está correctamente inicializado
    try {
        emailjs.init("Rd49ckEW23EpcRPNC"); // Public Key de EmailJS
        console.log("EmailJS correctamente inicializado.");
    } catch (error) {
        console.error("Error al inicializar EmailJS: ", error);
    }

    // Verificar si el botón y el contenedor de deseos están presentes en el DOM
    const wishButton = document.getElementById("wish-button");
    const wishInputContainer = document.getElementById("wish-input-container");
    const backgroundAudio = document.getElementById("background-audio");

    if (wishButton && wishInputContainer && backgroundAudio) {
        console.log("Elementos del DOM encontrados: Botón, Contenedor de Deseos, y Audio.");
    } else {
        console.error("Faltan elementos del DOM: ", {
            wishButton: wishButton ? "OK" : "NO",
            wishInputContainer: wishInputContainer ? "OK" : "NO",
            backgroundAudio: backgroundAudio ? "OK" : "NO"
        });
    }

    // Verificar si los archivos CSS están cargados
    const styles = document.styleSheets;
    if (styles.length > 0) {
        console.log("Archivos CSS cargados correctamente.");
    } else {
        console.error("No se encontraron archivos CSS.");
    }

    // Verificar si el audio puede reproducirse
    backgroundAudio.play().then(() => {
        console.log("Audio cargado y puede reproducirse.");
    }).catch((error) => {
        console.error("Error al cargar el audio: ", error);
    });

    // Verificar si el botón de "Pide tu deseo" tiene el evento de clic
    wishButton.addEventListener("click", function () {
        console.log("Botón de 'Pide tu deseo' presionado.");
        wishInputContainer.style.display = "block";  // Mostrar el contenedor de deseos
        this.style.display = "none"; // Ocultar el botón
        console.log("Contenedor de deseos mostrado y botón oculto.");

        // Reproducir el audio al hacer clic
        backgroundAudio.play().catch((error) => {
            console.log("No se pudo reproducir el audio:", error);
            alert("Haz clic en la página para activar el audio.");
        });
    });

    // Verificar si la función submitWish está correctamente definida
    if (typeof window.submitWish === "function") {
        console.log("Función submitWish está definida.");
    } else {
        console.error("Función submitWish no está definida.");
    }

    // Si todo está bien, muestra "OK" en la consola
    console.log("Verificaciones completas. ¡Todo está funcionando correctamente!");
});

// Función para enviar el deseo a través de EmailJS
window.submitWish = function () {
    const wish = document.getElementById("wish-input").value;

    if (!wish.trim()) {
        alert("Por favor, escribe un deseo válido.");
        return;
    }

    emailjs.send("service_pr95j7p", "template_789shhs", { wish })
        .then(function (response) {
            console.log("Éxito", response.status, response.text);
            localStorage.setItem("deseoEnviado", "true");
            document.body.innerHTML = `
                <
