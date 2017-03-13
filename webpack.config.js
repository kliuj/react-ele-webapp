var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
	entry:{
		app:path.resolve(APP_PATH,'index.jsx')
	},
	output:{
		path:BUILD_PATH,
		filename:'[name].js'
	},
	resolve:{
		extensions:['.js','.jsx']
	},
	//启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
	devtool:'eval-source-map',
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		proxy:{
			'/api/*':{
				target:'http://localhost:8080',
				secure:false
			}
		}
	},
	module:{
		loaders: [
	      {
	        test: /\.jsx?$/,
	        loader: 'babel-loader',
	        include: APP_PATH,
	        query: {
	          //添加两个presents 使用这两种presets处理js或者jsx文件
	          presets: ['es2015', 'react']
	        }
	      },
	      {
	        test: /\.scss$/,
	        loaders: ['style', 'css', 'sass']
	      },
	       {
	        test: /\.css$/,
	        loaders: ['style', 'css', 'sass']
	      }
	    ]
	},
    plugins: [
     	//这个使用uglifyJs压缩你的js代码
	    new webpack.optimize.UglifyJsPlugin({minimize: true}),
	    new HtmlwebpackPlugin({
	      title: 'react-ele-webapp',
	      template: path.resolve(TEM_PATH, 'index.html'),
	      filename: 'index.html',
	      chunks: ['app', 'vendors'],
	      inject: 'body'
	    })
	  ]
}