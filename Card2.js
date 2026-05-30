// 1. LISTA DE RESPALDO (Vacía)
const listaproductosRespaldo = [];

// 2. FUNCIÓN PARA DIBUJAR LAS TARJETAS EN EL HTML
function renderizarProductos(listaParaPintar) {
    let productitem = document.getElementById("productos");

    if (!productitem) return;

    productitem.innerHTML = ""; 

    if (!listaParaPintar || listaParaPintar.length === 0) {
        productitem.innerHTML = `<p style="text-align:center; width:100%; color:#888; grid-column: 1/-1; padding: 20px;">No hay productos disponibles por el momento. ¡Añade uno desde tu panel!</p>`;
        return;
    }

    // ORDENAR: Envía los productos con 'agotado: true' al final de la lista de forma automática
    listaParaPintar.sort((a, b) => {
        return (a.agotado === true) - (b.agotado === true);
    });
    listaParaPintar.forEach((product, index) => {
        let urlImagen = product.imagen || product.image || "";
        const idProducto = product.id !== undefined && product.id !== null ? product.id : (index + 1);

        if (urlImagen.startsWith("/")) {
            urlImagen = urlImagen.substring(1); 
        }

        if (urlImagen.startsWith("imagenes/") && !urlImagen.startsWith("./")) {
            urlImagen = "./" + urlImagen;
        }

        const precioVenta = product.precio ? parseFloat(product.precio).toFixed(2) : "0.00";
        const precioDescuento = product.descuento ? parseFloat(product.descuento).toFixed(2) : "0.00";

        // Validación de stock para modificar el botón y añadir el efecto opaco
        const estaAgotado = product.agotado === true;
        const textoBoton = estaAgotado ? "Agotado" : (product.botton || "Agregar");

        // Estilo dinámico para poner Gris toda la tarjeta del producto si está agotado
        const estiloTarjetaGris = estaAgotado 
            ? `style="filter: grayscale(100%); opacity: 0.6; background-color: #f5f5f5;"` 
            : '';

        // Desactiva por completo el botón si el producto está sin stock
        const atributosBoton = estaAgotado 
            ? `disabled style="background-color: #ccc; border-color: #ccc; color: #666; cursor: not-allowed; pointer-events: none;"` 
            : `onclick="addToCart(${idProducto}, '${product.nombre || 'Gelatina'}', ${product.precio || 0}, '${urlImagen}')"`;

        const iconoBoton = estaAgotado 
            ? `<i class="fas fa-times-circle"></i>` 
            : `<i class="fas fa-cart-plus"></i>`;
        productitem.innerHTML += `
        <div class="product-card ${estaAgotado ? 'agotado-card' : ''}" ${estiloTarjetaGris} data-category="${product.categoria || 'Todos'}">
            <span class="product-tag tag-bestseller" ${estaAgotado ? 'style="display:none;"' : ''}>Más Vendido</span>
            <img src="${urlImagen}" alt="${product.nombre || 'Gelatina'}" class="product-image" onerror="this.onerror=null; this.src='https://placehold.co/300x300?text=Imagen+no+disponible'">
            <div class="product-info">
                <div class="product-category">${product.categoria || 'Dulce'}</div>
                <h3 class="product-name">${product.nombre || 'Sin Nombre'}</h3>
                <p class="product-description">${product.descripcion || 'Sin descripción'}</p>
                <div class="product-footer">
                    <div class="product-price"> S/${precioVenta}<span> S/${precioDescuento}</span></div>
                    <button class="add-to-cart" ${atributosBoton}>
                        ${iconoBoton}
                        ${textoBoton}
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}
