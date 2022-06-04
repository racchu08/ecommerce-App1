
// create update delete findone findall

const { response } = require("express");
const db = require("../models")
const Product = db.products;

exports.create = (req, res) => {
   
    const products = {
        name: req.body.name,
        description: req.body.description,
        price :req.body.price,
        categoryId : req.body.categoryId
    };
    //  to store category into db

    Product.create(products).then((response) => {
        res.status(201).send(response);

    }).catch((err) => {
        res.status(500).send({
            message: "internal error during creation"
        })
    })
}

//update
exports.update = (req, res) => {
   
    const products = {        //category object
        name: req.body.name,
        description: req.body.description,
        price :req.body.price
    };
    const productsId = req.params.id;
    Product.update(products, {
        where: {
            id: productsId,
        }
    }).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(500).send({
            message: "internal error during update"
        });
    });
}

//dalete
exports.delete = (req, res) => {
    const productsId = req.params.id;
    Product.destroy({
        where: {
            id: productsId,
        }
    }).then((response) => {
        res.sendStatus(200).send(response);
    }).catch((err) => {
        res.sendStatus(500).send({
            message: "internal error during update"
        });
    });
}


//find one
exports.findOne = (req, res) => {
    const productsId = req.params.id;
    Product.findByPk(productsId).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(500).send({
            message: "internal error during findOne"
        })
    })
}

//findAll
exports.findAll = (req, res) => {
    let productsName = req.query.name;
    let promise;
    if (productsName) {
        promise = Product.findAll({
            where: {
                name: productsName,
            }
        })
    } else {
        promise = Product.findAll();
    }
    promise.then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(500).send({
            message: "internal error during findAll"
        })
    })
}
exports.getProductsUnderCategory = (req, res) => {
    const categoryID = req.params.categoryId;
    Product.findAll({
        where: {
            categoryId: categoryID
        }
    }).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(500).send({
            message:"some error in internal"
        })
    })
   
    
}