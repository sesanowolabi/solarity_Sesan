var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// TODO alphabetize

var ratesCalculator = require('./controllers/ratesCalculator');


// bellingham
router.route('/rates-calculator/update-bellingham-purchase').get(ratesCalculator.updateBellinghamPurchase);
router.route('/rates-calculator/get-bellingham-purchase').get(ratesCalculator.getBellinghamPurchase);
router.route('/rates-calculator/update-bellingham-refinance').get(ratesCalculator.updateBellinghamRefinance);
router.route('/rates-calculator/get-bellingham-refinance').get(ratesCalculator.getBellinghamRefinance);
// olympia
router.route('/rates-calculator/update-olympia-purchase').get(ratesCalculator.updateOlympiaPurchase);
router.route('/rates-calculator/get-olympia-purchase').get(ratesCalculator.getOlympiaPurchase);
router.route('/rates-calculator/update-olympia-refinance').get(ratesCalculator.updateOlympiaRefinance);
router.route('/rates-calculator/get-olympia-refinance').get(ratesCalculator.getOlympiaRefinance);
// tricities
router.route('/rates-calculator/update-tricities-purchase').get(ratesCalculator.updateTricitiesPurchase);
router.route('/rates-calculator/get-tri-cities-purchase').get(ratesCalculator.getTricitiesPurchase);
router.route('/rates-calculator/update-tricities-refinance').get(ratesCalculator.updateTricitiesRefinance);
router.route('/rates-calculator/get-tri-cities-refinance').get(ratesCalculator.getTricitiesRefinance);
// vancouver
router.route('/rates-calculator/update-vancouver-purchase').get(ratesCalculator.updateVancouverPurchase);
router.route('/rates-calculator/get-vancouver-purchase').get(ratesCalculator.getVancouverPurchase);
router.route('/rates-calculator/update-vancouver-refinance').get(ratesCalculator.updateVancouverRefinance);
router.route('/rates-calculator/get-vancouver-refinance').get(ratesCalculator.getVancouverRefinance);
// yakima
router.route('/rates-calculator/update-yakima-purchase').get(ratesCalculator.updateYakimaPurchase);
router.route('/rates-calculator/get-yakima-purchase').get(ratesCalculator.getYakimaPurchase);
router.route('/rates-calculator/update-yakima-refinance').get(ratesCalculator.updateYakimaRefinance);
router.route('/rates-calculator/get-yakima-refinance').get(ratesCalculator.getYakimaRefinance);


module.exports = router;