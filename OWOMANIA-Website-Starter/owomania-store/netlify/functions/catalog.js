// Server-authoritative catalogue. Keep this in sync with PRODUCTS in app.js.
exports.catalog = {
  ow001: {name:'The Ivory Bloom Kurti', price:899, sizes:['S','M','L','XL','XXL']},
  ow002: {name:'Rosewood Elegance Set', price:1699, sizes:['S','M','L','XL']},
  ow003: {name:'The Everyday Muse', price:749, sizes:['S','M','L','XL','XXL']},
  ow004: {name:'Sandstone Co-ord', price:1399, sizes:['S','M','L','XL']}
};
exports.validateItems = (items) => {
  if (!Array.isArray(items) || !items.length || items.length > 30) throw new Error('Invalid cart.');
  return items.map(item => {
    const p = exports.catalog[item.product_id];
    const qty = Number(item.quantity);
    if (!p || !Number.isInteger(qty) || qty < 1 || qty > 10 || !p.sizes.includes(item.size)) throw new Error('A product, size or quantity in your cart is invalid.');
    return {product_id:item.product_id, name:p.name, size:item.size, quantity:qty, unit_price:p.price};
  });
};
