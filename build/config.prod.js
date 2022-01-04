'use strict';

const webpack = require('webpack');
const path = require('path');
const json = require('../package.json');
const moment = require('moment');
const TerserPlugin = require("terser-webpack-plugin");
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

console.log( 'componentsEntry: ', componentsEntry );


/*! 
 *************************************
 *  Run command after webpack build
 *************************************
 */
class MyPluginCompiledFunction {
	// Define `apply` as its prototype method which is supplied with compiler as its argument
	apply(compiler) {
		// Specify the event hook to attach to
		compiler.hooks.done.tap('MyPluginCompiledFunction', (compilation) => {

			//Move the components to folders of root directory
			const comNames = Object.keys( componentsEntry );
			packages.map( ( comPath, index ) => {
				
				const newDir = path.resolve(__dirname, `../${comNames[index]}`);
				const oldPath = path.resolve(__dirname, `../dist/cjs/${comNames[index]}.js`);
				const newPath = `${newDir}/index.js`;
				
				if (!fs.existsSync(newDir)){
					fs.mkdirSync(newDir);
				}

				fs.rename(oldPath, newPath, function (err) {
				  if (err) throw err
				  console.log(`Successfully ${comNames[index]}.js`);
				});

			});

			//remove old folder
			// Where the recursive option deletes the entire directory recursively.
			fs.rmdirSync(path.resolve(__dirname, '../dist/cjs'), { recursive: true });
			
		});
	}
}
  

/*! 
 *************************************
 *  Main configuration
 *************************************
 */
const devMode = process.env.NODE_ENV !== 'production';

const webpackConfig = {
	devtool: devMode ? 'source-map' : false,
    mode: devMode === 'development' ? 'development' : 'production',
	watch: true,
	context: __dirname, // to automatically find tsconfig.json
    resolve: {
		fallback: {
		    fs: false
		},
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass'],
		alias: {
			// specific mappings.
			// Supports directories and custom aliases for specific files when the express server is running, 
			// you need to configure the following files at the same time:
			// 1) `babel.config.js`    --> "plugins": [["module-resolver", {"alias": {...}} ]]
			//  2) `tsconfig.json`      --> "compilerOptions": { "paths": {...} }
			//  3) `package.json`       --> "jest": { "moduleNameMapper": {...} }
			
			'@/components': path.resolve(__dirname, '../src')
		}
    },

	//Exclude react from bundle
	externals: [
		{
			// String
			'react': 'React',
			'react-dom': 'ReactDOM',
		},
		// Function	
		function ({ context, request }, callback) {

			// Use the same './_all' path to prohibit loading of general style sheets
			if ( request.indexOf( '@/components/_utils/styles' ) >= 0 ) {
				return callback(null, 'commonjs ' + '../UtilsStyles');
			}

			if ( request.indexOf( '@/components/_utils/_all' ) >= 0 ) {
				return callback(null, 'commonjs ' + '../UtilsScripts');
			}	
			callback();
		},
		// Regex
		/^(jquery|\$)$/i,
	],

	entry: componentsEntry,
	output: {
		library: {
			type: 'commonjs'
		},
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist/cjs')
	},
	optimization: {
		minimize: true,
	    minimizer: [

			new TerserPlugin({
				test: /\.min\.js$/i
			}),

		],
		
	},
    module: {
        rules: [
            {
				test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, '../node_modules' ),
                options: {  
				  'presets': [
					  '@babel/preset-env',
					  '@babel/preset-react',
					  '@babel/preset-typescript',
					  {
						plugins: [
						  '@babel/plugin-proposal-class-properties'
						]
					  }	
				  ]
                }
			},

			{
				test: /\.(sa|sc|c)ss$/,
				include: [
					path.resolve(__dirname, '../src'),
					// Prevent errors in calling the node library: Module parse failed: Unexpected character'@'
					path.resolve(__dirname, '../node_modules'),
				],
				use: [
					{
						loader: "style-loader"  // creates style nodes from JS strings ( Step 3 )
					},
					{
						loader: "css-loader",   // interprets @import and url() and will resolve them. 
												//(translates CSS into CommonJS) ( Step 2 )
						options: {
							sourceMap: false
						}
					},
					{
						loader: 'sass-loader', // compiles Sass to CSS ( Step 1 )
						options: {
							sourceMap: false,
							sassOptions: {
								/* (nested | expanded | compact | compressed) */
								outputStyle: 'expanded'
							},

						}
	
					},
				]
			},


			{
				test: /\.(glsl|vs|fs|vert|frag)$/,
				exclude: path.resolve(__dirname, '../node_modules' ),
				use: [
					'raw-loader',
					'glslify-loader'
				]
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},

        ],
		
    },
	plugins: [ new MyPluginCompiledFunction() ]
	
	
};

// Add souce maps
// webpackConfig.plugins.push(
// 	new webpack.SourceMapDevToolPlugin({
// 	  filename: '[file].map',
// 	})
// );

// Adds a banner to the top of each generated chunk.
webpackConfig.plugins.push(
    new webpack.BannerPlugin(`
	@source: https://github.com/xizon/poem-ui
	@version: ${json.version} (${moment().format( "MMMM D, YYYY" )})
	@author: UIUX Lab <uiuxlab@gmail.com>
	@license: MIT
	`)
);


						
/*! 
 *************************************
 *  Exporting webpack module
 *************************************
 */
module.exports = webpackConfig;


