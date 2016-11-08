module.exports = function(webpackConfig) {
	webpackConfig.babel.plugins.push('transform-runtime');
	webpackConfig.babel.plugins.push(['import', {
		libraryName: 'antd',
		style: 'css',
	}]);
	webpackConfig.externals = {'jquery':'jQuery'};
	webpackConfig.module.loaders.push({ test: /\.woff(\?.+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" });
	webpackConfig.module.loaders.push({ test: /\.ttf(\?.+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" });
	webpackConfig.module.loaders.push({ test: /\.eot(\?.+)?$/,    loader: "file" });
	webpackConfig.module.loaders.push({ test: /\.svg(\?.+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" });
	webpackConfig.module.loaders.push({ test: /\.(png|jpg|gif)([\?]?.*)$/,    loader: "url-loader" });
	return webpackConfig;
};
