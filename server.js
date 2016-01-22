    var express = require('express');
    var path = require('path');
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);

    var app = express();
    var port = 8080;
    app.use(require("webpack-dev-middleware")(compiler,{
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler));

    app.get('*', function(req,res){
       res.sendFile(path.join(__dirname,'app','index.html'));
    });
    app.listen(port,function(){
        console.log('Listening to port' + port);
    });