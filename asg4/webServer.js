var http = require("http");

function process_request(req, res){
	//shows incoming request
	console.log("INCOMING REQUEST: " + req.method + " " + req.url);
	
	var body = 'Thanks for providing your feedback! \n';
	var content_length = body.length;
	res.writeHead(200, {
		'Content-Length': content_length,
		'Content-Type': 'text/plain'
	});
	res.end(body);	
}

var s = http.createServer(process-request);
s.listen(8080);