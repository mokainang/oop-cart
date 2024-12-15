const CART_ITEMS_CONTAINER = document.getElementById("cart-items-container");

const TOTAL_COST_TEXT = document.getElementById("total-cost");


console.log(CART_ITEMS_CONTAINER);
console.log(TOTAL_COST_TEXT);


// product Class

class Product {
    constructor(id, name, price) {
     this.id = id;
     this.name = name;
     this.price = price;   
    }
}

// A Cart item constructor inheriting properties from the product class

class CartItems extends Product {
    constructor(id, name, price, quantity) {
        super(id, name, price); /// Instead of using "this."" function to, we use the "super" function to inherit the prevu=ious value
        this.quantity =  quantity;
    }
// A method to calculate the cost of each item in the cart
    calculateCartItems(){
        //console.log("Your Item Costs 34 Naira");
        return this.price * this.quantity;
    }
}



// A Class to store all the shoping cart items
class ShopingCart{
    constructor(userShopingCart) {
        this.userShopingCart = userShopingCart;
    }
// A method to display all items in the user shopping cart

displayShoppingCartItems(){
    let userProducts = this.userShopingCart.map((item) => {
        return `<div class="flex justify-between border-b"> 
            <div>
                <h1 class="text-2xl font-semibold text-gray-400">${item.name}</h1>
                
                <button id = ${item.id} class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer my-2 delete--btn">
                    <i class="bi bi-trash"></i>
                    </button>
                    <h4>${item.calculateCartItems()}</h4>
            </div>
         <div>
            <h3 class="text-2xl font-semibold text-right">${item.price}</h3>
            <div class="flex gap-4 items-center">
                <button id=${item.id} class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer increase--btn"><i class="bi bi-plus"></i></button>
                <p>${item.quantity}</p>
                <button id=${item.id} class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer decrease--btn"><i class="bi bi-dash"></i></button>
            </div>
         </div>
        </div>`;
    }) 
    
    
    CART_ITEMS_CONTAINER.innerHTML = userProducts.join("");
    // targetting all buttons with the class of decrease--btn
    const DECREASE_BTN = document.querySelectorAll(".decrease--btn");
    // targetting all buttons with the class of increase--btn
    const INCREASE_BTN = document.querySelectorAll(".increase--btn");
    // targetting all buttons with the class of delete--btn
    const DELETE_BTN = document.querySelectorAll(".delete--btn");
    console.log(DELETE_BTN);

    //console.log(INCREASE_BTN);
    // to assign an event listener, use .foreach so we can append event listener
    // for every occurence of the array member
    // to implement it see below
    INCREASE_BTN.forEach((value) =>{    // This helps us to iterate the process
       
        // getting the value of the id attribute of each of the button
        let id_of_product = value.getAttribute("id");
       
       // Adding a click event on each of the increase--btn butoton
        value.addEventListener("click", () => this.increaseCartItems(id_of_product));
    });
    // ***
    
    DECREASE_BTN.forEach((value => {
        let id_of_product = value.getAttribute("id");
        value.addEventListener("click", () => this.decreaseCartItems(id_of_product));
    }));
    // ***

    DELETE_BTN.forEach((value) => {
        let id_of_product = value.getAttribute("id");
        value.addEventListener("click", () => this.deleteCartItems(id_of_product))
    });
}



// a method to increase the quantity of the item
increaseCartItems(id_of_product){
// use the ForEach loop array method to go through all the products the user has in his cart
this.userShopingCart.forEach((item) => {
    // check if any product in the user shopping cart matched=s the id attribute of the product that is clicked
    if (item.id === id_of_product) {
       // increase the quantity of that product by one
        item.quantity = item.quantity + 1;
    }
});
// then re-display the products again with the updated quantity
this.displayShoppingCartItems();
this.calculateTotalCostOfItemsInCart();
}

// a method to decrease the quantity of the item
decreaseCartItems(id_of_product){
    // use the ForEach loop array method to go through all the products the user has in his cart
    this.userShopingCart.forEach((item) => {
        // check if any product in the user shopping cart matched=s the id attribute of the product that is clicked
        if (item.id === id_of_product && item.quantity > 1) {
           // increase the quantity of that product by one
            item.quantity = item.quantity - 1;
        }
    });
    // then re-display the products again with the updated quantity
    this.displayShoppingCartItems();
    this.calculateTotalCostOfItemsInCart();
    }
    // a method for deleting a cart item
    deleteCartItems(id_of_product){
        // use the filter method to remove the product that has the id that is clicked
        let itemsLeftinCart = this.userShopingCart.filter((item) => item.id != id_of_product)

        this.userShopingCart = itemsLeftinCart;
        this.displayShoppingCartItems();
        this.calculateTotalCostOfItemsInCart();
    }

    // A method to calculate the total cost of products in the cart
    calculateTotalCostOfItemsInCart(){
        let total = 0;
        this.userShopingCart.forEach((item) => {
            total = total + (item.price * item.quantity);
        });
        TOTAL_COST_TEXT.innerText = total;
    }
}

const cart = new ShopingCart([
    new CartItems("1","IPhone", 2000, 1),
    new CartItems("2","Samsung", 4000, 1),
    new CartItems("3","Techno", 5000, 1),
    new CartItems("4","Itel", 10000, 1),
    new CartItems("5","Gionee", 7000, 1),
]);

cart.displayShoppingCartItems();
cart.calculateTotalCostOfItemsInCart();
