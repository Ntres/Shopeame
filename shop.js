getProducts = async() => {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
    console.log(data);
    pintarProductos(data);

};

pintarProductos = (products) => {
    products.forEach(product => {

        const container$$ = document.querySelector('.row');
        const contProducts$$ = document.querySelector('.title-page');

        const divProduct$$ = document.createElement('div');
        const titleProduct$$ = document.createElement('h3');
        const priceProduct$$ = document.createElement('span');
        const descProduct$$ = document.createElement('p');
        const imgProduct$$ = document.createElement('img');
        const btnProduct$$ = document.createElement('btn');
        const editProducts$$ = document.createElement('div');

        btnProduct$$.addEventListener('click', () => {
            openProduct(product)
        });

        imgProduct$$.src = product.image;
        titleProduct$$.textContent = product.name;
        descProduct$$.textContent = product.description;
        priceProduct$$.textContent = product.price + ' €';
        btnProduct$$.textContent = 'Editar';
        contProducts$$.textContent = 'Lista de productos (' + products.length + ')';

        editProducts$$.innerHTML = `
            <div class="rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span>${product.stars}</span>
            </div>`;

        editProducts$$.appendChild(btnProduct$$);

        divProduct$$.appendChild(imgProduct$$);
        divProduct$$.appendChild(titleProduct$$);
        divProduct$$.appendChild(priceProduct$$);
        divProduct$$.appendChild(descProduct$$);
        divProduct$$.appendChild(editProducts$$);

        divProduct$$.classList.add('col', 'col-lg-3', 'col-md-6', 'col-sm-12', 'product-div', 'd-flex', 'flex-column', 'mb-4', 'mt-4');
        imgProduct$$.classList.add('img-product');
        titleProduct$$.classList.add('title-product');
        priceProduct$$.classList.add('price-product');
        descProduct$$.classList.add('desc-product');
        editProducts$$.classList.add('d-flex', 'justify-content-between');
        btnProduct$$.classList.add('btn-product');

        container$$.appendChild(divProduct$$);

        // document.body.appendChild(divProduct$$);

    });

}

openProduct = (product) => {
    console.log('Producto --> ', product.id);
    window.location.href = "./gestion.html?id=" + product.id;
}

getProducts();