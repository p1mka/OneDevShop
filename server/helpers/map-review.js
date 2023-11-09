const mapUser = require("./map-user");
const convertDate = require("./convert-date");

module.exports = function (review) {
  return {
    id: review.id,
    content: review.content,
    author: mapUser(review.author),
    reviewRating: review.reviewRating,
    createdAt: convertDate(review.createdAt),
  };
};
