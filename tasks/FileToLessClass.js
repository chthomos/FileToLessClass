/*
 * FileToLessClass
 * https://github.com/chthomos/FileToLessClass
 *
 * Copyright (c) 2013 Harry Thomos
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var path = require('path');
module.exports = function(grunt) {

  grunt.registerMultiTask('filetolessclass', 'Gets all files in a directory and creates a less class for each file. Useful for sprites', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      validExtensions : ['png','jpg','gif'],    //Extensions to generate classes from
      lessSuffix : '-image',                    //Generated class suffix
      lessPrefix : '',                          //Generated class prefix
      importers : [],                           //Less imports at the beginning of each generated file
    });

    function getExtension(filename) {
      var ext = path.extname(filename||'').split('.');
      return ext[ext.length - 1];
    }

    function getName(filename) {
      var ext = path.basename(filename||'').split('.');
      return ext[0];
    }

    
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {      
      
      var output = "";
      

      //Less importing
      if (typeof(options.importers[f.dest])!='undefined'){
        if (typeof(options.importers[f.dest])=='object'){
          for(var i in options.importers[f.dest])
            if (options.importers[f.dest].hasOwnProperty(i))
              output += "@import \"" + options.importers[f.dest][i] + "\";\n"
        }
        else{
              output += "@import \"" + options.importers[f.dest] + "\";\n"
        }
        output += "\n";
      }
      var folder = f.orig.src[0];
      //Loop through files
      grunt.log.writeln("Processing folder: " + folder);      
      if (fs.existsSync(folder)) { 
       if (fs.lstatSync(folder).isDirectory()){      
          var count =0;
          var ignored = 0;
          fs.readdirSync(folder).forEach(function(f){                  
            var extension = getExtension(folder + "/" + f);
            var name= "";                        
            if ((options.validExtensions.indexOf(extension)!==-1)&&(!fs.lstatSync(folder + "/" + f).isDirectory())){
              //The file is valid
              count +=1;
              name = getName(f);
              output += "." + options.lessPrefix + name + options.lessSuffix + "{\t.sprite(@" + name + ");}\n";
            }        else {
              ignored +=1;
            }
          });
          grunt.file.write(f.dest,output);
          grunt.log.ok('File "' + f.dest + '" created from ' + count + ' file(s)  (ignored ' + ignored + ' files / folders)');    
        }else {
          grunt.log.error(f.orig.src + ' is not a directory');
        }
      }else {
        grunt.log.error(f.orig.src + ' does not exist');
      }
     
    });
  });

};
