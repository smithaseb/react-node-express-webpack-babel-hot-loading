# react-node-express-webpack-babel-hot-loading
Base framework/configuration to develop a web application using react, node, express, webpack babel with hot module 

Prerequisite : Install Nodejs

Steps to setup the configuration: 

cd to your folder where you want your project to live and run:

    npm init –y 

This will nitiate your node project and create the package.json file.

Install express 

    npm install express --save
    
Create server.js file and add the following to setup the server

    var express = require('express');
    var path = require('path');
    var app = express();
    var port = 8080;
    app.get('*', function(req,res){
       res.sendFile(path.join(__dirname,'app','index.html'));
    });
    app.listen(port,function(){
        console.log('Listening to port' + port);
    });

Add app/index.html

Run the express server 

    node server.js
and see whether the index.html is displayed by hitting 

    localhost:8080/

Install webpack

    npm install --save-dev webpack webpack-dev-middleware webpack-hot-middleware

Webpack – bundler utility
(explain webapck)

This way, you don't have to worrying about proxy logic and you can easily integrate hot reloading into your existing express server without the need for webpack-dev-server
configure weback

Add webpack.config.js

    var webpack = require('webpack');
    var path = require('path');
    module.exports = {
    entry: [
        'webpack-hot-middleware/client', // This connects to the server to receive notifications when the bundle rebuilds and then updates your client bundle accordingly
    './app/index.js' // entry point
    ],
    output: {
        path: __dirname,
        publicPath: '/assets/', // destination directory
        filename:'bundle.js'   // output file name
    },
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    }

To make Webpack work with a Node backend, update server.js with the following: 

    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler,{
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

Live-Reload with Webpack

With live reload, when you save a file, it automatically refreshes your browser. No need to press F5 anymore. Looks like a lazy developer tip, but it really increases your productivity, especially with dual-screen

Add below line to server.js

    app.use(require("webpack-hot-middleware")(compiler));

Add app/index.js

    console.log('hello world!!!!!!!');
    
Run the application again and see the hot module reloading setup is complete

See this in the browser console

    hello world!!!!!!!
    [HMR] connected
    
    
Install babel (for version 6) components ( for ES6 /JSX converting)
use Babel to transpile 

    npm install --save-dev babel-core babel-loader babel-plugin-react-transform babel-preset-es2015 babel-preset-react

Add .babelrc file

      "presets": ["react", "es2015"],
      "env": {
        "development": {
          "plugins": [
            ["react-transform", {
              "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              }, {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }]
            }]
          ]
        }
      }
    }

Update webpack.config.js to load babel loader 

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            }
        ],
    },

Install React now

    npm install --save react react-dom

Install react hot loader

    npm install --save-dev react-transform-hmr react-transform-catch-errors redbox-react


Add your first react code  to index.js 

    import React from 'react';
    import ReactDOM from 'react-dom';
    class Hello extends React.Component {
        render() {
            return <h1>Hello World!!!!!!!!!!!!!!!!!!! </h1>
        }
    }
    ReactDOM.render(<Hello/>, document.getElementById('app'));


Make changes to your react component and see the magic happening on the browser..

Happy coding in react……….

