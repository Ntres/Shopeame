// Components DOM
const form$$ = document.querySelector('form');
const btnDelete$$ = document.querySelector('[event-data="delete"]');
const btnAdd$$ = document.querySelector('[event-data="send"]');
const containerProduct$$ = document.querySelector('[event-data="product-div"]');

const name$$ = document.querySelector('#name');
const price$$ = document.querySelector('#price');
const description$$ = document.querySelector('#description');
const image$$ = document.querySelector('#image');
const stars$$ = document.querySelector('#stars');

const divProduct$$ = document.createElement('div');
const titleProduct$$ = document.createElement('h3');
const priceProduct$$ = document.createElement('span');
const descProduct$$ = document.createElement('p');
const imgProduct$$ = document.createElement('img');

// Linsteners
btnAdd$$.addEventListener('click', logSubmit);

btnDelete$$.addEventListener('click', (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    deleteProduct(id);
});

form$$.addEventListener('input', (event) => {
    console.log('cambios --> ', event.target.id, event.target.value);
    console.log('pacooooo--> ', event.target.id);

    let value = event.target.value;

    if (event.target.id === 'name') {
        titleProduct$$.textContent = value;
    }
    if (event.target.id === 'price') {
        priceProduct$$.textContent = value + ' €';
    }
    if (event.target.id === 'description') {
        descProduct$$.textContent = value;
    }
    if (event.target.id === 'stars') {}
    if (event.target.id === 'image') {
        imgProduct$$.src = value;
    }

});

// Functions
let urlParams;
let id;

const iniciar = () => {
    urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get("id");
    if (id) {
        console.log('editar');
        console.log(id)
        getProduct(id);
    } else {
        console.log('nuevo');
        createElements();
    }
};

const getProduct = async(id) => {
    const res = await fetch('http://localhost:3000/products?id=' + id);
    const data = await res.json();
    printProduct(data[0]);
    fillForm(data);
};

const fillForm = (data) => {
    name$$.value = data[0].name;
    price$$.value = data[0].price;
    description$$.value = data[0].description;
    image$$.value = data[0].image;
    stars$$.value = data[0].stars;
};

const printProduct = (data) => {
    const product = data;

    imgProduct$$.src = product.image;
    titleProduct$$.textContent = product.name;
    descProduct$$.textContent = product.description;
    priceProduct$$.textContent = product.price + ' €';

    createElements()

};

const createElements = () => {
    divProduct$$.classList.add('col', 'product-div', 'd-flex', 'flex-column', 'mb-4', 'mt-4');
    imgProduct$$.classList.add('img-product');
    titleProduct$$.classList.add('title-product');
    priceProduct$$.classList.add('price-product');
    descProduct$$.classList.add('desc-product');

    divProduct$$.appendChild(imgProduct$$);
    divProduct$$.appendChild(titleProduct$$);
    divProduct$$.appendChild(priceProduct$$);
    divProduct$$.appendChild(descProduct$$);

    containerProduct$$.appendChild(divProduct$$);
}


function logSubmit(event) {
    event.preventDefault();

    const name = form$$.querySelector('#name').value;
    const price = form$$.querySelector('#price').value;
    const description = form$$.querySelector('#description').value;
    const image = form$$.querySelector('#image').value;
    const stars = form$$.querySelector('#stars').value;

    const product = {
        name,
        price,
        description,
        image,
        stars
    };

    if (id) {
        updateProduct(id, product);
    } else {
        addProduct(product);
    }
}

addProduct = async(newProduct) => {
    console.log('Crear')
    const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newProduct)
    });

    form$$.reset();
    alert('Nuevo producto creado! Gracias');
    window.location.href = "./shop.html";
};

updateProduct = async(id, product) => {
    console.log('Editar --> ', id);
    const res = await fetch('http://localhost:3000/products/' + id, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(product)
    });

    form$$.reset();
    alert('Producto actualizado correctamente!');
    window.location.href = "./shop.html";
}

deleteProduct = async(idProduct) => {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
        console.log('idProduct --> ', idProduct);
        const res = await fetch('http://localhost:3000/products/' + idProduct, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        window.location = "shop.html";
    } else {
        console.log('No se borra');
    }

};

// Iniciamos todas las acciones
iniciar();