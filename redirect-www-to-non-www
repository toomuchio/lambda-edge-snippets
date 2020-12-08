//Even hook: Viewer request
//Scheme is not exposed by event object unfortunately... So it's set to https.

'use strict';
exports.handler = function handler(event, context, callback) {
	const request = event.Records[0].cf.request;
	const host = request.headers.host[0].value;


	if (host.startsWith("www.") && !host.endsWith(".cloudfront.net")) {
		const response = {
			headers: {
				'location': [{
					key: 'Location',
					value: "https://" + host.slice(4) + request.uri
				 }]
			},
			status: '301',
			statusDescription: 'Moved Permanently'
		};
		callback(null, response);
		return;
	}

	callback(null, request);
};
