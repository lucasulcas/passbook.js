exports.streamPassbook = function(type, pass, keys, password, passname, callback) {
	var passbook = require('./lib/index.js');
	var fs = require("fs");

	var template = passbook.createTemplate(type, {
		passTypeIdentifier: pass.passTypeIdentifier,
		teamIdentifier:     pass.teamIdentifier,
		organizationName:   pass.organizationName
	}, {
		certs: {
	  		wwdr: keys+'/wwdr.pem',
	  		pass: keys+'/wallet.pem', // pem with certificate and private key
	  		password: password // pass phrase for the pass_cert.pem file
		}
	});
	var stream = template.createPass(pass);
	callback(stream);
}




exports.prepareKeys = function(keys) {
	console.log("Preparing keys in directory "+ keys);
	var exec = require('child_process').exec,
	    child;
	child = exec('node node_modules/passbook.js/node-passbook prepare-keys -p '+keys,
	  function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
	console.log("Keys prepared");
}



