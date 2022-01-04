'use strict';

const path = require('path');
const glob = require('glob');
const fs = require('fs');


const packagesRoot = glob.sync( path.resolve(__dirname, '../packages/*/*.ts') );
const packagesSub = glob.sync( path.resolve(__dirname, '../packages/*.ts') );
const packages = packagesRoot.concat( packagesSub );
const componentsEntry = {};
packages.map( ( path ) => {
	const filename = path.split( '/' ).pop().replace('.ts', '');
	componentsEntry[ filename ] = path;
});


/*! 
 *************************************
 *  Clear npm files
 *************************************
 */
const comNames = Object.keys( componentsEntry );
packages.map( ( comPath, index ) => {
	const npmDir = path.resolve(__dirname, `../${comNames[index]}`);
	fs.rmdirSync(npmDir, { recursive: true });
	console.log(`Successfully ${npmDir}.js deleted!`);

});

