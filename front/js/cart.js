// Import reusables fonctions

import ('./reus_fonction.js')
.then(function(module){
  // Set script attributes
  module.link_attributes();

  //Step1: Insert pages in browser
  //module.insert_pages();
})

function centimes_euro(){
  const euro = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2
  });
  return euro;
}

// Reports of product
function product_reports(){

  const euro =centimes_euro();
  let cart__items = document.getElementById('cart__items');
  products = localStorage.getItem("storage");
  products = JSON.parse(products);
  let total_price = 0;
  let total_quantity = 0;
  if(products !=null && products.length > 0){
    for(product of products){
      total_price += product.quantity * product.price;
      total_quantity += product.quantity;
      cart__items.innerHTML += '<article class="cart__item" data-id="'+product.id+'" data-color="'+ product.color +'"><div class="cart__item__img"><img src="'+product.img+'" alt="Photographie dun canapé"></div><div class="cart__item__content"> <div class="cart__item__content__description"><h2>'+product.name+'</h2><p>'+product.color+'</p><p>' + euro.format(product.price * product.quantity ) +'€</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p> <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+product.quantity+'"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>';
    }
    document.getElementById("totalQuantity").textContent = total_quantity;
    document.getElementById("totalPrice").textContent = euro.format(total_price);
  }else{
    
    let FormContainer = document.getElementById("cartAndFormContainer");
    FormContainer.firstElementChild.textContent = "Pas d'articles pour le panier";
    let cart = document.getElementsByClassName("cart");
    cart[0].innerHTML = ""; 
  }  
}

/// Delete product
function delete_product(){

  let supprimer = document.getElementsByClassName("deleteItem");
  Array.from(supprimer).forEach(supprim => {
    
      supprim.addEventListener("click" , function(){
        let article = this.closest("article");
        products = localStorage.getItem("storage");
        products = JSON.parse(products);
        let i=0;
        let total_price = 0;
        let total_quantity = 0;
        for(product of products){
            if(product.id === article.dataset.id && product.color === article.dataset.color){
                products.splice(i , 1);
                break;
            }
            i++;    
        }
        for(product of products){
          total_price += product.quantity * product.price;
          total_quantity += product.quantity;
        }
        const euro =centimes_euro();
        localStorage.setItem("storage" , JSON.stringify(products));
        let cart__items = article.parentElement;
        cart__items.removeChild(article);
        document.getElementById("totalQuantity").textContent = total_quantity;
        document.getElementById("totalPrice").textContent = euro.format(total_price);

        products =JSON.parse(localStorage.getItem("storage"));
        if(products.length == 0) {
            let FormContainer = document.getElementById("cartAndFormContainer");
            FormContainer.firstElementChild.textContent = "Plus d'articles pour le panier";
            let cart = document.getElementsByClassName("cart");
            cart[0].innerHTML = ""; 
        }
      })
  });

}

/// Update quantity of product
function update_quantity_product(){

  let update_quantities = document.getElementsByClassName("itemQuantity");
  Array.from(update_quantities).forEach(update_quantity =>{
      update_quantity.addEventListener("change" , function(){
        let article = this.closest("article");
        let content = this.closest("div.cart__item__content");
        let description = content.firstElementChild;
        let description_price = description.lastElementChild;
        products = localStorage.getItem('storage');
        products = JSON.parse(products)
        let total_quantity = 0;
        let total_price = 0;
        const euro =centimes_euro();
        for( product of products){
          
          if(product.id === article.dataset.id && product.color === article.dataset.color){
              product.quantity = (Number(this.value));
              total_quantity += product.quantity;
              total_price += product.price * product.quantity;
              description_price.innerHTML = euro.format(product.price * product.quantity) + "€";
          }else{
              total_quantity += product.quantity;
              total_price += product.price * product.quantity;
          }
        }
        document.getElementById("totalQuantity").textContent = total_quantity;
        document.getElementById("totalPrice").textContent = euro.format(total_price);
        localStorage.setItem("storage" , JSON.stringify(products));
      })
  })
}

