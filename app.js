const express = require('express');
const expressApp = express();
const serverConfig = require('./config/server.config')
const db = require('./models');
const bodyParser = require("body-parser");
expressApp.use(bodyParser.urlencoded({extended: true}));
expressApp.use(bodyParser.json());

expressApp.get('/', (req, res) => {
    res.send("my server is running fine!");
});

function init(){
    db.role.create({
        id: 1,
        name:db.ROLES[0]
    })
    db.role.create({
        id: 2,
        name:db.ROLES[1]
    })
    var categoriesdata=[
        {
            name:"electronics",
            description:"this has elec items"
        }
    ]


    
    db.category.bulkCreate(categoriesdata).then(()=>{
        console.log("category table is initialised");
    }).catch((err) => {
        console.log("error");
    })
    
}
//Set the One to Many relationship between Category and Product
db.category.hasMany(db.products);

db.sequelize.sync({ force: true }).then(() => {
    console.log("models/tables are dropped and recreated");
    init();
});
require('./routes/category.routes')(expressApp);
require('./routes/product.routes')(expressApp);
require('./routes/auth.routes')(expressApp);
require('./routes/cart.routes')(expressApp);
require('./routes/base.routes')(expressApp);
console.log("Printing the port *******************************");
console.log(process.env.PORT);
expressApp.listen(process.env.PORT || serverConfig.PORT, () => {
    console.log("my server is running");
});
