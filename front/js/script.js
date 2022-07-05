// Display products
 function items_products(products){
      const items = document.getElementById('items');
      for(product of products){

        let link_product = document.createElement('a');
        link_product.setAttribute('href' , './product.html?id=' + product._id);
        let article = document.createElement('article');
        let img = document.createElement('img');
        img.setAttribute('src' , product.imageUrl);
        img.setAttribute('alt' , product.altTxt);
        let h3 = document.createElement('h3');
        h3.classList.add('productName');
        h3.textContent = product.name;
        let p = document.createElement('p');
        p.classList.add('productDescription');
        p.textContent = product.description;
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
        link_product.appendChild(article);
        items.appendChild(link_product);
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

  
  
  

  

  
  



                                    