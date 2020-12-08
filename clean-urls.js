//Event hook: Origin request
//Good for static built sites without their own routers, appends .html and index.html when needed
//Todo: Redirect .html to clean path for SEO? 

'use strict';

const INDEX_APPEND = "index.html"
const RE_NOEXT = /\/[^/.]+$/;
const EXT_APPEND = ".html"

exports.handler = function handler(event, context, callback) {
	const request = event.Records[0].cf.request;
	const uri = request.uri;

	//Fix the index
	if (uri.endsWith("/") && uri != "/") { //Leave root alone that's handled elsewhere
		request.uri += INDEX_APPEND;
		callback(null, request);
		return;
	}

	//Append ext (.html)
	if (uri.match(RE_NOEXT)) {
		request.uri += EXT_APPEND;
		callback(null, request);
		return;
	}

	callback(null, request);
};
