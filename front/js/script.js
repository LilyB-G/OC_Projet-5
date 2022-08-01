//interface pour récupérer les infos sur l'API
fetch("http://localhost:3000/api/products/")
.then(response => response.json())
.then(async function (data) {
    allKanaps = await data;
    showKanaps(allKanaps);
})
.catch(error => alert("Zut ! Le serveur ne répond pas" + error));


// Boucle pour afficher les produits
function showKanaps(productsCards) {
    for (let i = 0; i < productsCards.length; i++){
        const product = productsCards[i];
        let allCards = document.querySelector('#items');

        // insert le lien de chaque Kanap
        let anchor = document.createElement('a');
        anchor.setAttribute('href', "./product.html?id=" + product._id);
        allCards.appendChild(anchor);

        // insert les articles
        let article = document.createElement('article');
        anchor.appendChild(article);

        // insert les images
        let image = document.createElement('img');
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('altTxt', product.altTxt);
        article.appendChild(image);
    
        // insert les noms
        let h3 = document.createElement('h3');
        h3.className = 'productName';
        h3.textContent = product.name;
        article.appendChild(h3);

        // insert les descriptions
        let paragraph = document.createElement('paragraph');
        paragraph.className = 'productDescription';
        paragraph.textContent = product.description;
        article.appendChild(paragraph);
    }
}
//FIN D'INSERTION DES PRODUITS DANS LA PAGE D'ACCUEIL