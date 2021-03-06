var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var Day = require('../models').Day;

router.get('/', function(req, res, next) {
    Promise.all([
            Hotel.findAll(),
            Restaurant.findAll(),
            Activity.findAll(),
        ])
        .spread(function(dbHotels, dbRestaurants, dbActivities) {
            res.render('index', {
                templateHotels: dbHotels,
                templateRestaurants: dbRestaurants,
                templateActivities: dbActivities
            });
        })
        .catch(next);
});


router.use("/api/hotels", require("./hotels"));
router.use("/api/restaurants", require("./restaurants"));
router.use("/api/activities", require("./activities"));
router.use("/api/days", require("./days"));


module.exports = router;