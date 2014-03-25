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
        log: {
            foo: [1, 2, 3],
            bar: 'hello world',
            baz: false
        }

    });

    grunt.loadTasks( "build/tasks");

    // Load grunt tasks from NPM packages
    require("load-grunt-tasks")(grunt);

    grunt.registerTask("dev", ["build:*:*"]);
    // Default grunt
    grunt.registerTask("default", ["jsonlint", "jshint", "dev"]);
};
