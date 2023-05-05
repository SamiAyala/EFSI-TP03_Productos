let skipMostrados=0;
const cargarCatalogo = () =>{
axios.get('https://dummyjson.com/products?limit=10&',{
    params:{
        skip:skipMostrados
    }
})
    .then(response => {
        // handle success
        const divProductos = document.getElementById("listaProductos");
        divProductos.innerHTML= '';
        response.data.products.forEach(product => {
            const Producto = document.createElement("div");
            Producto.classList.add("col")
            Producto.innerHTML = `<div class="card mb-3" id="cardProducto" style="width: 18rem;">
            <img src="${product.thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description} </br> Precio: ${product.price} (${product.discountPercentage}% OFF)  </br> ${product.rating}⭐</p>
              <button type="button" class="btn btn-primary" onclick="mostrarModal(${product.id})">Detalle</button>
            </div>
          </div>`;
            divProductos.appendChild(Producto);
        });

    })
    .catch(error => {
        // handle error
    })
    .finally(() => {
        // always executed
    });
}
axios.get('https://dummyjson.com/products/categories')
    .then(response => {
        // handle success
        const dropdown = document.getElementById("dropdownCategoria");
        response.data.forEach(categoria => {
            const liCategoria = document.createElement("a");
            liCategoria.href="#";
            liCategoria.classList.add("dropdown-item");
            liCategoria.onclick = () => mostrarCategoria(categoria)
            liCategoria.innerHTML = `${categoria}`
            dropdown.appendChild(liCategoria);
        })
    })
    .catch(error => {
        // handle error
    })
    .finally(() => {
        // always executed
    });

const cambiarPagina = (numero) => {
    if((skipMostrados+numero)>=0 && (skipMostrados+numero)<=90){
    skipMostrados =skipMostrados + numero;
    cargarCatalogo();
    }
    else{alert('Error: La pagina no existe o no ha sido encontrada')}
}

const busqueda = document.getElementById("botonBusqueda");
busqueda.onclick = () => {
    let param = document.getElementById("parametroBusqueda");
    axios.get('https://dummyjson.com/products/search', {
        params: {
            q: param.value
        }
    })
        .then(function (response) {
            mostrarModal(response.data.products[0].id)
        })
        .catch(function (error) {
        })
        .finally(function () {
            // always executed
        });
    param.value='';
}

mostrarCategoria = (categoria) => {
    axios.get('https://dummyjson.com/products/category/' + categoria)
        .then(function (response) {
            const divProductos = document.getElementById("listaProductos");
        divProductos.innerHTML= ''
        response.data.products.forEach(product => {
            const Producto = document.createElement("div");
            Producto.classList.add("col")
            Producto.innerHTML = `<div class="card" id="cardProducto" style="width: 18rem;">
            <img src="${product.thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description} </br> Precio: ${product.price} (${product.discountPercentage}% OFF)  </br> ${product.rating}⭐</p>
              <button type="button" class="btn btn-primary" onclick="mostrarModal(${product.id})">Detalle</button>
            </div>
          </div>`;
            divProductos.appendChild(Producto);
            });
        })
        .catch(function (error) {
        })
        .finally(function () {
            // always executed
        });
}
const mostrarModal = (id) => {
    let modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerHTML = '';
    let modalDetalle = document.getElementById("modalDetalle");
    modalDetalle.innerHTML = '';
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    axios.get('https://dummyjson.com/products/' + id)
        .then(function (response) {
            let producto = response.data;
            modalTitle.innerHTML = producto.title;
            modalDetalle.innerHTML = `Marca: ${producto.brand} </br> ${producto.description} </br> Precio: ${producto.price} (${producto.discountPercentage}% OFF)  </br> ${producto.rating}⭐ </br> <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${producto.images[0]}" class="d-block w-100" id="img-carousel">
              </div>
              <div class="carousel-item">
                <img src="${producto.images[1]}" class="d-block w-100" id="img-carousel">
              </div>
              <div class="carousel-item">
                <img src="${producto.images[2]}" class="d-block w-100" id="img-carousel">
              </div>
              <div class="carousel-item">
                <img src="${producto.images[3]}" class="d-block w-100" id="img-carousel">
              </div>
              <div class="carousel-item">
                <img src="${producto.images[4]}" class="d-block w-100" id="img-carousel">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`
        })
        .catch(function (error) {
            modalTitle.innerHTML = "Error en la búsqueda";
            modalDetalle.innerHTML = "No se ha encontrado el producto.";
        })
        .finally(function () {
            // always executed
        });
    myModal.show();
}