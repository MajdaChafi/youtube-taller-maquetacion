/* ********* Menu ********* */
/* Funzioni anonime auto-eseguibili: 
Come parametro l'oggetto del documento, quindi scriverò il document ogni volta che avrò bisogno d'interagire con il document. 

Variabile
Per l'interazione del menu, ci servono variabili del dom (primo pulsante con segno del dollaro $) e il pulsante del menu a cui andremo a cliccare, selettore di query del document, selezionalo tramite la sua classe di bottone menu (.menu-btn). 

Variabile dom ($menu), selettore (d.querySelector), selezionalo tramite la sua classe di menu (.menu).

Programmo un evento sul clic del pulsante: 
All'interno del pulsante menu attivo, la variabile del pulsante del menu che voglio, dal 1° elemento figlio (btn-bar) all'ultimo elemento figlio, inseriremo l'elenco delle classi, scambia la classe none.

All'elemento del menu nell'elenco delle classi a cui andrai, scambia la classe isactive
*/ 

((d) => {
    const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

    $btnMenu.addEventListener("click", (e) => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });

    d.addEventListener("click", e => {
        if(!e.target.matches(".menu a")) return false;

        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
    });
})(document);


/* ********* ContactForm ********* */
/* formsubmit.co */
((d) => {
    const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/majdachafi78@gmail.com", {
            method: "POST", 
            body: new FormData(e.target), 
        })
        .then((res) => (res.ok ? res.json(): Promise.reject(res)))
        .then((json) => {
            console.log(json);
            $loader.classList.add("none");
            location.hash = "#gracias";
            $form.reset();
        })
        .catch((err) => {
            console.log(err);
            let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente"
            $response.querySelector("h3").innerHTML = 'Error ${err.status}: ${message}';
            $loader.classList.add("none");
        }).finally(() => {
            $loader.classList.add("none");
            setTimeout(() => {
                location.hash = "#close";
            }, 3000);
        });
    });
})(document);