var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/result', function(req, res, next){
	var venmo_username = req.body.venmo_username;
	var item_description = req.body.item_description;
	var item_price = req.body.item_price;
	var audience = req.body.audience;

	res.render('result', {
		'venmo_username':venmo_username,
		'item_description':item_description,
		'item_price':item_price,
		'audience':audience
	});
});

module.exports = router;
