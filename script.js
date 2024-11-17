document.addEventListener("DOMContentLoaded", function () {
    console.log("Página completamente cargada. Iniciando verificaciones...");

    emailjs.init("Rd49ckEW23EpcRPNC");

    const wishButton = document.getElementById("wish-button");
    const wishInputContainer = document.getElementById("wish-input-container");
    const backgroundAudio = document.getElementById("background-audio");

    if (localStorage.getItem("deseoEnviado") === "true") {
        document.body.innerHTML = `
            <div class="container">
                <h1>🎉 ¡Ya enviaste tu deseo! 🎉</h1>
                <p>Gracias por participar. ¡Esperamos que tengas un día maravilloso!</p>
            </div>
        `;
        return;
    }

    wishButton.addEventListener("click", function () {
        console.log("Botón de 'Pide tu deseo' presionado.");
        wishInputContainer.style.display = "block";
        this.style.display = "none";

        backgroundAudio.play().catch(error => {
            console.error("No se pudo reproducir el audio:", error);
            alert("Haz clic en la página para activar el audio.");
        });
    });
});

window.submitWish = function () {
    const wish = document.getElementById("wish-input").value;

    if (!wish.trim()) {
        alert("Por favor, escribe un deseo válido.");
        return;
    }

    emailjs.send("service_pr95j7p", "template_789shhs", { wish })
        .then(function () {
            console.log("Deseo enviado con éxito.");
            localStorage.setItem("deseoEnviado", "true");
            document.body.innerHTML = `
                <div class="container">
                    <h1>🎉 ¡Gracias por tu deseo! 🎉</h1>
                    <p>Tu mensaje ha sido enviado con éxito. ¡Esperamos que todos tus sueños se hagan realidad!</p>
                </div>
            `;
        })
        .catch(function (error) {
            console.error("Error al enviar el deseo: ", error);
            alert("Hubo un error al enviar tu deseo. Por favor, inténtalo nuevamente.");
        });
};
