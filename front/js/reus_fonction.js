
/*// -------- Step1: Insert pages in browser
export  function insert_pages (){
    const nav = document.getElementsByTagName('nav');
    nav[0].outerHTML = 
    "<nav> <ul><a href='./index.html'><li>Accueil</li></a><a href='./product.html'><li> Produit</li></a><a href='./cart.html'><li> Panier</li></a><a href='./confirmation.html'><li> Confirmation</li></a></ul></nav>";
}*/

// ------Set attributes "" in link
export  function link_attributes(){
    const link =document.createElement("link");
    const head = document.getElementsByTagName("head");
    head[0].appendChild(link);
    link.setAttribute("rel" , "shortcut icon");
    link.setAttribute("href" , "#");
}
 