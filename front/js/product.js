//Récupération de l'id dans l'URL
//Récupération de l'id dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

//Appel vers l'API avec ID produit
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(async function (data) {
        oneKanap = await data;
        showProduct(oneKanap);
    })

    .catch(error => alert("Zut ! Le serveur ne répond pas" + error));

//Show Kanap sheet
function showProduct(kanapSheet) {

    /*
    
     afficher les infos ?
    
    
    
    
    
    
    
    
    
    
    */

    //productId
    let id = oneKanap._id;
    //console.log(id);

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

//Add to localstorage//

//EventListener to add to cart
let button = document.getElementById("addToCart");
button.addEventListener("click", function () {

    //Choice and sent

    let colorValue = document.getElementById("colors").value;
    let quantityValue = +document.getElementById("quantity").value;
    let myCart = [];
    if (localStorage.getItem("cart")) {
        myCart = JSON.parse(localStorage.getItem("cart"));
    }
    if (quantityValue >= 1 && colorValue != "") { //quantity chosen color chosen => OK

        const selectProduct = {                  //Item created in LS
            id: oneKanap._id,
            color: colorValue,
            quantity: quantityValue,
        };

        let newProduct = true

        for (let product of myCart) { //permet de créer une boucle array qui parcourt un objet itérable

            //objet existe 
            if (product.id === selectProduct.id && product.color === selectProduct.color) {
                product.quantity += selectProduct.quantity; //Qtity changed 
                //+= opérateur d'addition et d'affectation calcule la somme (la concaténation) de ses 2 opérandes et affecte le résultat à la variable à gauche
                newProduct = false
            }
        }
        if (newProduct === true) {
            myCart.push(selectProduct);
        }

        localStorage.setItem("cart", JSON.stringify(myCart));

        alert("Votre sélection est ajoutée au panier");
    } else {

        /*if (quantityValue < 1) {
            alert("information manquante : Sélectionnez une quantité");
        };
        if (colorValue == ""); {
            alert("information manquante : Sélectionnez une couleur");*/
        function alertError() {
            if (quantityValue < 1) {
                return ("Sélectionnez une quantité");
            }
            if (colorValue == ""); {
                return ("Sélectionnez une couleur");
            }
        }
        alert("information manquante :" + alertError());
    };
}
);            