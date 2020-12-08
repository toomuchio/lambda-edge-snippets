//Even hook: Viewer request
//Scheme is not exposed by event object unfortunately... So it's set to https.

'use strict';

const WWW_PREFIX = "www.";
const WWW_PREFIX_LEN = WWW_PREFIX.length;
const CF_ORIGIN_IGNORE = ".cloudfront.net";
const FORWARD_SCHEME = "https://";

exports.handler = function handler(event, context, callback) {
	const request = event.Records[0].cf.request;
	const host = request.headers.host[0].value;

	if (host.startsWith(WWW_PREFIX) && !host.endsWith(CF_ORIGIN_IGNORE)) {
		const response = {
			headers: {
				'location': [{
					key: 'Location',
					value: FORWARD_SCHEME + host.slice(WWW_PREFIX_LEN) + request.uri
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
