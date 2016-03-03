const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const nodeModulesPath = path.join(__dirname, 'node_modules');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, "app"),
	build: path.join(__dirname, "build"),
	publicPath: "/assets/"
}

const common = {
	entry: {
		app: [
			PATHS.app
		]
	},
	output: {
		path: PATHS.build,
		filename: '[name].js',
		publicPath: PATHS.publicPath
	},
	resolve: {
		extensions: ['', '.tsx', '.ts', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader"
			}
		]
	}
}

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
        	publicPath: PATHS.publicPath,
        	historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}