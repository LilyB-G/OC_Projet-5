// Tu récupêres les données de localStorag
let basket = localStorage.getItem("cart");
const myCart = JSON.parse(basket);
const url = "";
let htmlData = [];
let dataSet = [];

console.log('myCart : ' + JSON.stringify(myCart));

//fetch
if (localStorage.getItem("cart")) {
  //for (let i = 0; i < myCart.length; i++){
  //fetch(`http://192.168.0.50:3001/api/products/` )
  fetch(`http://localhost:3000/api/products/`)
    .then(response => response.json())
    .then(async function (data) {
      dataSet = await data;
      //format(dataSet);
      //      console.log('dataSet : ' + JSON.stringify(dataSet));

      htmlData = onLoad(dataSet, myCart);

      for (let obj of htmlData) {
        //console.log("data" + htmlData.indexOf(obj) + " :" + JSON.stringify(obj)); 
        iniHtml(obj);
        let objDoc = window.document;
        iniForm(objDoc);

      }
    });
  //}
};
// .catch(error => console.log("Erreur fetch: " + error));

function formatTab(dataSet, myCart) {
  let lines = [];
  let line = [];
  let i = 0;

  for (let obj of myCart) {

    line = dataSet.filter(o => o._id == obj.id);
    lines[i] = obj;

    Object.assign(lines[i], { "altTxt": line[0].altTxt }, { "description": line[0].description }, { "imageUrl": line[0].imageUrl }, { "name": line[0].name }, { "price": line[0].price });
    delete line[0].colors;

    //console.log('line' + i + ' : ' + JSON.stringify(line));

    i++;
  };
  console.log('lines: ' + JSON.stringify(lines));

  return lines;

};


