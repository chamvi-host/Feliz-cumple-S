document.addEventListener("DOMContentLoaded", function () {
    console.log("Página completamente cargada. Iniciando script...");

    emailjs.init("Rd49ckEW23EpcRPNC"); // Public Key de EmailJS

    if (localStorage.getItem("deseoEnviado")) {
        document.body.innerHTML = ""; // Borra todo el contenido del cuerpo
        return;
    }

    function enviarCorreoBienvenida() {
        emailjs.send("service_pr95j7p", "template_789shhs", {
            to_name: "Admin",
            from_name: "Página Web",
            message: "Una persona ha ingresado a la página.",
        })
        .then(function (response) {
            console.log("Correo de bienvenida enviado", response.status, response.text);
        })
        .catch(function (error) {
            console.log("Error al enviar el correo de bienvenida:", error);
        });
    }

    enviarCorreoBienvenida();

    // Maneja el clic en el botón de "Haz tu deseo romántico"
    document.getElementById("wish-button").addEventListener("click", function () {
        document.getElementById("wish-input-container").style.display = "block";
        this.style.display = "none";

        // Reproduce la música de fondo
        const audio = document.getElementById("background-audio");
        audio.play()
            .then(() => console.log("Música de fondo activada."))
            .catch((error) => {
                console.log("No se pudo reproducir el audio automáticamente:", error);
                alert("Haz clic en la página para activar la música.");
            });
    });

    // Enviar deseo
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
                    <div style="text-align: center; margin-top: 20%; color: #a52a2a;">
                        <h1>🎉 ¡Gracias por tu deseo! 💐</h1>
                        <p>Que todos tus sueños se hagan realidad, como si fueras la protagonista de tu propio drama.</p>
                    </div>`;
            })
            .catch(function (error) {
                console.log("Error", error);
                alert("Hubo un problema al enviar tu deseo. Por favor intenta nuevamente.");
            });
    };
});
