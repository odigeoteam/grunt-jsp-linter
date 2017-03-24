/*
 * grunt-jsp-linter
 * https://bitbucket.org/odigeoteam/grunt-jsp-linter
 *
 * Copyright (c) 2015 alvaro.tanarro@odigeo.com
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('jsplinter', 'Validate jsp files.', function() {

        var HTMLHint = require("htmlhint").HTMLHint;
        var jsplinterReporter = require('./jsplinter-stylish');

        var options = this.options({
                force: false
            }),
            arrFilesSrc = this.filesSrc,
            verbose = grunt.verbose;

        if (options.htmlhintrc) {
            var rc = grunt.file.readJSON(options.htmlhintrc);
            grunt.util._.defaults(options, rc);
            delete options.htmlhintrc;
        }

        var force = options.force;
        delete options.force;

        var hintCount = 0;
        var out = [];
        arrFilesSrc.forEach(function(filePath) {
            var file = grunt.file.read(filePath),
                messages;
            if (file.length) {
                var i = 0;
                var dummyNameGenerator = function(match) {
                    return "dummy" + (i++) + match.replace(/[^\n]/g, '');
                };
                var replacer = function(match) {
                    return dummyNameGenerator('expr') + match.replace(/[^\n]/g, '');
                };
                var subTagReplacer = function(match) {
                    return '<' + match.slice(1, -1).replace(/<[^>]*\/>/g, dummyNameGenerator).replace(/<[^>]*>[\s\S]*?<\/[^>]*>/g, dummyNameGenerator) + '>';
                };

                var fileContents = file.replace(/\$\{[^}]*\}/g, replacer)
                    .replace(/{{.*?}}/g, replacer)
                    .replace(/<%--IGNOREJSPLINTER--%>[\s\S]*?<%--IGNOREJSPLINTER--%>/g, replacer)
                    .replace(/<%--[\s\S]*?--%>/g, replacer)
                    .replace(/<([^>]*?<[\s\S]*?>[^>]*?)*>/g, subTagReplacer);

                messages = HTMLHint.verify(fileContents, options);
                hintCount += messages.length;

                out.push({
                    errorCollection: messages,
                    fileName: filePath
                });

                verbose.write("Linting " + filePath + " ..");
                if (messages.length > 0) {
                    verbose.error();
                    grunt.verbose.writeln(fileContents.yellow);
                } else {
                    verbose.ok();
                }

            } else {
                grunt.log.writeln("Skipping empty file " + filePath);
            }
        });

        jsplinterReporter(out);

        if (hintCount > 0) {
            return force;
        }

        grunt.log.ok(arrFilesSrc.length + ' file' + (arrFilesSrc.length === 1 ? '' : 's') + ' lint free.');

    });

};