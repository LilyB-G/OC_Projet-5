// Tu récupères les données de localStorag
let basket = localStorage.getItem("cart");
const myCart = JSON.parse(basket);

//Appel fetch sur api/product à la condition que localstorage cart existe
if (localStorage.getItem("cart")) {

  fetch(`http://localhost:3001/api/products/`)
    .then(response => response.json())
    .then(async function (data) {
      let dataSet = await data;

      //      console.log('dataSet : ' + JSON.stringify(dataSet));

      let htmlData = onLoad(dataSet, myCart);  // appel Dom

      for (let obj of htmlData) {
        //console.log("data" + htmlData.indexOf(obj) + " :" + JSON.stringify(obj)); 
        iniHtml(obj);   // construction html pour chaque ligne formatté selon le dom
        let objDoc = window.document;
        iniForm(objDoc);
      }
      postForm(window.document, htmlData);
    });
  //}
};
// .catch(error => console.log("Erreur fetch: " + error));

function formatTab(dataSet, myCart) {
  let cartLine = [];
  let line = [];
  let i = 0;

  for (let obj of myCart) {

    line = dataSet.filter(o => o._id == obj.id); // on filtre les objets api/products pour ne garder que l'objet de l'api/product correspondant à la ligne en cours
    cartLine[i] = obj;

    Object.assign(cartLine[i], { "altTxt": line[0].altTxt }, { "description": line[0].description }, { "imageUrl": line[0].imageUrl }, { "name": line[0].name }, { "price": line[0].price });
    
    //console.log('line' + i + ' : ' + JSON.stringify(line));
    i++;
  };
  // console.log('lines: ' + JSON.stringify(lines));
  return cartLine;

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
  Object.assign(changeQty, { "color": data.color, "id": data.id });
  changeQty.value = data.quantity;
  imgCart.appendChild(changeQty);
  //console.log ("changeQty :" + typeof(changeQty.value + "data[0].quantity:" + typeof(data[0].quantity)));
  changeQty.addEventListener('input', (e) => {
    newQty = e.target.value;

    let ret = QtyEventHandler(changeQty, newQty, data); // changeQty de type event ; newQty = value , data = tableau formatté issu du panier
    if (ret == "refresh") {
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
    let ret = supprlign(data.color, data.id);
    if (ret == "refresh") {
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



function update(quantityValue, colorValue, productId) {
  let myCart = {};
  let readyForUpdate = "false"

  if (localStorage.getItem("cart")) {
    myCart = JSON.parse(localStorage.getItem("cart"));
    //console.log("cart: " + JSON.stringify(myCart));
  };
  
  for (let product of myCart) { //permet de créer une boucle array qui parcourt un objet itérable

    //objet existe 
    if (product.id === productId && product.color === colorValue) { //condition la ligne existe
      if (product.quantity != quantityValue && quantityValue <= 100 ) {

        product.quantity = quantityValue;

        readyForUpdate = "true";
      
      };
    };
   
  };

  if (readyForUpdate) {

    localStorage.setItem("cart", JSON.stringify(myCart));
    //alert("quantité modifiée");
    return "refresh";
  };
};

function supprlign(color, id) {

  let newCart = [];
  let myCart = JSON.parse(localStorage.getItem("cart"));
  newCart = myCart.filter(o => !(o.id == id && o.color == color));

  localStorage.setItem("cart", JSON.stringify(newCart));
  return "refresh";
};
//Ecoute au changement du champ de quantité (ni décimaux, ni lettres)
function QtyEventHandler(input, newQty, lineOfMyCart) {

  let regex = new RegExp("^[1-9][0-9]*$");

  if (regex.test(input.value)) {
    input.style.backgroundColor = '';
    if (newQty != lineOfMyCart.quantity) {

      update(newQty, input.color, input.id);
      return "refresh";
    }
  }
  else {
    input.style.backgroundColor = 'red';
  }
};
/*************/
//Informations de l'utilisateur
//Envoi du formulaire dans le serveur
function iniForm(objdoc) {

  let validFstName = objdoc.getElementById("firstName");
  //console.log ("validFstname: " + JSON.stringify (validFstName));
  let regexFstName = "^[A-zÀ-ú \-]+$";
  validFstName.addEventListener("change", (event) => { ctrlRegex(validFstName, regexFstName) });

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

function ctrlRegex(obj, regex) {
  let regExp = new RegExp(regex);
  if (regExp.test(obj.value)) {
    obj.style.backgroundColor = '';
  } else {
    //alert( obj.id + " n'est pas correctement formaté" );
    obj.style.backgroundColor = 'red';
  };
};

function postForm(objdoc, htmlData) {
  let order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    event.preventDefault();
    //Mettre les valeurs du formulaire et les Kanap sélectionnés dans un tableau(objet)
    let contact = {
      firstName: objdoc.getElementById("firstName").value,
      lastName: objdoc.getElementById("lastName").value,
      address: objdoc.getElementById("address").value,
      city: objdoc.getElementById("city").value,
      email: objdoc.getElementById("email").value
    };
    //console.log("htmlData: " + JSON.stringify(htmlData));
    //console.log("contact: " + JSON.stringify(contact));
    let idProd = [];

    for (let obj of htmlData) {
      idProd.push(obj.id);
    };

    let orderToPost = {
      contact: contact,
      products: idProd,
    };
    
    let url = "http://localhost:3001/api/products/order";
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderToPost),
    })
      .then((response) => response.json())
      .then(async (order) => {			// async au moment de définir orderId
        let orderId = await order.orderId;
        // console.log(orderId);

        window.location.assign("confirmation.html?id=" + orderId /*+ "content-type: application/javascript;charset=utf-8"*/);

        /* ici suppression "cart"
        if (orderId) {
          console.log("cart erased");
        };*/

      });
  });

};


