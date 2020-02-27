const
    express = require('express'),
    bodyParser = require('body-parser')
    validator = require('../libs/validator.js'),
    schema = require('./ShoppingListAPI.json');



module.exports = function(){
    const app = express();

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser());

    let shopping_list = [
        {
            "id": 1,
            "item_name": "Apples",
            "description": "A bag of Autumn Crip Apples: 1KG",
            "unit_price": 223,
            "quantity": 1
        },
        {
            "id": 2,
            "item_name": "Pot Noodle",
            "description": "Chicken and Mushroom: 90g",
            "unit_price": 50,
            "quantity": 10
        },
        {
            "id": 3,
            "item_name": "Kenco Millicano",
            "description": "Original Instant: 100g",
            "unit_price": 250,
            "quantity": 3
        }
    ];


    app.get('/list/', function(req, res){
        res.status(200).send(shopping_list);
    });

    app.post('/list/', function(req, res){
        if(!validator.isValidSchema(req.body, 'components.schemas.Item')){
            console.log(JSON.stringify(req.body));
            res.status(400).send('Bad Request');
        }else{
            shopping_list.push(req.body);
            res.status(201).send('Created');
        }
    });

    app.get('/list/:id', function(req, res){
        let item_id = parseInt(req.params.id);

        let flag = false;

        for(let item of shopping_list){
            if(item.id == item_id){
                res.status(200).send(item);
                flag = true;
            }
        }

        if(!flag){
            res.status(404).send('Not found');
        }
    });

    app.patch('/list/:id', function(req, res){
        let item_id = parseInt(req.params.id);

        if (!validator.isValidSchema(req.body, 'components.schemas.Item')) {
            console.log(JSON.stringify(req.body));
            res.status(400).send('Bad Request');
        }else{
            let index = shopping_list.findIndex(x => x.id === item_id);
            let list_item = shopping_list[index];

            let temp = {
                "id": null,
                "item_name": null,
                "description": null,
                "unit_price": null,
                "quantity": null
            };

            if(req.body.hasOwnProperty('id')){
                temp['id'] = req.body.id;
            }else{
                temp['id'] = list_item.id;
            }

            if(req.body.hasOwnProperty('item_name')){
                temp['item_name'] = req.body.item_name;
            }else{
                temp['item_name'] = list_item.item_name;
            }

            if(req.body.hasOwnProperty('description')){
                temp['description'] = req.body.description;
            }else{
                temp['description'] = list_item.description;
            }

            if(req.body.hasOwnProperty('unit_price')){
                temp['unit_price'] = req.body.unit_price;
            }else{
                temp['unit_price'] = list_item.unit_price;
            }

            if(req.body.hasOwnProperty('quantity')){
                temp['quantity'] = req.body.quantity;
            }else{
                temp['quantity'] = list_item.quantity;
            }

            shopping_list.splice(index, 1);
            shopping_list.push(temp);

            res.status(201).send('OK');
        }

    });

    app.delete('/list/:id', function(req, res){
        let item_id = parseInt(req.params.id);

        try{
            let index = shopping_list.findIndex(x => x.id === item_id);
            shopping_list.splice(index, 1);
            res.status(200).send('OK');
        }catch{
            res.status(404).send('Not found');
        }
    });






    return app;
};
