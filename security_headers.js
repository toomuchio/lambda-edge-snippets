//Event hook: Viewer response
//Very hardened security headers change as needed

'use strict';
exports.handler = (event, context, callback) => {
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    headers['strict-transport-security'] = [{key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload'}]; 
    headers['content-security-policy'] = [{key: 'Content-Security-Policy', value: "default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; object-src 'self'; manifest-src 'self'; frame-ancestors 'none'; form-action 'none'; navigate-to 'self'; upgrade-insecure-requests; block-all-mixed-content; base-uri https://CHANGEME;"}]; 
    headers['x-content-type-options'] = [{key: 'X-Content-Type-Options', value: 'nosniff'}]; 
    headers['x-frame-options'] = [{key: 'X-Frame-Options', value: 'DENY'}]; 
    headers['x-xss-protection'] = [{key: 'X-XSS-Protection', value: '1; mode=block'}]; 
    headers['referrer-policy'] = [{key: 'Referrer-Policy', value: 'same-origin'}]; 

    callback(null, response);
};
