//
// form_processing_server_v1_5.js
//
// - A server program that gets POST data
//
// - Streams are required to get the POST data. The key pattern for using
//   streams is:
//     .on(event_name, function (param) { ... });
//
//     ('readable' event) First read the data from the stream with the 'read'
//      method and append it to the end of the 'body' variable.
//
//     ('end' event) Next take the resulting string and try to parse it.
//
//---------------------------------------------------------------------------

var http = require('http'), qs = require('querystring');

function handle_incoming_request(req, res) {
	// Get the POST data for the request
    var body = '';
    req.on(
        'readable',
        function () {
            var d = req.read();
            if (d) {
                if (typeof d == 'string') {
                    body += d;
                } else if (typeof d == 'object' && d instanceof Buffer) {
                    body += d.toString('utf8');
                }
            }
        }
    );

    // Process the POST data
    req.on(
        'end',
        function () {
            if (req.method.toLowerCase() == 'post') {
				// Use the 'querystring' module 'parse' function to
				// represent the data sent as a JavaScript object
                var POST_data = qs.parse(body);
                // Code to display object as text in command window
                console.log(POST_data);
            }

			// Code to display JSON error object in Web page
            //res.writeHead(200, { "Content-Type" : "application/json" });
            //res.end(JSON.stringify( { error: null }) + "\n");

            // Code to display JSON POST data object as text
            // in Web page
            res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end(JSON.stringify(POST_data));
        }
    );

}

var s = http.createServer(handle_incoming_request);
s.listen(8080);
