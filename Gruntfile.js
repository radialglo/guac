module.exports = function(grunt) {

    "use strict";
    var connect = require('connect'),
        url = require('url'),
        // borrowed from https://github.com/jquery/jquery/blob/ca0086b55a158d8a4347f94254878d6dc5dd90ed/src/core.js#L241
        isEmptyObject = function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        };

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        jsonlint: {
            pkg: {
                src: ["package.json"]
            }
        },

        build: {
            // data
            all: {
                dest: "dist/guac.js",
            }
        },

        jshint: {
            options: {
                "browser": true,
                // "strict": true,
                "newcap": true,
                "undef": true,
                "curly": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "noarg": true,
                "sub": true,
                "boss": true,
                "eqnull": true,
                "laxcomma": true,
                "laxbreak": true,
                // "indent": 4,
                "globals": {
                    "module": true,
                    "require": true,
                    "define": true,
                    "console": true,

                    "Guac": true,
                    "$": true,

                    // mocha globals
                    "describe": true,
                    "it": true,
                    "expect": true,
                    "beforeEach": true,
                    "afterEach": true
                }
            },
            all: {
                src: [
                    "Gruntfile.js", 
                    "build/tasks/*",
                    "test/unit/*.js",
                    "src/**/*.js",
                    "!src/start.js",
                    "!src/end.js"
                ]
            }
        },


        watch: {
            scripts: {
                files: ["Gruntfile.js", "src/*.js", "src/**/*.js", "test/unit/*.js"],
                tasks: ["jshint"]
            }
        },

        uglify: {
            options: {
                banner: '/* Guac | /? /\\ |) | /\\ |_ (_, |_ () <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.js', '!*min.js'], // don't minify min files
                    dest: 'dist/',
                    ext: '.min.js'
                }]
            }
        },

        mocha: {
            test: {
                options: {
                    reporter: 'Nyan',
                    run: true,
                    log: true,
                    urls: [ 'http://localhost:8888/test/index.html' ]
                }
            }
        },
      connect: {
        server: {
          options: {
            port: 8888,
            base: ".",
            middleware:[
                // since we're overriding middleware
                // now we need to manually expose the static directory
                connect.static("."),
                connect.bodyParser(),
                function(req, res, next) {

                    // console.log(req.body);
                    // console.log(req._parsedUrl.pathname);
                    // console.log(req.url);
                    var requestPath = req._parsedUrl.pathname;
                    // parse query params for GET Request
                    var url_parts = url.parse(req.url, true);
                    var query = url_parts.query;

                    if (isEmptyObject(req.body)) {
                        req.body = url_parts.query;
                    }
                    if (requestPath === "/test/read" || req.method === "POST") {

                        var path = (requestPath === "/test/read") ? "." + req.body.filename : "." + req.url,
                            data = grunt.file.exists(path) ? grunt.file.read(path) : false,
                            type,
                            statusCode = 404;

                        if (data) {

                            if (path.indexOf("json") !== -1) {
                                type = "application/json";
                            } else if (path.indexOf("xml") !== -1) {
                                type = "application/xml";
                            } else {
                                type = "text/html";
                            }

                            if (type) {
                                res.setHeader ("Content-Type", type);
                            }
                            statusCode = 200;
                        }

                        res.statusCode = statusCode;
                        res.end(data);

                    } else {
                        return next();
                    }
                }
            ]
          }
        }
      }

    });
   
    grunt.loadTasks( "build/tasks");

    // Load grunt tasks from NPM packages
    require("load-grunt-tasks")(grunt);

    grunt.registerTask("dev", ["build:*:*"]);
    // Default grunt
    grunt.registerTask("default", ["jsonlint", "jshint", "dev", "uglify"]);
};
