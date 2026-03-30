function generarPuntos(funcion) {
    let puntos = [];

    for (let x = 0; x <= 5; x += 0.1) {
        try {
            let y = eval(funcion.replace(/x/g, `(${x})`));
            puntos.push({ x, y });
        } catch {}
    }

    return puntos;
}