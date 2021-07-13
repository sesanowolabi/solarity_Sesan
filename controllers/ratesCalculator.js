
var axios = require('axios');

// Purchase
var bellinghamPurchase = require('../data/purchase/bellingham');
var olympiaPurchase = require('../data/purchase/olympia');
var tricitiesPurchase = require('../data/purchase/tricities');
var vancouverPurchase = require('../data/purchase/vancouver');
var yakimaPurchase = require('../data/purchase/yakima');

var bellinghamPurchaseRequest = bellinghamPurchase.bellinghamRequest;
var olympiaPurchaseRequest = olympiaPurchase.olympiaRequest;
var tricitiesPurchaseRequest = tricitiesPurchase.tricitiesRequest;
var vancouverPurchaseRequest = vancouverPurchase.vancouverRequest;
var yakimaPurchaseRequest = yakimaPurchase.yakimaRequest;

// Refinance
var bellinghamRefinance = require('../data/refinance/bellingham');
var olympiaRefinance = require('../data/refinance/olympia');
var tricitiesRefinance = require('../data/refinance/tricities');
var vancouverRefinance = require('../data/refinance/vancouver');
var yakimaRefinance = require('../data/refinance/yakima');

var bellinghamRefinanceRequest = bellinghamRefinance.bellinghamRequest;
var olympiaRefinanceRequest = olympiaRefinance.olympiaRequest;
var tricitiesRefinanceRequest = tricitiesRefinance.tricitiesRequest;
var vancouverRefinanceRequest = vancouverRefinance.vancouverRequest;
var yakimaRefinanceRequest = yakimaRefinance.yakimaRequest;

// should be this businessChannelID (89194) and originatorID (942535)
let headers = {
    "api-version": 3,
	"businessChannelId": 89194,
	"originatorId": 942535,
	"Content-Type": "application/json",
	"client_id":"e0a4f1584a854662b138520c797d4866",
	"client_secret":"D4E0F8Db49DE4b6ebe00DC24698360DF",       
};


   
module.exports = {
	updateBellinghamPurchase: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', bellinghamPurchaseRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9a22e7179a36ac32b239";
	      		var currentTime = new Date();
	      		req.database.collection('bellinghamPurchase').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getBellinghamPurchase: function(req, res, next) {
		req.database.collection('bellinghamPurchase').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateBellinghamRefinance: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', bellinghamRefinanceRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9a3de7179a36ac32b254";
	      		var currentTime = new Date();
	      		req.database.collection('bellinghamRefinance').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        // console.log(error)
	        console.log(error.response.data) 
	      }
	    );
	},
	getBellinghamRefinance: function(req, res, next) {
		req.database.collection('bellinghamRefinance').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateOlympiaPurchase: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', olympiaPurchaseRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9b18e7179a36ac32b2be";
	      		var currentTime = new Date();
	      		req.database.collection('olympiaPurchase').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getOlympiaPurchase: function(req, res, next) {
		req.database.collection('olympiaPurchase').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateOlympiaRefinance: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', olympiaRefinanceRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9b09e7179a36ac32b2b2";
	      		var currentTime = new Date();
	      		req.database.collection('olympiaRefinance').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getOlympiaRefinance: function(req, res, next) {
		req.database.collection('olympiaRefinance').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateTricitiesPurchase: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', tricitiesPurchaseRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9afde7179a36ac32b2b0";
	      		var currentTime = new Date();
	      		req.database.collection('tricitiesPurchase').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getTricitiesPurchase: function(req, res, next) {
		req.database.collection('tricitiesPurchase').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateTricitiesRefinance: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', tricitiesRefinanceRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9af0e7179a36ac32b2a8";
	      		var currentTime = new Date();
	      		req.database.collection('tricitiesRefinance').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getTricitiesRefinance: function(req, res, next) {
		req.database.collection('tricitiesRefinance').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateVancouverPurchase: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', vancouverPurchaseRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9ae4e7179a36ac32b2a7";
	      		var currentTime = new Date();
	      		req.database.collection('vancouverPurchase').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getVancouverPurchase: function(req, res, next) {
		req.database.collection('vancouverPurchase').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateVancouverRefinance: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', vancouverRefinanceRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9acfe7179a36ac32b2a2";
	      		var currentTime = new Date();
	      		req.database.collection('vancouverRefinance').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getVancouverRefinance: function(req, res, next) {
		req.database.collection('vancouverRefinance').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateYakimaPurchase: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', yakimaPurchaseRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9ac4e7179a36ac32b29c";
	      		var currentTime = new Date();
	      		req.database.collection('yakimaPurchase').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getYakimaPurchase: function(req, res, next) {
		req.database.collection('yakimaPurchase').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
	updateYakimaRefinance: function(req, res, next) {
		axios.post('https://optimal-blue-pricing-info-system-api.us-w2.cloudhub.io//api/system/optimalblue/pricinginfo/v1/productgroupsearch', yakimaRefinanceRequest, {headers: headers}).then(response => {
	        if(response) {
	      		var data = response.data;
	      		var id = "5cab9ab9e7179a36ac32b295";
	      		var currentTime = new Date();
	      		req.database.collection('yakimaRefinance').update({_id: new ObjectID(id)}, {$set: {timestamp: currentTime, data: data}}, function(error, result) {
				    if(error) {
				      	res.send('error inserting into db')
				    } else { 
				    	res.send('yuuuuuppp')
				    	// next();
				    }       
			  	});	 
	        } 
	      })
	      .catch(error => {
	        // res.send(error);
	        res.send('nope');
	        console.log(error.response.data) 
	      }
	    );
	},
	getYakimaRefinance: function(req, res, next) {
		req.database.collection('yakimaRefinance').find().toArray(function(err, list) {
	        if (err) {
	          res.send(err);
	        } else {
	          res.send(list);
	        }
      	});
	}, 
}