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

const products = [{
  item_name: '',
  item_id: '',
  price: 0,
  item_brand: '',
  item_category: '',
  item_category2: '',
  item_category3: '',
  item_category4: '',
  item_variant: '',
  promotion_id: '',
  promotion_name: '',
  creative_name: '',
  creative_slot: '',
  location_id: '',
  index: 0,
  quantity: 0
}];

const buildEcommerceObject = (e) => {
  const table = [
    ['view_promotion', {items: promotions}],
    ['select_promotion', {items: [promotions[1]]}],
    ['view_item_list', {items: products}]
  ]
  for (var i = 0, len = table.length; i < len; i += 1) {
    if (table[i][0] === e.target.dataset.event) {
      return table[i][1];
    }
  }
}

const buttons = document.getElementsByTagName('button');
for (let item of buttons) {
  item.addEventListener('click', function(e) {
    if (e.target.dataset.event) {
      window.dataLayer.push({ecommerce: null});
      console.log({
        event: e.target.dataset.event,
        ecommerce: buildEcommerceObject(e)
      });
    }
  });
}