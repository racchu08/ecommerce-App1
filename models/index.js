
const Sequelize = require("sequelize");
const dbConfig = require('../config/db.config.json');
const env = process.env.NODE_ENV || "development";
const dbSetting = dbConfig[env];



const sequelize = new Sequelize(
    dbSetting.database,
    dbSetting.username,
    dbSetting.password,
    dbSetting.dialectInfo
);
const db = {Sequelize, sequelize};
db.category = require("./category.model")(sequelize, Sequelize);
db.products = require("./product.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize, Sequelize);
/*
* relationship between role and user
*/
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role,{
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

 db.ROLES = ["customer", "admin"];

 /******
  * relationship between cart and user : 1 user many carts
  */

db.user.hasMany(db.cart);

/******
  * relationship between cart and products : many-to-many
  */

db.products.belongsToMany(db.cart, {
    through: "cart_products",
    foreignKey:"productId", 
    otherKey: "cartId"
});

db.cart.belongsToMany(db.products, {
    through: "cart_products",
    foreignKey:"cartId", 
    otherKey: "productId"
});

module.exports = db;



