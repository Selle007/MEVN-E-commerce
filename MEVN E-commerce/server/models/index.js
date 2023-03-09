const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.categories = require("./category.model.js")(mongoose);
db.products = require("./product.model.js")(mongoose);
db.carts = require("./cart.model.js")(mongoose);
db.orders = require("./order.model.js")(mongoose);
db.userRoles = require("./userRole.model.js")(mongoose);

module.exports = db;