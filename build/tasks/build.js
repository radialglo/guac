/**
 * @file build script for guac.js that cleans up amd definitions adapted from jQuery build
 * @see https://github.com/jquery/jquery/blob/master/build/tasks/build.js
 */
module.exports = function(grunt) {

    "use strict";

    var fs = require("fs"),
        requirejs = require("requirejs"),
        rdefineEnd = /\}\);[^}\w]*$/,
        version = grunt.config( "pkg.version" ),
        // date
        date = new Date(),
        year = date.getFullYear(),
        month = ("" + date.getMonth()).replace(/^(\d)$/, "0$1"),
        day = ("" + date.getDate()).replace(/^(\d)$/, "0$1"),
        dateString = [year, month, day].join("-"); 

    /**
     * @function convert
     * @see https://github.com/jrburke/r.js/blob/master/build/example.build.js
     * A function that will be called for every write to an optimized bundle
     * of modules. This allows transforms of the content before serialization.
     * 
     * Specifically cleans up amd definitions, return statements
     **/
    function convert(name, path, contents) {

        // Ignore guac's exports because this is the mainfile
        if ( name !== "guac" ) {
                contents = contents
                        .replace( /\s*return\s+[^\}]+(\}\);[^\w\}]*)$/, "$1" )
                        // Multiple exports
                        .replace( /\s*exports\.\w+\s*=\s*\w+;/g, "" );
        }

        // Remove define wrappers, closure ends, and empty declarations
        contents = contents
        // *? is a nongreedy search for non-brackets
        .replace( /define\([^{]*?{/, "" )
        .replace(rdefineEnd, "");

        // Remove empty definitions
        contents = contents
        .replace( /define\(\[[^\]]+\]\)[\W\n]+$/, "" );

        return contents;
    }

    var config = {
         baseUrl: "src",
         name: "guac",
         out: "dist/guac.js",
         // We have multiple minify steps
         optimize: "none",
        // Avoid breaking semicolons inserted by r.js
        skipSemiColonInsertion: true,
        // Wrap any build bundle in a start and end text specified by wrap.
        // Use this to encapsulate the module code so that define/require are
        // not globals. The end text can expose some globals from your file,
        // making it easy to create stand-alone libraries that do not mandate
        // the end user use requirejs.
         wrap: {
            startFile: "src/start.js",
            endFile: "src/end.js"
         },
         // Allow "use strict"; be included in the RequireJS files.
         // Default is false because there are not many browsers that can properly
         // process and give errors on code for ES5 strict mode,
         // and there is a lot of legacy code that will not work in strict mode.
         useStrict: true,
         // Include dependencies loaded with require
         findNestedDependencies: true,
         onBuildWrite: convert
    };

    /**
     * @desc Handle Final output from the optimizer
     * @param {String} compiled
     */
    config.out = function(compiled) {

        compiled = compiled
                // embed version
                .replace(/@VERSION/g, version)
                // embed date
                .replace(/@DATE/g, dateString);
        grunt.file.write( "dist/guac.js", compiled);
    };


    // A multi task is a task that implicitly iterates over all of its named sub-properties 
    grunt.registerMultiTask("build", "Concatenate and Remove AMD modules", function() {

        var done = this.async(),
            name = this.data.dest;

        requirejs.optimize( config, function( response ) {
                grunt.verbose.writeln( response );
                grunt.log.ok( "File '" + name + "' created." );
                done();
        }, function( err ) {
            done(err);
        });

    });
};
