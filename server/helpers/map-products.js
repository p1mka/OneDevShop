const convertDate = require("./convert-date");

module.exports = function (products) {
  return products.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      img: item.img_src,
      price: item.price,
      rating: item.rating,
      discount: item.discount,
      // createdAt: convertDate(createdAt),
    };
  });
};
