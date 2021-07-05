const promotion = {};
const product = {};

const buttons = document.getElementsByTagName('button');
for (let item of buttons) {
  item.addEventListener('click', function(e) {
    window.dataLayer.push({ecommerce: null});
  })
}