/// To validate Data order
function validate_data_order(){

      let order = {contact:"" , products:""};
      let contact = {firstName:"" , lastName:"" , address:"" , city:"" , email:""};
      let regex1 = /^[a-zA-Z]+$/;
      let regex2 = /^[a-zA-Z0-9&-_\/№]+$/g;
      let regex3 = /^\S+@\S+\.\S+$/;
      let firstName = document.getElementById("firstName");
      let lastName = document.getElementById("lastName");
      let address = document.getElementById("address");
      let city = document.getElementById("city");
      let email = document.getElementById("email");
   
      if(regex1.test(firstName.value))
      {
        contact.firstName =firstName.value;
        firstName.nextElementSibling.textContent ='';
      }
      else
      {
        if(firstName.value!=""){
          firstName.nextElementSibling.style.color = "red";
          firstName.nextElementSibling.textContent ="Le champ"+" "+ firstName.getAttribute("name")+ " "+ " doit contenir uniquement des lettres";
        }
        if(firstName.value == ""){
          firstName.nextElementSibling.style.color = "red";
          firstName.nextElementSibling.textContent ="Le champ"+" "+ firstName.getAttribute("name")+ " "+ "est vide";
        }
      }

      if(regex1.test(lastName.value))
      {
        contact.lastName =lastName.value;
        lastName.nextElementSibling.textContent ='';
      }
      else
      {
        if(lastName.value!=""){
          lastName.nextElementSibling.style.color = "red";
          lastName.nextElementSibling.textContent ="Le champ"+" "+lastName.getAttribute("name")+ " " +" doit contenir uniquement des lettres";
        }
        if(lastName.value == ""){
          lastName.nextElementSibling.style.color = "red";
          lastName.nextElementSibling.textContent ="Le champ"+" "+ lastName.getAttribute("name")+ " "+ "est vide";
        }
      }

      if(regex2.test(address.value)){
        contact.address = address.value;
        address.nextElementSibling.textContent ="";
      }else{

        if(address.value !=""){
          address.nextElementSibling.style.color = "red";
          address.nextElementSibling.textContent ="Certains caracteres speciaux sont interdites dans le champ" + " "+ address.getAttribute("name");
        } 
        if(address.value == ""){
          address.nextElementSibling.style.color = "red";
          address.nextElementSibling.textContent ="Le champ"+" "+ address.getAttribute("name")+ " "+ "est vide";
        }
      }

      if(regex1.test(city.value)){
        contact.city = city.value;
        city.nextElementSibling.textContent ="";
      }else{
        if(city.value !=""){
          city.nextElementSibling.style.color = "red";
          city.nextElementSibling.textContent ="Le champ" + " " +city.getAttribute("name") +" doit contenir uniquement des lettres";
        }
        if(city.value == ""){
          city.nextElementSibling.style.color = "red";
          city.nextElementSibling.textContent ="Le champ"+" "+ city.getAttribute("name")+ " "+ "est vide";
        }
      }

      if(regex3.test(email.value)){
        contact.email = email.value;
        email.nextElementSibling.textContent = "";
      }else{
        if(email.value !=""){
          email.nextElementSibling.style.color = "red";
          email.nextElementSibling.textContent ="Le champ n'est pas de type " + " " + email.getAttribute("name");
        } 
        if(email.value == ""){
          email.nextElementSibling.style.color = "red";
          email.nextElementSibling.textContent ="Le champ"+" "+ email.getAttribute("name")+ " "+ "est vide";
        }
      }
      let product_ids = [];
      let ifempty = Object.values(contact).indexOf("" , 0);
      if(ifempty === -1)
      {
        order.contact = contact;
        products =JSON.parse(localStorage.getItem('storage'));
        let i =0;
        for(product of products)
        {
          product_ids[i] = product.id;
          i++;
        }
        order.products = product_ids;
        return order;
      }else{
        return null;
      } 
}

/// To Post Data order
async function post_data(e){
  let data = await validate_data_order();
  if(data === null){
    e.preventDefault();
  }else{
    e.preventDefault();
    fetch("http://localhost:3000/api/products/order" , {
        method:"POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
          body: JSON.stringify(data)
    })
    .then(function(res){
        if(res.ok){
          return res.json();
        }
    })
    .then(function(order){
        localStorage.clear();
        const order_id = order.orderId;
        window.location.href = "confirmation.html?order=" + order_id;   
    })
  }
}

/// To display the Id of order
function getIdOrder(){
    let geturl =  window.location;
    let Url = new URL(geturl);
    let order_Id = Url.searchParams.get('order');
   return order_Id;
}


/// To get the number of order
async function OrderNumber(){
  let IdOrder = await getIdOrder();
  if(window.location.href == "http://127.0.0.1:5501/front/html/confirmation.html?order=" + IdOrder){
    let order_id = document.getElementById("orderId");
    order_id.textContent = IdOrder;
  }
}


if(window.location.href == "http://127.0.0.1:5501/front/html/cart.html"){
    product_reports();
    delete_product();
    update_quantity_product();

    products = JSON.parse(localStorage.getItem("storage"));
    if(products !=null && products.length > 0){
      let order = document.getElementById("order");
      order.addEventListener("click" , function(e){
          post_data(e);
      });
    }
}  
OrderNumber();


