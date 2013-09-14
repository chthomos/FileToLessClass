# FileToLessClass

> Gets all files in a directory and creates a less class for each file. Useful for sprites

## Typical workflow
 - Designer creates an image with all sprites. Each sprite is places in one layer. 
 - Using [Export Layers as Images] https://github.com/jwa107/Photoshop-Export-Layers-as-Images each layer / sprite is stored in a separate file
 - Spritesmith creates a less file containing all sprites based on sprite file names
 - FileToLessClass creates a less file containing classes for all sprites.
 - Less compiles the less file in css

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install FileToLessClass --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('FileToLessClass');
```

## The "FileToLessClass" task

### Overview
In your project's Gruntfile, add a section named `FileToLessClass` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  FileToLessClass: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.validExtensions
Type: `String` Array
Default value: ['png','jpg','gif']

Only files with these extensions are going to be used

#### options.lessSuffix
Type: `String`
Default value: '-image'

Suffix to be applied in each generated class

#### options.lessPrefix
Type: `String`
Default value: ''

Prefix to be applied in each generated class

#### options.importers
Type: `Object`
Default value: {}

Allows to import specific less at the beginning of each generated file

### Usage Examples
FileToLessClass: {
    options:{
      importers : {
        'less/images.less' : ['global.less','image.prerequisites.less'],
        'less/icons.less' : 'global.less'
      }
    },
    files:{
        'less/images.less':'images'
        'less/icons.less' :'icons'
    }
}

This grunt task will loop do the following:
  - create a file less/images.less based on the files in images directories. This file will also @import global.less and image.prerequisites.less
  - create a file less/icons.less based on the files in icons directories. This file will also @import global.less



