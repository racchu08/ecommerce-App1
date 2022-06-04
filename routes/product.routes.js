const productController = require("../controllers/product.controller")
const {requestValidator, authJwt} = require("../middlewares/")
module.exports = function(app){
    // create
    app.post("/ecom/api/v1/products",[requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],productController.create)
    // update
    app.put("/ecom/api/v1/products/:id",[requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],productController.update)
// delete
   app.delete("/ecom/api/v1/products/:id",[authJwt.verifyToken, authJwt.isAdmin], productController.delete)
    // find one

    app.get("/ecom/api/v1/products/:id",productController.findOne)
    // findall
    app.get("/ecom/api/v1/products",productController.findAll)

    app.get("/ecom/api/v1/categories/:categoryId/products",[requestValidator.validateCategoryInRequestParams],productController.getProductsUnderCategory)
}