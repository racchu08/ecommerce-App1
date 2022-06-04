
const {category} = require("../models")
const validateCategoryRequest = (req, res, next) =>{
    if (!req.body.name) {
        res.status(400).send({
            message: "name of category is empty"
        });
        return;
    }
    next();
}



const validateProductRequest = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        res.status(400).send({
            message: "name or price of product can't  be empty"
        });
        return;
    }
    if(req.body.categoryId){            //if category id is provided
        //valid categoryId
    category.findByPk(req.body.categoryId).then((response) => {
        if(!response){
            res.status(400).send({
                message: `CategoryId passed is not valid : ${req.body.categoryId}`
            })
            return;
        }else{
            if (!req.body.price || req.body.price <= 0) {
                res.status(400).send({
                    message: "price does't seems to be in place"
                });
                return;
            }else{

                next();
            }
        }
    })
    
    }else{               //if category id not be provided
        res.status(400).send({
            message: "categoryId of a product is not available "
        });
        return;
    }
}
const validateCategoryInRequestParams =(req,res,next)=>{
    const categoryId = req.params.categoryId;
    if(categoryId){            //if category id is provided
        //valid categoryId
    category.findByPk(categoryId).then((response) => {
        if(!response){
            res.status(400).send({
                message: `CategoryId passed is not valid : ${categoryId}`
            })
            return;
        }else next();

}).catch(err=>{
    res.status(500).send({
        message:"some internal error occured"
    })
})
}else{               //if category id not be provided
    res.status(400).send({
        message: "categoryId of a product is not available "
    });
    return;
}
}

module.exports= {validateCategoryRequest, validateProductRequest,validateCategoryInRequestParams}