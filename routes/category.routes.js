const categoryController = require('../controllers/category.controller');
const {requestValidator, authJwt} = require("../middlewares");
module.exports = function(app){
    // create
    app.post("/ecom/api/v1/categories", [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin], categoryController.create)
    // update
    app.put("/ecom/api/v1/categories/:id",[requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin],categoryController.update)
// delete
   app.delete("/ecom/api/v1/categories/:id",[authJwt.verifyToken, authJwt.isAdmin], categoryController.delete)
    // find one

    app.get("/ecom/api/v1/categories/:id",categoryController.findOne)
    // findall
    app.get("/ecom/api/v1/categories",categoryController.findAll)

    
}
