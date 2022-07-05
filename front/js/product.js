/// Get Id of Url
 function getIdUrl(){
    let geturl =  window.location;
    let Url = new URL(geturl);
    let Id = Url.searchParams.get('id');
    return Id;
}

// Get Image of Product
function image_product(product){
    let item__img = document.getElementsByClassName('item__img');
    let img = document.createElement('img');
    img.setAttribute("src" , product.imageUrl);
    img.setAttribute("alt" , product.altTxt);
    item__img[0].appendChild(img);
}

// Get name of product
function name_product(product){
    document.getElementById('title').textContent = product.name;
}

//Get price of product
function price_product(product){
    document.getElementById('price').textContent = product.price;
}

//Get description of product
function description_product(product){
    document.getElementById('description').textContent = product.description;
}

// Get color of product
function colors_product(product){
    let colors = document.getElementById('colors');
    let color = product.colors;
    for(i=0 ; i < color.length ; i++){
      let option = document.createElement('option');
      option.setAttribute('value' , color[i]);
      option.textContent = color[i];
      colors.appendChild(option);
    }
}

/// Add to Cart
function add_to_cart(storage){

  let Id_product = getIdUrl();
  let color = document.getElementById('colors').value;
  let quantity = document.getElementById("quantity").value;
  
  let name = document.getElementById("title").textContent;
  let description = document.getElementById("description").textContent;
  let price = document.getElementById("price").textContent;
  let item__img = document.getElementsByClassName("item__img");
  let child_item = item__img[0].firstElementChild;
  let img = child_item.getAttribute("src");
  let altTxt = child_item.getAttribute("alt");

  if(color !='' && (quantity >= 1 && quantity <= 100)){
    storage.push({id: Id_product , name:name , color:color , description:description , price:Number(price) , quantity: Number(quantity) , img:img , altTxt:altTxt});
    getStorages = localStorage.getItem("storage");

    if(getStorages === null){
        localStorage.setItem("storage" , JSON.stringify(storage));
        window.location.href = "cart.html";
    }else{
        getStorages = JSON.parse(getStorages);
        let i = 0;
        for(getStorage of getStorages){
            if(getStorage.id === Id_product && getStorage.color === color){ 
              i++;
              getStorage.quantity += Number(quantity);
              localStorage.setItem("storage" , JSON.stringify(getStorages));
              window.location.href = "cart.html";
              break;
            } 
        }
        if(i === 0){
            getStorages.push({id: Id_product , name:name , color:color , description:description , price:Number(price) , quantity: Number(quantity) , img:img , altTxt:altTxt});
            localStorage.setItem("storage" , JSON.stringify(getStorages));
            window.location.href = "cart.html";
        }
    }

  }
    
}

/// Get one product by Recovering Id_product
const recup_id = getIdUrl();
fetch("http://localhost:3000/api/products/" + recup_id)
    .then(function(res){
      if(res.ok){ 
        return res.json(); 
      }
    })
    .then(function(product){
      image_product(product); 
      name_product(product);
      price_product(product);
      description_product(product);
      colors_product(product);
    })
  
    // Add to Cart
    let addToCart = document.getElementById("addToCart");
    addToCart.addEventListener('click' , function(){ 
      let storage = Array();
      add_to_cart(storage);
    });
    
