const multer = require("multer");

// Use memory storage (buffer-based)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid =
    allowedTypes.test(file.mimetype) &&
    allowedTypes.test(file.originalname.toLowerCase());

  if (isValid) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only image files are allowed"
      )
    );
  }
};

// Export a function that takes the field name
const singleUploadMiddleware = (fieldName = "image") => {
  const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter,
  }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, function (err) {
      const errorKey = fieldName;
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            success: false,
            errors: {
              [errorKey]: {
                msg: "Only image files are allowed (jpeg, jpg, png)",
              },
            },
          });
        }

        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            errors: {
              [errorKey]: {
                msg: "File size exceeds 1MB limit",
              },
            },
          });
        }

        return res.status(400).json({
          success: false,
          errors: {
            [errorKey]: {
              msg: err.message,
            },
          },
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          errors: {
            [errorKey]: {
              msg: err.message,
            },
          },
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          errors: {
            [errorKey]: {
              msg: "No file uploaded",
            },
          },
        });
      }

      next();
    });
  };
};

module.exports = singleUploadMiddleware;
