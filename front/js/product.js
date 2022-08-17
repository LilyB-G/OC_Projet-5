//Récupération de l'id dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

//Appel vers l'API avec ID produit
fetch(`http://localhost:3001/api/products/${productId}`)
    .then(response => response.json())
    .then(async function (data) {
        oneKanap = await data;
        showProduct(oneKanap); //appel DOM
        // console.log("oneKanap: " + JSON.stringify(oneKanap));
    })

    .catch(error => alert("Zut ! Le serveur ne répond pas" + error));

//Show Kanap sheet
function showProduct(kanapSheet) {

    document.title = kanapSheet.name;
    let parent = document.querySelector(".item__img");

    //image + altTxt

    let image = document.createElement("img");
    image.setAttribute("src", kanapSheet.imageUrl);
    image.setAttribute("altTxt", kanapSheet.altTxt);
    parent.appendChild(image);

    //Name h3

    let h1 = document.querySelector("#title");
    h1.textContent = kanapSheet.name;

    //Price

    let price = document.querySelector("#price");
    price.textContent = kanapSheet.price;

    //Description

    let description = document.querySelector("#description");
    description.textContent = kanapSheet.description;

    //Select value colors

    let select = document.querySelector("#colors");
    let colors = kanapSheet.colors;

    //Loop for colors

    for (let i = 0; i < colors.length; i++) {
        let kanapColor = colors[i];
        let option = document.createElement("option");
        option.setAttribute("value", kanapColor);
        option.textContent = kanapColor;
        select.appendChild(option);
    }
}

// fin Dom

//EventListener to add to cart
let button = document.getElementById("addToCart");

button.addEventListener("click", function (e) {
    r = e.target;
    let actualColorValue = document.getElementById("colors").value;
    let actualQuantityValue = document.getElementById("quantity").value;
    if (r) {
        actuCart(actualColorValue, actualQuantityValue);

    };
});

/* -------------- Insert / update localstorage --------------- */

function actuCart(colorValue, quantityValue) {
    // la quantité et la couleur issues du formulaire sont des valeurs acceptables
    if (quantityValue >= 1 && colorValue != "") {
        updateLine(quantityValue, colorValue, productId); // ligne 88
    } else {
    // gestion erreur
        alertError(colorValue, quantityValue); // ligne 124
    };

}
function updateLine(quantityValue, colorValue, productId) {
    let myCart = []; // ini objet Array
    if (localStorage.getItem("cart")) {  //objet existe 
        myCart = JSON.parse(localStorage.getItem("cart"));
        console.log("cart: " + JSON.stringify(myCart));

        let i = 0;
        for (let product of myCart) { //permet de créer une boucle array qui parcourt un objet itérable

           
            if (product.id === productId && product.color === colorValue) { 
                
                    Object.assign(myCart[i], { "quantity": Number(product.quantity) + Number(quantityValue) });
                    //  console.log("myCart i : " + JSON.stringify(myCart[i]));
                    setItem(myCart);
                    //  console.log("myCart : " + JSON.stringify(myCart));
                    alert("quantité modifiée");
                

            };
        };
    };
     //objet n'existe pas: création
    if (!myCart.find(o => o.id == productId) || myCart.find(o => o.id == productId) && !myCart.find(o => o.color == colorValue)) {
        myCart.push({ "id": productId, "color": colorValue, "quantity": quantityValue });
        // console.log("mycart.push : " + JSON.stringify(myCart));
        alert("Votre sélection est ajoutée au panier");
        setItem(myCart);
    };
};

function setItem(myCart) { 
    localStorage.setItem("cart", JSON.stringify(myCart)); 
};


function alertError(colorValue, quantityValue) {

    if (colorValue === "") {
        alert("Sélectionnez une couleur");
    }
    else {
        if (quantityValue < 1 && Number.isInteger(quantityValue)) {
            alert("Sélectionnez une quantité");
        }
        else {
            alert("saisir un entier svp");

        }

    }
    
};