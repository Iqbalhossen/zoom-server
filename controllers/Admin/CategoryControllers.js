const CategoryModels = require("../../models/CategoryModel");
const { ObjectId } = require("mongodb");



const CategoryAllView = async (req, res) => {
  try {

    const data = await CategoryModels.find()
      .sort("-createdAt");
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const CategoryView = async (req, res) => {
  try {
    let { page, limit } = req.query;

    const skip = (page - 1) * 10;
    if (!page) page = 1;
    if (!limit) limit = 10;
    const data = await CategoryModels.find()
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);
    const dataLength = await CategoryModels.find();
    const pageCount = Math.ceil(
      parseFloat(dataLength.length) / parseFloat(limit)
    );
    res.status(201).json({
      success: true,
      data,
      length: dataLength.length,
      page,
      limit,
      pageCount,
    });
  } catch (error) {
    console.log(error);
  }
};

const SingleCategoryView = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const data = await CategoryModels.findOne(filter);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const CategoryStore = async (req, res) => {
  try {
    const data = req.body;
    const results = await CategoryModels.create(data);
    res.status(201).json({
      success: true,
      message: "Category added successfull",
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

const CategoryDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };

    const results = await CategoryModels.findByIdAndDelete(query);
    res.status(201).json({
      success: true,
      message: "Delete successfully",
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

const CategoryUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };
    const results = await CategoryModels.findByIdAndUpdate(
      filter,
      data,
      option
    );
    res.status(201).json({
      success: true,
      message: "Category Update successfull",
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  CategoryAllView,
  CategoryView,
  SingleCategoryView,
  CategoryStore,
  CategoryDelete,
  CategoryUpdate,
};
