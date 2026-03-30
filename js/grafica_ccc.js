window.onload = function () {

    const params = new URLSearchParams(window.location.search);
    let funcion = params.get("funcion");

    if (!funcion) {
        alert("No se recibió función");
        return;
    }

    console.log("Función:", funcion);

    // Convertir ^ a **
    funcion = funcion.replace(/\^/g, "**");

    let x_vals = [];
    let y_vals = [];

    for (let x = 0; x <= 5; x += 0.1) {
        try {
            let y = eval(funcion.replace(/x/g, `(${x})`));
            x_vals.push(x);
            y_vals.push(y);
        } catch (e) {
            console.error("Error evaluando:", e);
        }
    }

    const trace = {
        x: x_vals,
        y: y_vals,
        mode: 'lines+markers',
        type: 'scatter'
    };

    const layout = {
        title: `y = ${funcion}`,
        xaxis: { title: "x" },
        yaxis: { title: "y" }
    };

    Plotly.newPlot('grafico', [trace], layout);
};