var http = require('http'), qs = require('querystring');

function handle_incoming_request(req, res){
	//get post data for request
	var body = ' ';
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
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end(JSON.stringify(POST_data));
		}
	);
}
				

var s = http.createServer(handle_incoming_request);
s.listen(8080);