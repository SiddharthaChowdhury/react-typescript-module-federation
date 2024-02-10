const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.ts",
	mode: "development",
	devServer: {
		port: 3000,
		open: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					cacheDirectory: true,
					babelrc: false,
					presets: [
						["@babel/preset-env", { targets: { browsers: "last 2 versions" } }],
						"@babel/preset-typescript",
						"@babel/preset-react",
					],
					//   plugins: [
					//     "react-hot-loader/babel",
					//     ["@babel/plugin-proposal-class-properties", { loose: true }],
					//     [
					//       "@babel/plugin-proposal-private-property-in-object",
					//       { loose: true },
					//     ],
					//     ["@babel/plugin-proposal-private-methods", { loose: true }],
					//   ],
				},
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container",
			remotes: {
				// for production get from s3 for example: app1@http://<s3_domain>.<region>.amazonaws.com/remoteEntry.js
				editor_MFE: "editor@http://localhost:3001/remoteEntry.js",
			},
			shared: {
				...deps,
				react: {
					singleton: true,
					eager: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					eager: true,
					requiredVersion: deps["react-dom"],
				},
				// "react-router-dom": {
				// 	singleton: true,
				// 	eager: true,
				// 	requiredVersion: deps["react-router-dom"],
				// },
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
