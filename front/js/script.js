// Import reusables fonctions

import ('./reus_fonction.js')
.then(function(module){
    // Set script attributes
    module.link_attributes();

    //Step1: Insert pages in browser
    //module.insert_pages();

    // insert attributes 
    //module.module_attributes();
})


// Display products
 function items_products(products){
      const items = document.getElementById('items');
      let i=0; 
      for(product of products)
      {
          items.innerHTML +="<a href='./product.html?id=" + product._id +"'><article><img src='"+ product.imageUrl +"' alt="+JSON.stringify(product.altTxt)+ "/><h3 class='productName'>"+product.name+"</h3><p class='productDescription'>"+product.description+"</p></article></a>"; 
          i++;
      } 
}

//Looking for the API and get the products
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(products) {
    items_products(products);
  })

  
  
  

  

  
  



                                    