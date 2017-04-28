/*
By Sam Calaio and Alex Rhone
*/

var http = require('http'), qs = require('querystring');
var fs = require('fs');

function handle_incoming_request(req, res){
	//get post data for request
	var body = '';
	req.on(
		'readable', 
		function (){
			var d = req.read();
			if(d){
				if(typeof d == 'string'){
					body += d;
				} else if(typeof d == 'object' && d instanceof Buffer){
					body += d.toString('utf8');
				}
			}
		}
	);
	//process post data
	req.on(
		'end', 
		function (){
			if(req.method.toLowerCase() == 'post'){
				//use querystring module parse function to represent the data sent as js object
				var POST_data = qs.parse(body);
				// insertDocument_simpleFormDB.js
				var MongoClient = require('mongodb').MongoClient;
				var assert = require('assert');

				var dBase = 'simpleFormDB_2';
				var url = 'mongodb://localhost:27017/' + dBase;

				MongoClient.connect(url, function(err, db) {

					assert.equal(null, err);
					//console.log("Connected correctly to database: " + dBase);

					db.collection('contactInfo', function (err, collection) {

						collection.insert(body);

						/*db.collection('contactInfo').count(function (err, count) {
							if (err) throw err;

							console.log('Total Rows: ' + count);
						});*/
						collection.find().toArray(function(err, items) {
							if (err) throw err;

							console.log(items);
						});
					});

					db.close();
				});




			}
			
			//var parsedJSON = JSON.parse(POST_data);
			var d = new Date();
			res.writeHead(200, {'Content-Type':'text/html'});
			//start output for html
			var output = "<style> p {margin-left: 2%;} </style>";
			output += "<h1>Form Received:</h1>";
			output += "<p>" + d.toLocaleString() + "</p>";
			
			output += "<h1>Form Completed</h1>";
			output += "<p>" + POST_data.formName + "</p>";
			
			output += "<h1>Summary of Responses</h1>";
			output += "<p><b> Name: </b>" + POST_data.name + "</p>";
			output += "<p><b> Comment: </b>" + POST_data.comments + "</p>";
			output += "<p><b> E-mail: </b>" + POST_data.email + "</p>";
			output += "<p><b> Things Liked: </b>";
			//if no checkbox
			if (POST_data.thingsliked == undefined){
				output += "None";
			}
			else{
				//if one checkbox
				if (POST_data.thingsliked[0].length == 1){
					output += POST_data.thingsliked;
				}
				//if more than one checkbox
				else{
					output += POST_data.thingsliked[0];
					for (var i = 1; i < POST_data.thingsliked.length; i++){
						output += ", " +POST_data.thingsliked[i];
					}
				}
			}
			output += "</p>";
			output += "<p><b> How you found the Web page: </b>" + POST_data.howtosite + "</p>";
			output += "<p><b> How you rated the Web page: </b>" + POST_data.rating + "</p>";
			
			output += "<h1> Thank you for your response! </h1>";
			res.end(output);
			// end output for html
		}
	);
}
// displayForm code from https://www.sitepoint.com/creating-and-handling-forms-in-node-js/
function displayForm(res) {
    fs.readFile('RateMyPageForm.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}
				
var s = http.createServer(function (req, res) {
    if (req.method.toLowerCase() != 'post') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
		handle_incoming_request(req, res);
    }

});
//var s = http.createServer(handle_incoming_request);
s.listen(8080);