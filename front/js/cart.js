//Récupération de l'id dans l'URL
/*const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

//Récupération des arguments de l'en-tête et initialisation des variables
let itemCartId = urlParams.get("id");//la fonction qui ira chercher le 1er argument de l'en-tête
let itemCartColor = urlParams.get("color"); //la fonction qui ira chercher le 2ème argument de l'en-tête
let itemCartQuantity = urlParams.get("qty");//la fonction qui ira chercher le 3èmer argument de l'en-tête*/



// Tu récupères les données de localStorage
let myCart = JSON.parse(localStorage.getItem("cart"));

//fetch
for (i = 0; i < myCart.length; i++){
fetch(`http://localhost:3000/api/products/`+ myCart[i].id) 
 
  .then(response => response.json())
  .then(async function (data) {
    dataSet = await data;
    filterProduct(dataSet);
    	    console.log('dataSet : ' +  JSON.stringify(dataSet));
  })

  .catch(error => alert("Zut ! Le serveur ne répond pas" + error));
}

//récup "cart__items"
let cartLine = document.getElementById("cart__items");

function filterProduct(items) {
  let cartContent = document.querySelector("#cart__items");
  let article = document.createElement("article");
  article.className = "cart__item";
  article.setAttribute = ("data-id", items.id);
  article.setAttribute = ("data-color", items.color);
  cartContent.appendChild(article);

  //console.log(cartContent)

  //intégration des données du produit
  //Show img items in cart.html
  let imgCart = document.createElement("cartItemImg");  //n'affiche pas l'image
  imgCart.className = "cart__item__img";
  article.appendChild(imgCart);

  let image = document.createElement("img");
  image.setAttribute("src", items.imageUrl);
  image.setAttribute("alt", "Photographie d'un canapé");
  imgCart.appendChild(image);

  //Show descriptions in cart.html
  let descriptionCart = document.createElement("cartItemDescription");
  descriptionCart.className = "cart__item__content";
  article.appendChild(descriptionCart);

  let description = document.createElement("description");
  description.className = "cart__item__content__description";
  descriptionCart.appendChild(description);

  //Show name in cart.html
  let name = document.createElement("h2");
  name.textContent = items.name;
  descriptionCart.appendChild(name);

  //Show color in cart.html
  let color = document.createElement("p");
  color.textContent = "color : " + items.color;
  descriptionCart.appendChild(color);

  let quantity = document.createElement("p");
  quantity.textContent = "quantity : " + items.quantity;
  descriptionCart.appendChild(quantity);

};



/*function newCollection(obj, dataSet ) {

  let foundLine = [];
  
  foundLine.push( dataSet.filter( l => l._id == obj.id ));
  foundLine.push( { 'quantity': obj.quantity } );
  foundLine.push( { 'color' : obj.color } );

  return foundLine ;

                 };

function filterProduct(dataSet) {
	
	let filteredTab = [];

	for (let obj of myCart){

	filteredTab.push(newCollection(obj,dataSet));

	};
	
	console.log('filteredTab : ' + JSON.stringify(filteredTab));


//Show items in cart.html

};*/


//penser à calculer les quantités totales + prix total

//btn delete addEventListener
//fonction pour addEventListener
//calculer les + ou les - plutôt un delete du bloc qu'un refresh


// Get items in cart from localstorage

/*let itemInLocalStorage = localStorage.getItem("cart");*/
/*localStorage.getItem(itemInLocalStorage);
let cart = JSON.parse(itemInLocalStorage);
let quantityInLocalStorage = localStorage.setItem("cart", cart);
console.log(cart)                       //console.log => null
//fetch(`http://localhost:3000/api/products/${productId}`)  CECI EST UN FETCH A PARTIR DE L'API cf. L.25
for (let i = 0; i < quantityInLocalStorage.length; i++)*/

 

//Show items in cart.html
