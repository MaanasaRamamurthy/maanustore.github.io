let carts=document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Pink dress',
        tag: 'dress1',
        price: 15,
        inCart: 0
    },
    {
        name: 'Red dress',
        tag: 'dress2',
        price: 20,
        inCart: 0
    },
    {
        name: 'Grey coat',
        tag: 'dress3',
        price: 20,
        inCart: 0
    },
    {   
        name: 'Grey hoodie',
        tag: 'dress4',
        price: 25,
        inCart: 0
    },
    {
        name: 'Orange t-shirt',
        tag: 'dress5',
        price: 20,
        inCart: 0
    }
]

for (let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productnumbers = localStorage.getItem('cartNumbers');

    if( productnumbers ) {
        document.querySelector('.cart span').textContent = productnumbers;
    }
}

function cartNumbers(products) {
    let productnumber = localStorage.getItem("cartNumbers");
    
    productnumber = parseInt(productnumber);

    if( productnumber ) {
        localStorage.setItem('cartNumbers', productnumber + 1);
        document.querySelector('.cart span').textContent = productnumber + 1;
    } else {
        localStorage.setItem('cartNumbers', 1 );
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(products);
}

function setItems(products){

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){

        if(cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
             [products.tag]: products
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

for( let i=1; i<= 5; i++){
    console.log(i);
}

function totalCost(products) {
    
    let cartCost = localStorage.getItem('totalCost');
    

    if( cartCost ){
        cartCost = parseInt( cartCost );
        localStorage.setItem("totalCost" , cartCost + products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);                     // when we grab data from local storage they come as JSON string, so we are converting them to javascript objects.
    
    let cartCost = localStorage.getItem('totalCost');

    let productContainer = document.querySelector(".products");
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values( cartItems ).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jfif">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `
        });

        productContainer.innerHTML +=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
        `
    }                 

    
}

onLoadCartNumbers();
displayCart();