const mapUser = require("./map-user");
const convertDate = require("./convert-date");
module.exports = function (reviews) {
  return reviews.map((item) => {
    return {
      id: item.id,
      content: item.content,
      author: mapUser(item.author),
      reviewRating: item.reviewRating,
      createdAt: convertDate(item.createdAt),
    };
  });
};
