fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    // 1. Conseguimos la lista de productos (asumiendo que viene en un array)
    let listaProductos = data.productos || data;

    // 2. ORDENAR: Los productos con 'agotado: true' se mueven al final automáticamente
    listaProductos.sort((a, b) => {
      return (a.agotado === true) - (b.agotado === true);
    });

    // 3. Renderizar los productos en el HTML
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    listaProductos.forEach(gelatina => {
      // Validamos si está agotado para cambiar el diseño del botón
      const estaAgotado = gelatina.agotado === true;
      
      const textoBoton = estaAgotado ? "Agotado" : "Comprar";
      const atributosBoton = estaAgotado ? "disabled style='background-color: #ccc; cursor: not-allowed;'" : "";

      // Creamos la tarjeta de la gelatina
      const tarjetaHTML = `
        <div class="tarjeta-producto ${estaAgotado ? 'producto-sin-stock' : ''}">
          <img src="${gelatina.imagen}" alt="${gelatina.nombre}">
          <h3>${gelatina.nombre}</h3>
          <p class="categoria">${gelatina.categoria}</p>
          <p class="precio">S/ ${gelatina.precio}</p>
          <button class="btn-compra" ${atributosBoton}>${textoBoton}</button>
        </div>
      `;
      
      contenedor.innerHTML += tarjetaHTML;
    });
  });
