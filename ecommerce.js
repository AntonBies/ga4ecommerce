let cartItems = [];

const promotions = [{
  promotion_id: 'summer2021',
  promotion_name: 'summer_promo_21',
  creative_name: 'reading_by_the_pool',
  creative_slot: '1',
  location_id: 'hero_banner'
}, {
  promotion_id: 'summer2021',
  promotion_name: 'summer_promo_21',
  creative_name: 'reading_on_a_mountain',
  creative_slot: '2',
  location_id: 'promo_block_bottom'
}];

const getProducts = (e) => {
  const baseProducts = [{
    item_name: 'naked statistics - charles wheelan',
    item_id: 'wheelan-nakedstatistics',
    price: 15,
    item_brand: 'ww norton',
    item_category: 'books',
    item_category2: 'non-fiction',
    item_category3: 'science',
    item_category4: 'statistics',
    item_variant: 'ebook',
    quantity: 1
  }, {
    item_name: 'the signal and the noise - nate silver',
    item_id: 'silver-thesignalandthenoise',
    price: 20,
    item_brand: 'penguin',
    item_category: 'books',
    item_category2: 'non-fiction',
    item_category3: 'science',
    item_category4: 'statistics',
    item_variant: 'ebook',
    quantity: 1
  }];

  if (e.target.dataset.event === 'ecommerce_view_item_list' ||
      e.target.dataset.event === 'ecommerce_select_item' ||
      e.target.dataset.event === 'ecommcerce_view_item') {
    baseProducts[0].item_list_name = 'Popular products';
    baseProducts[0].item_list_id = 'popularproducts';
    baseProducts[0].index = '1';
    baseProducts[1].item_list_name = 'Popular products';
    baseProducts[1].item_list_id = 'popularproducts';
    baseProducts[1].index = '2';
  }

  return baseProducts;
}

const buildEcommerceObject = (e) => {
  const table = [
    ['ecommerce_view_promotion', {items: promotions}],
    ['ecommerce_select_promotion', {items: [promotions[1]]}],
    ['ecommerce_view_item_list', {items: getProducts(e)}],
    ['ecommerce_select_item', {items: [getProducts(e)[0]]}],
    ['ecommerce_view_item', {items: [getProducts(e)[0]]}],
    ['ecommerce_add_to_cart', {items: [getProducts(e)[0]]}],
    ['ecommerce_add_to_wishlist', {items: [getProducts(e)[1]]}],
    ['ecommerce_view_cart', {items: cartItems}],
    ['ecommerce_remove_from_cart', {items: [getProducts(e)[0]]}],
    ['ecommerce_begin_checkout', {items: cartItems}],
    ['ecommerce_add_shipping_info', {items: cartItems, shipping_tier: 'download'}],
    ['ecommerce_add_payment_info', {items: cartItems, payment_type: 'ideal'}],
    ['ecommerce_purchase', {
      items: cartItems, 
      currency: 'EUR', 
      value: cartItems[0] ? cartItems[0].price * cartItems[0].quantity : 0, 
      tax: cartItems[0] ? cartItems[0].price * cartItems[0].quantity * 0.21 : 0,
      shipping: 0,
      transaction_id: new Date().getTime()
    }]
  ];

  for (var i = 0, len = table.length; i < len; i += 1) {
    if (table[i][0] === e.target.dataset.event) {
      return table[i][1];
    }
  }
}

const buttons = document.getElementsByTagName('button');
for (let item of buttons) {
  item.addEventListener('click', function(e) {
    let ecommerceObj = buildEcommerceObject(e);
    if (e.target.dataset.event && ecommerceObj && ecommerceObj.items && ecommerceObj.items.length) {
      window.dataLayer.push({ecommerce: null});
      window.dataLayer.push({
        event: e.target.dataset.event,
        ecommerce: ecommerceObj
      });
      if (e.target.dataset.event === 'ecommerce_add_to_cart') {
        if (!cartItems[0]) {
          cartItems.push(getProducts(e)[0]);
        } else {
          cartItems[0].quantity += 1;
        }
      }
      if (e.target.dataset.event === 'ecommerce_remove_from_cart' && cartItems[0]) {
        if (cartItems[0].quantity > 1) {
          cartItems[0].quantity -= 1;
        } else {
          cartItems = [];
        }
      }
      if (e.target.dataset.event === 'ecommerce_purchase') {
        cartItems = [];
      }
    }
  });
}