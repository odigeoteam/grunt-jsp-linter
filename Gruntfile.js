/*
 * grunt-htmlhint
 * https://github.com/yaniswang/grunt-htmlhint
 *
 * Copyright (c) 2013 Yanis Wang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    jsplinter: {
      all: {
        options: {
          'tag-pair': true,
          'src-not-empty': false,
          'doctype-first': false,
          'htmlhintrc': 'test/.htmlhintrc'
        },
        src: ['test/fixtures/*.html', 'test/fixtures/*.jsp']
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'jsplinter']);

};
