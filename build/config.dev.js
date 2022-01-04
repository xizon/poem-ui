'use strict';

const webpack = require('webpack');
const path = require('path');
const json = require('../package.json');
const moment = require('moment');
const TerserPlugin = require("terser-webpack-plugin");

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
	entry: {
		'poem-ui': path.resolve(__dirname, '../client.dev.js'),
		'poem-ui.min': path.resolve(__dirname, '../client.dev.js')
	},
	output: {
	  library: {
		name: 'RootLib',
		type: 'var'
	  },
	  filename: '[name].js',
	  path: path.resolve(__dirname, '../dist'),
	},

	/*
	entry: path.resolve(__dirname, '../src/index.ts'),
	output: {
	  filename: 'poem-ui.js',
	  path: path.resolve(__dirname, '../dist'),
	},
	*/
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
	plugins: []
	
	
};

// Add souce maps
webpackConfig.plugins.push(
	new webpack.SourceMapDevToolPlugin({
	  filename: '[file].map',
	})
);

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


