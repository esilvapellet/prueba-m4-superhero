const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// function pageLoaded() {
//     let loaderSection = document.querySelector('.loader-section');
//     loaderSection.classList.add('loaded');
// }

// document.onload = pageLoaded();

function findHero() {
    let hero = document.getElementById("inputHero").value;
    if (isNaN(hero) || hero < 1 || hero > 732) {
        // alert("¡Solo existen 732 SuperHero!\n(Ingresa un valor en ese rango para buscar");
        mensaje = "SuperHero no encontrado, ¡Date prisa!, la ciudad te necesita! ";
        $("#mensaje").html(mensaje);
        $("#modalMensaje").modal('show');
    }
    else {
        obtenerData(hero);
    }
};

function resetHero() {
    $(".row").css("display", "none");
};

function obtenerData(hero) {

    let url = "https://www.superheroapi.com/api.php/3525635500807579/" + hero;
    $.ajax(url)
        .done(function (datos) {
            let { powerstats } = datos;
            powerstats = Object.entries(powerstats);
            let dataPoints = powerstats.map(element => ({ label: element[0], y: element[1] }));
            let personaje = {
                id: datos.id,
                name: datos.name,
                publisher: datos.biography.publisher,
                occupation: datos.work.occupation,
                first: datos.biography["first-appearance"],
                height: datos.appearance.height,
                weight: datos.appearance.weight,
                connections: datos.biography.aliases,
                image: datos.image.url,
                powerstats: dataPoints,
            };
            cargarGrafico(personaje);
            cargarData(personaje);
        })
        .fail(function () {
            alert("No fue posible cargar la información del Hero.");
        })
}

// obtenerData(hero);

function cargarGrafico(personaje = []) {
    const chart = new CanvasJS.Chart("graficoHero", {
        theme: "dark1",
        animationEnabled: true,
        title: {
            text: "Estadísticas de " + personaje.name,
            padding: 15,
            margin: 15,
        },
        data: [{
                type: "pie",
                startAngle: 270,
                toolTipContent: "<b>{label}</b> → {y}",
                indexLabel: "{label} → {y}",
                dataPoints: personaje.powerstats,
            }],
    });
    chart.render();
}

// function cargarGrafico(personaje = []) {
//     const chart = new CanvasJS.Chart("graficoHero", {
//         theme: "light1",
//         animationEnabled: true,
//         title: {
//             text: "Estadísticas de " + personaje.name,
//             horizontalAlign: "left"
//         },
//         data: [{
//             type: "doughnut",
//             startAngle: 270,
//             //innerRadius: 60,
//             indexLabelFontSize: 16,
//             indexLabel: "{label} → {y}",
//             toolTipContent: "<b>{label}</b> → {y}",
//             dataPoints: personaje.powerstats,
//         }]
//     });
//     chart.render();
// }


function cargarData(personaje) {
    $(".row").css("display", "flex");
    document.getElementById("imgHero").src = personaje.image;
    document.getElementById("titleHero").innerText = personaje.name;
    document.getElementById("nameHero").innerText = personaje.name;
    document.getElementById("pubHero").innerText = personaje.publisher;
    document.getElementById("occuHero").innerText = personaje.occupation;
    document.getElementById("firstHero").innerText = personaje.first;
    document.getElementById("heiHero").innerText = personaje.height;
    document.getElementById("weiHero").innerText = personaje.weight;
    if (personaje.connections == "") {
        document.getElementById("conHero").innerText = "Hola";
    }
    else {
        document.getElementById("conHero").innerText = personaje.connections;
    }

    document.getElementById("idHero").innerText = personaje.id;
};

