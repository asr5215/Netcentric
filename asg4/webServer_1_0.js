// webServer_1_0.js

// Use the built-in "http" module to allow your program to act as
// a Web server; the "require" function includes the module and
// the "http" variable refers to it
var http = require("http");


// Function takes two arguments: the first is an object representing
// an incoming request (of type ServerRequest); the second is an object
// representing a pending response (of type ServerResponse)
function process_request(req, res) {

    // Show incoming request
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);

    var body = 'Thanks for providing your feedback!\n';
    var content_length = body.length;
    res.writeHead(200, {
		'Content-Length': content_length,
		'Content-Type': 'text/plain'
    });
    res.end(body);
}


// Function takes one argument, the programmer-defined function
// that will be called whenever somebody makes a connection to
// your server; s is the server
var s = http.createServer(process_request);


// Tell the server to listen for requests on a particular port,
// 8080, in this case
s.listen(8080);
