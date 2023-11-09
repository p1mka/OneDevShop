const mapReviews = require("./map-reviews");
const convertDate = require("./convert-date");

module.exports = function (product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    img: product.img_src,
    price: product.price,
    rating: Math.floor(product.rating),
    discount: product.discount,
    // createdAt: convertDate(createdAt),
    reviews: mapReviews(product.reviews),
  };
};
