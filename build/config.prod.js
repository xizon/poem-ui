'use strict';

const webpack = require('webpack');
const path = require('path');
const json = require('../package.json');
const moment = require('moment');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
				if (!fs.existsSync(newDir)){
					fs.mkdirSync(newDir);
				}


				//JS files
				const oldPathJS = path.resolve(__dirname, `../dist/cjs/${comNames[index]}.js`);
				const newPathJS = `${newDir}/index.js`;
				fs.rename(oldPathJS, newPathJS, function (err) {
					//if (err) throw err
					console.log(`Successfully ./${comNames[index]}/index.js`);
				});


				//CSS files
				const oldPathCSS = path.resolve(__dirname, `../dist/cjs/${comNames[index]}.css`);
				const newPathCSS = `${newDir}/styles.css`;
				fs.rename(oldPathCSS, newPathCSS, function (err) {
					//if (err) throw err
					console.log(`Successfully ./${comNames[index]}/styles.css`);
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

			if ( request.indexOf( '@/components/_utils/styles' ) >= 0 ) {
				return callback(null, 'commonjs ' + '../UtilsReset');
			}

			if ( request.indexOf( '@/components/_utils/_all' ) >= 0 ) {
				return callback(null, 'commonjs ' + '../UtilsScriptsHelpers');
			}	
			if ( request.indexOf( '@/components/_plugins/_lib-gsap' ) >= 0 ) {
				return callback(null, 'commonjs ' + '../UtilsScriptsGSAP');
			}	
			if ( request.indexOf( '@/components/_plugins/_lib-scrolllock' ) >= 0 ) {
				return callback(null, 'commonjs ' + '../UtilsScriptsBSL');
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


			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: '../cjs/[name].css'
			}),
			new CssMinimizerPlugin({
				test:/\.min\.css$/i,
				parallel: true,
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComments: { removeAll: true },
						},
					],
				},
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
					  ["@babel/preset-env", { 
						  "targets": {"esmodules": true}
					  }],
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
					/**
					 * Note:
					 * You can use `style-loader` to inject CSS into the DOM to generate a final js file
					 */
					{
						loader: MiniCssExtractPlugin.loader, //Extracts CSS into separate files  ( Step 3 )
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							publicPath: '../dist/'
	
						}
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


