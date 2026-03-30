window.onload = function () {

    const params = new URLSearchParams(window.location.search);
    let funcion = params.get("funcion");

    if (!funcion) {
        alert("No se recibió función");
        return;
    }

    // Reemplazar ^ por **
    funcion = funcion.replace(/\^/g, "**");

    let data = [];

    // Generar puntos
    for (let x = 0; x <= 5; x += 0.1) {
        try {
            let y = eval(funcion.replace(/x/g, `(${x})`));
            data.push({ x: x, y: y });
        } catch (e) {}
    }

    const width = 800;
    const height = 500;

    const svg = d3.select("#grafico")
        .attr("width", width)
        .attr("height", height);

    // 🔵 TOOLTIP
    const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "lightblue")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("display", "none");

    // Escalas
    const xScale = d3.scale.linear()
        .domain([0, 5])
        .range([50, width - 50]);

    const yScale = d3.scale.linear()
        .domain([
            d3.min(data, d => d.y),
            d3.max(data, d => d.y)
        ])
        .range([height - 50, 50]);

    // Ejes
    const xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    const yAxis = d3.svg.axis().scale(yScale).orient("left");

    svg.append("g")
        .attr("transform", `translate(0,${height - 50})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(50,0)`)
        .call(yAxis);

    // Línea
    const line = d3.svg.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // 🔴 PUNTOS INTERACTIVOS
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 4)
        .attr("fill", "red")

        // Hover
        .on("mouseover", function (d) {
            tooltip.style("display", "block")
                .html(`(${d.x.toFixed(2)}, ${d.y.toFixed(2)})`);
        })

        // Movimiento del mouse
        .on("mousemove", function () {
            tooltip
                .style("top", (d3.event.pageY - 20) + "px")
                .style("left", (d3.event.pageX + 10) + "px");
        })

        // Salir del punto
        .on("mouseout", function () {
            tooltip.style("display", "none");
        })

        // Click
        .on("click", function (d) {
            d3.selectAll("circle").attr("fill", "red");
            d3.select(this).attr("fill", "green");

            console.log("Seleccionado:", d);
        });

};