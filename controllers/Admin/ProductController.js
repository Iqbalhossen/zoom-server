const ProductModels = require("../../models/ProductModels");
const ProductImage = require("../../models/ProductImage");
const { ObjectId } = require("mongodb");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const ProductView = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await ProductModels.countDocuments();

    // fetch products with category populated
    const products = await ProductModels.find()
      .populate("categories")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // attach images for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const images = await ProductImage.find({ product_id: product._id });
        return {
          ...product._doc,
          images: images.map((img) => img.image),
        };
      })
    );

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: productsWithImages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const ProductStore = async (req, res) => {
  try {
    const data = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }

    //  Product create
    const newProduct = await ProductModels.create({
      name: data.name,
      slug: data.slug,
      categories: data.categories,
      description: data.description,
      price: data.price,
      discount: data.discount,
      stock: data.stock,
      status: data.status,
    });

    // ২. Image upload & save
    const uploadedImages = [];

    for (let file of req.files) {
      const folder = "./public/";
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

      const formattedName = file.originalname.split(" ").join("-");
      const fileName = `${Date.now()}-${formattedName}`;

      await sharp(file.buffer).resize(1136, 568).toFile(`${folder}${fileName}`);

      const img = await ProductImage.create({
        product_id: newProduct._id,
        image: `public/${fileName}`,
      });

      uploadedImages.push(img);
    }

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
      images: uploadedImages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const ProductDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { _id: new ObjectId(id) };

    const product = await ProductModels.findOne(filter);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const images = await ProductImage.find({ product_id: id });

    for (let img of images) {
      const filePath = path.join(__dirname, "../../", img.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await ProductImage.deleteMany({ product_id: id });

    await ProductModels.findByIdAndDelete(filter);

    res.status(200).json({
      success: true,
      message: "Product and images deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const ProductActiveInactive = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };
    const product = await ProductModels.findOne(filter);

    if (product?.status) {
      const results = await ProductModels.findByIdAndUpdate(
        filter,
        { status: false },
        option
      );
      res.status(201).json({
        success: true,
        message: "Product Inactive  successfull",
        data: results,
      });
    } else {
      const results = await ProductModels.findByIdAndUpdate(
        filter,
        { status: true },
        option
      );
      res.status(201).json({
        success: true,
        message: "Product Inactive  successfull",
        data: results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const ProductStock = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };

    const product = await ProductModels.findOne(filter);

    if (product?.stock) {
      const results = await ProductModels.findByIdAndUpdate(
        filter,
        { stock: false },
        option
      );
      res.status(201).json({
        success: true,
        message: "Product stock out  successfull",
        data: results,
      });
    } else {
      const results = await ProductModels.findByIdAndUpdate(
        filter,
        { stock: true },
        option
      );
      res.status(201).json({
        success: true,
        message: "Product stock  successfull",
        data: results,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ProductView,
  ProductStore,
  ProductDelete,
  ProductActiveInactive,
  ProductStock,
};