function iniHtml(data) {     // DOM

  let cartContent = document.querySelector("#cart__items");

  //Création de l'article

  let article = document.createElement("article");
  article.className = "cart__item";
  article.setAttribute = ("data-id", data.id);
  article.setAttribute = ("data-color", data.color/*colorLS*/);
  cartContent.appendChild(article);

  //console.log(cartContent)

  //intégration des données du produit
  //Show img items in cart.html

  let tableau = document.createElement("table");
  tableau.setAttribute("width", "100%");
  article.appendChild(tableau);

  let lignArticl = document.createElement("tr");
  tableau.appendChild(lignArticl);

  let colImg = document.createElement("td");
  colImg.setAttribute("width", "15%");
  lignArticl.appendChild(colImg);

  let colDesc = document.createElement("td");
  colDesc.setAttribute("width", "85%");
  lignArticl.appendChild(colDesc);

  let imgCart = document.createElement("cartItemImg");
  imgCart.className = "cart__item__img";
  colImg.appendChild(imgCart);


  let image = document.createElement("img");
  //image.setAttribute("src", data[0].imageUrl);

  fetch(data.imageUrl) //Ouvre le lien vers l'API pour aller chercher images
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.blob();
    })
    .then((myBlob) => {
      image.src = URL.createObjectURL(myBlob);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  image.setAttribute("alt", "Photographie d'un canapé");
  imgCart.appendChild(image);

  //Show descriptions in cart.html
  let descriptionCart = document.createElement("cartItemDescription");
  descriptionCart.style.width = "100%";
  descriptionCart.className = "cart__item__content";
  colDesc.appendChild(descriptionCart);

  let description = document.createElement("description");
  description.className = "cart__item__content__description";
  description.textContent = data.description;
  descriptionCart.appendChild(description);

  let table = document.createElement("table");
  descriptionCart.appendChild(table);

  let lig = document.createElement("tr");
  table.appendChild(lig);

  let col1 = document.createElement("td");
  lig.appendChild(col1);
  //Show name in cart.html
  let name = document.createElement("h2");
  name.textContent = data.name;
  col1.appendChild(name);

  let col2 = document.createElement("td");
  lig.appendChild(col2);

  //Show color in cart.html
  let color = document.createElement("p");
  color.textContent = "couleur : " + data.color/*colorLS*/;
  col2.appendChild(color);

  let col3 = document.createElement("td");
  lig.appendChild(col3);

  //Show quantity in cart.html
  let quantity = document.createElement("p");
  quantity.textContent = "quantité : " + data.quantity /*quantityLS*/;
  col3.appendChild(quantity);

  let col4 = document.createElement("td");
  lig.appendChild(col4);

  //Show price in cart.html
  let price = document.createElement("p");
  price.textContent = "prix : " + data.price + "€ l'unité";
  col4.appendChild(price);

  let col5 = document.createElement("td");
  lig.appendChild(col5);

  //Total lign
  let totalLign = document.createElement("div");
  totalLign.textContent = "Total ligne : " + data.price * data.quantity + "€  ht";
  col5.appendChild(totalLign);

  //Change quantity
  let changeQty = document.createElement("input");
  changeQty.className = "itemQuantity";
  changeQty.setAttribute("type", "number");
  changeQty.setAttribute("class", "itemQuantity");
  changeQty.setAttribute("name", "itemQuantity");
  changeQty.setAttribute("Align", "right");
  changeQty.setAttribute("width", "8px");
  changeQty.setAttribute("min", "1");
  changeQty.setAttribute("max", "100");
  Object.assign(changeQty , {"color": data.color, "id": data.id });
  changeQty.value = data.quantity;
  imgCart.appendChild(changeQty);

  
  //console.log ("changeQty :" + typeof(changeQty.value + "data[0].quantity:" + typeof(data[0].quantity)));

  changeQty.addEventListener('input', (e) => {
    newQty = e.target.value;

    let ret = QtyEventHandler(window.document, changeQty , newQty , data);
    if ( ret == "refresh" ) {
        location.reload();
    };
  });


  //Settings delete
  deleteDiv = document.createElement("div");
  imgCart.appendChild(deleteDiv);
  deleteDiv.className = "cart__item__content__settings__delete";
  // Add delete P
  deleteP = document.createElement("p");
  deleteDiv.appendChild(deleteP);
  deleteP.className = "deleteItem";
  deleteP.textContent = "Supprimer"
  deleteP.setAttribute('data-id', cartContent);
  deleteP.setAttribute("Align", "right");
  
  deleteP.addEventListener('click', (e) => {
    let ret = supprlign( data.color ,data.id );
    if ( ret == "refresh" ) {
      location.reload();
  };
  });
};
//Calcule le total produit et le total prix au chargement de la page
function onLoad(dataSet, myCart) {
  let Lines = formatTab(dataSet, myCart);
  actuPage(Lines);
  return Lines;
};

//Pour calculer le prix total (prix + produit)
function actuPage(Lines) {

  let totalA = 0;
  let totalP = 0;

  for (let obj of Lines) {

    totalA = totalA + Number(obj.quantity);
    totalP = totalP + (Number(obj.quantity) * Number(obj.price));
  };

  let totalCart = document.querySelector("#totalPrice");
  totalCart.textContent = totalP;

  let totalArt = document.querySelector("#totalQuantity");
  totalArt.textContent = totalA;
};

function updateValueQty(qtyVal) {
  if (!Number.isInteger(qtyVal)) {
    alertError(qtyVal);
    //   return console.log(typeof(qtyVal))};
  }
}
//Gestion des modifications et suppressions de produits
function setIdClient(currentCde) {

  return idClient;
};

function update( quantityValue, colorValue, productId) {
  let myCart = {};
  let readyForUpdate = "false"
  
  if (localStorage.getItem("cart")) {
    myCart = JSON.parse(localStorage.getItem("cart"));
    console.log("cart: " + JSON.stringify(myCart));
  };
  let i = 0;
  for (let product of myCart) { //permet de créer une boucle array qui parcourt un objet itérable

    //objet existe 
    if (product.id === productId && product.color === colorValue) { //condition la ligne existe
      if (product.quantity != quantityValue) {
        
        product.quantity = quantityValue;
        
        readyForUpdate = "true";
     };
    };
    i++;
  };
  
  if (readyForUpdate) {

    localStorage.setItem("cart", JSON.stringify(myCart));
    alert("quantité modifiée");
    return "refresh";
  };
};

function supprlign( color , id ) {

  let newCart = [];
  let myCart = JSON.parse(localStorage.getItem("cart"));
  newCart = myCart.filter(o => !( o.id == id && o.color == color ));
    
  localStorage.setItem("cart", JSON.stringify(newCart));
  return "refresh";
};
//Ecoute au changement du champ de quantité (ni décimaux, ni lettres)
function QtyEventHandler(document , input , newQty , lineOfMyCart ) {
  
  let regex = new RegExp("^[1-9][0-9]*$");
  
  if ( regex.test(input.value)) {
    input.style.backgroundColor = '';   
      if ( newQty != lineOfMyCart.quantity ){
        
        update( newQty , input.color , input.id );
      }
  }
  else
  {
  input.style.backgroundColor = 'red';   
  }
};
/*************/
//Informations de l'utilisateur
//Envoi du formulaire dans le serveur
function iniForm(objdoc){
 
let contact = {
  firstName: objdoc.getElementById("firstName").value,
  lastName: objdoc.getElementById("lastName").value,
  address: objdoc.getElementById("address").value,
  city: objdoc.getElementById("city").value,
  email: objdoc.getElementById("email").value
};

let validFstName = objdoc.getElementById("firstName");
console.log ("validFstname: " + JSON.stringify (validFstName));
let regexFstName = "^[A-zÀ-ú \-]+$" ;
validFstName.addEventListener("change", (event) => { ctrlRegex(validFstName , regexFstName ) });

let validLstName = objdoc.getElementById("lastName");
let regexLstName = "^[A-zÀ-ú \-]+$";
validLstName.addEventListener("change", (event) => { ctrlRegex(validLstName, regexLstName) });

let validAddress = objdoc.getElementById("address");
let regexAddress = "^[A-zÀ-ú0-9 ,.'\-]+$";
validAddress.addEventListener("change", (event) => { ctrlRegex(validAddress, regexAddress) });

let validCity = objdoc.getElementById("city");
let regexCity = "^[A-zÀ-ú0-9 ,.'\-]+$";
validCity.addEventListener("change", (event) => { ctrlRegex(validCity, regexCity) });

let validEmail = objdoc.getElementById("email");
let regexEmail = "^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$";
validEmail.addEventListener("change", (event) => { ctrlRegex(validEmail, regexEmail) });
};

function ctrlRegex(obj, regex ) {
      let regExp = new RegExp(regex); 
  if (regExp.test(obj.value)) {
    obj.style.backgroundColor = '';
  } else {
    //alert( obj.id + " n'est pas corectement formaté" );
    obj.style.backgroundColor = 'red';
  };
};

function postForm() {
  let order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    event.preventDefault();
    //Mettre les valeurs du formulaire et les Kanap sélectionnés dans un tableau(objet)
    let postForm = {
      myCart,
      contact
    }
    //envoyer le formulaire + le LS (myCart) au serveur
    let postOrder = {
      method: "POST",
      body: JSON.stringify(postForm),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    //fetch à partir de l'API avec les données postOrder
    fetch("http://localhost:3000/api/products/order", postOrder)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('orderId', data.orderId);
        if (validControl()) {
          document.location.href = "confirmation.html?id=" + data.orderId;
        }
      })
  })
};

