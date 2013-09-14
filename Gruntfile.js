/*
 * FileToLessClass
 * https://github.com/chthomos/FileToLessClass
 *
 * Copyright (c) 2013 Harry Thomos
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    filetolessclass: {
      default_options: {
        options: {     
          importers : {
            'images.less' : 'sprite3.less'
          } 
        },
        files: {
          'images.less': 'images'
        },
      },      
    },    

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['filetolessclass']);

  
};
