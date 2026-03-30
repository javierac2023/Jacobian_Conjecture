function cargarPagina(ruta) {
    fetch(ruta)
        .then(res => res.text())
        .then(html => {
            document.getElementById("contenido").innerHTML = html;

            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        })
        .catch(() => {
            document.getElementById("contenido").innerHTML =
                "<p>Error cargando capítulo</p>";
        });
}

function abrirGrafica(funcion) {
    window.open(`grafica_d3.html?funcion=${encodeURIComponent(funcion)}`, "_blank");
}

function abrirPrimos() {
    window.open("primos.html", "_blank");
}

function toggleSolucion(elemento) {
    const sol = elemento.nextElementSibling;

    const visible = window.getComputedStyle(sol).display !== "none";

    if (!visible) {
        sol.style.display = "block";
        elemento.innerText = "Ocultar solución ▲";
    } else {
        sol.style.display = "none";
        elemento.innerText = "Mostrar solución ▼";
    }
}
function irASeccion(url, id) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const contenedor = document.getElementById("contenido");
            contenedor.innerHTML = html;

            //  REPROCESAR LATEX
            if (window.MathJax) {
                MathJax.typesetPromise();
            }

            setTimeout(() => {
                const elemento = document.getElementById(id);
                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }, 100);
        });
}