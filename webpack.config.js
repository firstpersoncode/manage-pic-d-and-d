const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, './build/'),
		filename: 'bundle.js'
	},
	devServer: { // web dev server
		inline: true,
		port: 9000
	},
	module: {
		// babel loaders, and sass loaders
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ]
			}
		]
	}
}
