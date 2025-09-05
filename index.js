require('dotenv').config();
const database = require('./config/db.config');
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
database();
const http = require('http');
const server = http.createServer(app);


app.use(helmet());

app.use("/public/", express.static("./public/"));

// const corsOptions = {
//   origin: function (origin, callback) {
//     callback(null, origin || "*");
//   },
//   credentials: true,
// };

const allowedOrigins = [
  "http://localhost:3000",
  "https://tasko-abc.netlify.app",
];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

///////////////  route middleware
const UserRoutes = require("./routes/AuthRoutes");
const AdminCategoryRoutes = require("./routes/Admin/CategoryRoutes");
const AdminProductRoutes = require("./routes/Admin/ProductRoutes");

/////////////  route
app.use("/api/user", UserRoutes);
app.use("/api/admin/category", AdminCategoryRoutes);
app.use("/api/admin/product", AdminProductRoutes);




server.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);
});
