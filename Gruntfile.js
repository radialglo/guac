module.exports = function(grunt) {

    "use strict";

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
                    "console": true
                }
            },
            all: {
                src: [
                    "Gruntfile.js", 
                    "build/tasks/*",
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

        connect: {
            server: {
                options: {
                    port: 8888,
                    base: '.',
                    middleware: function(connect, options, middlewares) {
                            // inject a custom middleware into the array of default middlewares
                            middlewares.push(function(req, res, next) {

                                if (req.method === "POST") {

                                    var path = "./" + req.url,
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
                            });

                            return middlewares;
                    }
                },
            },
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
        }

    });

    grunt.loadTasks( "build/tasks");

    // Load grunt tasks from NPM packages
    require("load-grunt-tasks")(grunt);

    grunt.registerTask("dev", ["build:*:*"]);
    // Default grunt
    grunt.registerTask("default", ["jsonlint", "jshint", "dev"]);
};
