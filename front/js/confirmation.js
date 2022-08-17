const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("id")


let confZon = document.querySelector("#orderId");
confZon.textContent = orderId;

// kill localstorage "cart"
if (orderId) {
	localStorage.removeItem("cart");
};
