const boton = ``

axios.get('https://dummyjson.com/products')
    .then(response => {
        // handle success
        console.log(response);

        const ulProductos = document.getElementById("listaProductos");

        response.data.products.forEach(product => {
            const liProducto = document.createElement("li");
            liProducto.innerHTML = `<b id="bProducto"> ${product.title}</b>
                <button type="button" class="btn btn-primary" onclick="mostrarModal(${product.id})">Detalle</button>`;
            ulProductos.appendChild(liProducto);
        });
    })
    .catch(error => {
        // handle error
        console.log(error);
    })
    .finally(() => {
        // always executed
    });

const busqueda = document.getElementById("botonBusqueda");
busqueda.onclick = () => {
    let collapseBusqueda = document.getElementById("collapseBusqueda");
            collapseBusqueda.innerHTML= '';
    let param = document.getElementById("parametroBusqueda");
    axios.get('https://dummyjson.com/products/search', {
        params: {
            q: param.value
        }
    })
        .then(function (response) {
            console.log(response);
            let producto = response.data.products[0];
            const pBusqueda = document.createElement("p");
            pBusqueda.innerHTML = `<b> ${producto.title}</b> </br> Marca: ${producto.brand} </br> ${producto.description} </br> Precio: ${producto.price} (${producto.discountPercentage}% OFF)  </br> ${producto.rating}⭐ </br> <img src="${producto.thumbnail}">`
            collapseBusqueda.appendChild(pBusqueda)
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
      })
      .finally(function () {
        // always executed
      });  
      myModal.show();
}