# lambda-edge-snippets
 
Just some useful Lambda edge snippets I often reuse 
 
* clean-urls.js - Appends .html and index.html when needed so urls don't need .html / index.html crap, mimics has-been .htaccess type rules for websites without their own routers.
* redirect-www-to-non-www.js - Self explanatory removes the need of a second S3 bucket or meta redirects
* security_headers.js - Allows injection security headers every site should have, need to be tweaked per deployment, obviously.
* legacy-redirects.js - Enables redirection at the edge location for legacy urls or just if you want shortened urls
