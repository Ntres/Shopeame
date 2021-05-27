// getProducts = () => {
//     fetch('http://localhost:3000/products')
//         .then(res => res.json())
//         .then(data => console.log(data));
// }

// getProducts();


getProducts = async() => {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
    console.log(data);
    pintarProductos(data);

};

pintarProductos = (products) => {
    products.forEach(product => {

        const container$$ = document.querySelector('.row');
        const contProducts$$ = document.querySelector('.title-products');

        const divProduct$$ = document.createElement('div');
        const titleProduct$$ = document.createElement('h3');
        const descProduct$$ = document.createElement('p');
        const priceProduct$$ = document.createElement('span');
        const imgProduct$$ = document.createElement('img');

        imgProduct$$.src = product.image;
        titleProduct$$.textContent = product.name;
        descProduct$$.textContent = product.description;
        priceProduct$$.textContent = product.price;

        contProducts$$.textContent = 'Lista de productos (' + products.length + ')';

        divProduct$$.appendChild(imgProduct$$);
        divProduct$$.appendChild(titleProduct$$);
        divProduct$$.appendChild(descProduct$$);
        divProduct$$.appendChild(priceProduct$$);

        divProduct$$.classList.add('col', 'col-3', 'product-div');
        imgProduct$$.classList.add('img-product');

        container$$.appendChild(divProduct$$);

        // document.body.appendChild(divProduct$$);

    });

}

getProducts();