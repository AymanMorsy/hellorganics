/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/products.js ***!
  \*************************/
/*****************filter Products*******************/

const productsFliter = document.querySelector('.product-filter  nav')
const products = document.querySelectorAll('.product-container .product')
const activeNav = document.querySelectorAll('.product-filter nav li')
const allTab = document.getElementById('all')



function filterProducts(hash){

    document.querySelectorAll('.product-container .product').forEach(product =>{
        // console.log('all⛔', document.querySelectorAll('.product-container .product'));

        if(product.classList.contains(hash) || hash === "all" || hash === ""){
          product.style.display='inline'
          // make button active
          activeNav.forEach(li =>{
              
            if(li.dataset.get === hash){
                li.classList.add('active')
            }else if (hash === ""){
                allTab.classList.add('active')
            }else{
                li.classList.remove('active')

            }
          })
        }else{
          product.style.display='none'
        }
        
      })
}

window.addEventListener('hashchange', function(){
    filterProducts(window.location.hash.slice(1));
});

/*****************filter Products*******************/



/*****************GrapgQl*******************/
// https://www.youtube.com/watch?v=BkecWwcLYuk&ab_channel=Contentful
// https://codesandbox.io/s/6j2z03p76k?file=/src/index.js:101-407

// ⬇⬇⬇⬇ test graphql Online ⬇⬇⬇⬇
// // https://graphql.contentful.com/content/v1/spaces/qsose1xd63wa/explore?access_token=SVgVyebXkcCkniau_rnQw1cGDD8ifmrV1CSqc6d53Wo
// 🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧

const accessToken = "SVgVyebXkcCkniau_rnQw1cGDD8ifmrV1CSqc6d53Wo";
const spaceId = "qsose1xd63wa";
const productContainer = document.querySelector(".product-container")
const cart = document.querySelector(".cart .counter")
function generateProduct(productName,unit,avilability,image,price,benefitsAndValues1,benefitsAndValues2,benefitsAndValues3,benefitsAndValues4,benefitsAndValues5){
    
    return `
    <div class="img-wrapper">
      <p class="${avilability ?"show-in-season-badge":"hide-in-season-badge"}">in season</p><img src="${image.url}">
      <div class="back">
        <h6>Benefits &amp; Values</h6>
        <ul>
          ${benefitsAndValues1?`<li>${benefitsAndValues1}</li>`:''}
          ${benefitsAndValues2?`<li>${benefitsAndValues2}</li>`:''}
          ${benefitsAndValues3?`<li>${benefitsAndValues3}</li>`:''}
          ${benefitsAndValues4?`<li>${benefitsAndValues4}</li>`:''}
          ${benefitsAndValues5?`<li>${benefitsAndValues5}</li>`:''}
        </ul>
      </div>
    </div>
    <div class="product-detials">
      <p class="name">${productName} - ${unit}</p>
      <hr>
      <div class="price-cart-container">
        <p class="price">EGP ${price} </p>
        <button>add
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
          </svg>
        </button>
      </div>
    </div>
`
}

const contentfulGQquery = `
{
  productsCollection{
    items{
      sys{
        id
      }
      productName
      unit
      category
      avilability
      image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      price
      benefitsAndValues1
      benefitsAndValues2
      benefitsAndValues3
      benefitsAndValues4
      benefitsAndValues5
    }
  }
}
`;
fetch(
  `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`,
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query:contentfulGQquery,
    }),
  }
)
  .then((res) => res.json())
  .then((response) => {
    const products = response.data.productsCollection.items
    // console.log('products: ', products);
    // [{extract from array > extract from object}]
    
    const fragment = document.createDocumentFragment();
    products.forEach((prod) =>{
      
        const {sys:{id},productName,unit,category,avilability,image,price,benefitsAndValues1,benefitsAndValues2,benefitsAndValues3,benefitsAndValues4,benefitsAndValues5} = prod
        
        // console.log('avilability: ', avilability);
        var div = document.createElement('div');
        div.id = id
        div.classList.add("product")
        div.classList.add(`${category[0].toLowerCase()}`)
        avilability? div.classList.add("inseason"):null
        
        div.innerHTML = generateProduct(productName,unit,avilability,image,price,benefitsAndValues1,benefitsAndValues2,benefitsAndValues3,benefitsAndValues4,benefitsAndValues5);
        div.onclick = ()=> {
          // adding first product (localstorage is empty) //
          if( !localStorage.cartNum){
            localStorage.cartNum = 1
            
            localStorage.products = JSON.stringify({[id]:{...prod,inCart:1}})
            console.log(1);
            // adding totalPrice
            localStorage.totalCost = price
            
          }else{
            // threr is one product at least  //
            let prodlocal = JSON.parse(localStorage.products)
            if(!prodlocal[id]){
              console.log(2);
              // append new product and update cart
              prodlocal = {...prodlocal,[id]:{...prod,inCart:1}}
              localStorage.products = JSON.stringify(prodlocal)
              localStorage.cartNum = +localStorage.cartNum + 1
              // append total price for appeneded product
              localStorage.totalCost = +localStorage.totalCost + price

                
              }else{
                console.log(3);
                // update cart and incart for existing products
                prodlocal[id].inCart += 1
                localStorage.products = JSON.stringify(prodlocal)
                localStorage.cartNum = +localStorage.cartNum + 1

                localStorage.totalCost = +localStorage.totalCost + price
              }
            }
            console.log('prodlocal: ', JSON.parse(localStorage.products));
          cart.innerText  = +cart.innerText + 1
        }
        fragment.appendChild(div);
    })
    productContainer.appendChild(fragment)
    // generateProduct(productName,unit,category,avilability,image,price)
    
    
  }).then(()=>{
    filterProducts(window.location.hash.slice(1))
  })
  .catch((error) => {
    console.log("error: ", error);
  });


/*****************GrapgQl*******************/


/******/ })()
;
//# sourceMappingURL=products.bundel.js.map