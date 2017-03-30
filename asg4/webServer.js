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
				//code to display object as text in command window
				console.log(POST_data);
			}
			//var parsedJSON = JSON.parse(POST_data);
			res.writeHead(200, {'Content-Type':'text/html'});
			var output = "<h1>Form Received:</h1><br>";
			
			output += "<h1>Form Completed</h1><br>";
			output += POST_data.formName;
			output += "<br>";
			
			output += "<h1>Summary of Responses</h1>";
			output += "<ul><li>";
			output += POST_data.name;
			output += "</li></ul>";
			res.end(output);
			//res.end(output);
		}
	);
}

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
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
		handle_incoming_request(req, res);
    }

});
//var s = http.createServer(handle_incoming_request);
s.listen(8080);