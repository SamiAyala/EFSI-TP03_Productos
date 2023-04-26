axios.get('https://dummyjson.com/products')
    .then(response => {
        // handle success
        console.log(response);

        const divProductos = document.getElementById("listaProductos");

        response.data.products.forEach(product => {
            const Producto = document.createElement("div");
            Producto.classList.add("col")
            Producto.innerHTML = `<div class="card" style="width: 18rem;">
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
        console.log(error);
    })
    .finally(() => {
        // always executed
    });

axios.get('https://dummyjson.com/products/categories')
    .then(response => {
        // handle success
        console.log(response);
        const dropdown = document.getElementById("dropdownCategoria");
        response.data.forEach(categoria => {
            const liCategoria = document.createElement("li");
            liCategoria.classList.add("dropdown-item");
            liCategoria.onclick=mostrarCategoria(categoria);
            liCategoria.innerHTML = `${categoria}`
            dropdown.appendChild(liCategoria);
        })
    })
    .catch(error => {
        // handle error
        console.log(error);
    })
    .finally(() => {
        // always executed
    });

mostrarCategoria = (categoria)=>{
    const collapse = document.getElementById("collapseCategoria")
    axios.get('https://dummyjson.com/products/category/'+categoria)
        .then(function (response) {
            console.log(response);
            response.data.products.forEach(product => {
                const Producto = document.createElement("div");
                Producto.classList.add("col")
                Producto.innerHTML = `<div class="card" style="width: 18rem;">
                <img src="${product.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description} </br> Precio: ${product.price} (${product.discountPercentage}% OFF)  </br> ${product.rating}⭐</p>
                  <button type="button" class="btn btn-primary" onclick="mostrarModal(${product.id})">Detalle</button>
                </div>
              </div>`;
                collapse.appendChild(Producto);
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });   
}

const busqueda = document.getElementById("botonBusqueda");
busqueda.onclick = () => {
    let param = document.getElementById("parametroBusqueda");
    console.log(param.value)
    axios.get('https://dummyjson.com/products/search', {
        params: {
            q: param.value
        }
    })
        .then(function (response) {
            console.log(response);
            mostrarModal(response.data.products[0].id)
        })
        .catch(function (error) {
            console.log(error);
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
            console.log(response);
            modalTitle.innerHTML = producto.title;
            modalDetalle.innerHTML = `Marca: ${producto.brand} </br> ${producto.description} </br> Precio: ${producto.price} (${producto.discountPercentage}% OFF)  </br> ${producto.rating}⭐ </br> <img class ="img-thumbnail" src="${producto.thumbnail}">`
        })
        .catch(function (error) {
            console.log(error);
            modalTitle.innerHTML = "Error en la búsqueda";
            modalDetalle.innerHTML = "No se ha encontrado el producto.";
        })
        .finally(function () {
            // always executed
        });
    myModal.show();
}