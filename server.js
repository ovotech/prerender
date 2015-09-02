#!/usr/bin/env node
var prerender = require('./lib')
        ,util = require('./lib/util.js');

var args;
if (process.env.PHANTOM_ARGS != null)
    args = process.env.PHANTOM_ARGS.split(" ");

util.log('starting prerender with args : ' + args );
util.log('starting prerender with original args : ' + process.env.PHANTOM_ARGS );


var server = prerender({
    workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
    iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
    phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT,
    phantomArguments: args
});


// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
