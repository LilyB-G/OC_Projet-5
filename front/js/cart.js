//Récupération de l'id dans l'URL
/*const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

//Récupération des arguments de l'en-tête et initialisation des variables
let itemCartId = urlParams.get("id");//la fonction qui ira chercher le 1er argument de l'en-tête
let itemCartColor = urlParams.get("color"); //la fonction qui ira chercher le 2ème argument de l'en-tête
let itemCartQuantity = urlParams.get("qty");//la fonction qui ira chercher le 3èmer argument de l'en-tête*/

// Tu récupêres les données de localStorag
let basket = localStorage.getItem("cart");
const myCart = JSON.parse(basket);
const allKanap = [];

console.log('myCart : ' + JSON.stringify(myCart));

//fetch

fetch(`../api/products/`)
  .then(response => response.json())
  .then(async function (data) {
    dataSet = await data;
    filterProduct(dataSet);
    console.log('dataSet : ' + JSON.stringify(dataSet));
  })

  .catch(error => alert("Erreur fetch: " + error));



function filterProduct(dataSet) {

  let filteredTab = [];

  for (let obj of myCart) {

    filteredTab.push(dataSet.filter(kanap => kanap._id == obj.id));

  };

  console.log('filteredTab : ' + JSON.stringify(filteredTab));

  //Show items in cart.html
  function showItemsInCart(items) {
    let article = document.createElement("article");
    article.className = "cart__item";
    article.setAttribute = ("data-id", items.id);
    article.setAttribute = ("data-color", items.color);
    cartContent.appendChild(article);

    //Show img items in cart.html
    let imgCart = document.createElement("cartItemImg");  //n'affiche pas l'image
    imgCart.className = "cart__item__img";
    article.appendChild(imgCart);

  };

  //intégration des données du produit

  //penser à calculer les quantités totales + prix total

  //btn delete addEventListener
  //fonction pour addEventListener
  //calculer les + ou les - plutôt un delete du bloc qu'un refresh


  // Get items in cart from localstorage

  /*let itemInLocalStorage = localStorage.getItem("cart");*/
  localStorage.getItem(itemInLocalStorage);
  let cart = JSON.parse(itemInLocalStorage);
  let quantityInLocalStorage = localStorage.setItem("cart", cart);
  console.log(cart)                       //console.log => null
  //fetch(`http://localhost:3000/api/products/${productId}`)  CECI EST UN FETCH A PARTIR DE L'API cf. L.25
  for (let i = 0; i < quantityInLocalStorage.length; i++)

    // Vérification qu'il ne soit pas vide
    if (!itemInLocalStorage) {
      console.log("Oups c'est vide");
    }

  //Fetch "cart__items"
  let cartContent = document.getElementById("cart__items");
  console.log(cart__items)

//Show items in cart.html
