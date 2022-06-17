/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/shipping.js ***!
  \*************************/

/*****************GrapgQl*******************/
// https://www.youtube.com/watch?v=BkecWwcLYuk&ab_channel=Contentful
// https://codesandbox.io/s/6j2z03p76k?file=/src/index.js:101-407

// ⬇⬇⬇⬇ test graphql Online ⬇⬇⬇⬇
// // https://graphql.contentful.com/content/v1/spaces/qsose1xd63wa/explore?access_token=SVgVyebXkcCkniau_rnQw1cGDD8ifmrV1CSqc6d53Wo
// 🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧

const accessToken = "SVgVyebXkcCkniau_rnQw1cGDD8ifmrV1CSqc6d53Wo";
const spaceId = "qsose1xd63wa";
const productContainer = document.querySelector(".product-container")
const days = document.querySelectorAll('.schedule .cont .regions')


const query = `
{
    shippingPageCollection{
      items{
        saturday
        sunday
        monday
        tuesday
        wednesday
        thursday
        friday
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
      query,
    }),
  }
)
  .then((res) => res.json())
  .then(
      (response) => {
        const [{saturday,sunday,monday,tuesday,wednesday,thursday,friday}] = response.data.shippingPageCollection.items
        console.log('schedule: ',saturday );
        const daysContent = [saturday,sunday,monday,tuesday,wednesday,thursday,friday]

        daysContent.forEach((day,i) =>{
            let regions = daysContent[i].replace(/_/g," ").split(",")
            const fragment = document.createDocumentFragment();
            regions.forEach(dayReg =>{
                var span = document.createElement('span');
                span.innerText = dayReg
                fragment.appendChild(span)
            })
            days[i].appendChild(fragment)
        })

    
  }
  )
  .catch((error) => {
    console.log("error: ", error);
  });
/******/ })()
;
//# sourceMappingURL=shipping.bundel.js.map