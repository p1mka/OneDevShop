const Product = require("../models/product");
const Review = require("../models/review");

const getProducts = async () => {
  return await Product.find();
};

const getProductById = async (id) => {
  const product = await Product.findOne({ _id: id });
  return await product.populate({
    path: "reviews",
    populate: "author",
  });
};

const addReview = async (productId, content) => {
  const newReview = await Review.create(content);
  await Product.findByIdAndUpdate(productId, { $push: { reviews: newReview } });

  const product = await Product.findOne({ _id: productId }).populate("reviews");
  const summaryRating = product.reviews.reduce(
    (acc, review) => acc + review.reviewRating,
    0
  );
  const reviewsCount = product.reviews.length;
  const newRating = summaryRating / reviewsCount;

  await Product.findByIdAndUpdate(productId, { $set: { rating: newRating } });

  await newReview.populate("author");
  return { newReview, newRating };
};
const deleteReview = async (productId, reviewId) => {
  await Review.deleteOne({ _id: reviewId });
  await Product.findByIdAndUpdate(productId, { $pull: { reviews: reviewId } });

  const product = await Product.findOne({ _id: productId }).populate("reviews");
  const summaryRating = product.reviews.reduce(
    (acc, review) => acc + review.reviewRating,
    0
  );
  const reviewsCount = product.reviews.length;
  const newRating = summaryRating / reviewsCount;

  await Product.findByIdAndUpdate(productId, { $set: { rating: newRating } });

  return newRating;
};

module.exports = { getProducts, getProductById, addReview, deleteReview };
