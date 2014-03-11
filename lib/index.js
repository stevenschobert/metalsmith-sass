(function() {
  'use strict';

  var sass = require('node-sass'),
      each = require('async').each,
      join = require('path').join,

      isSassFile = function isSassFile(filename) {
        return (/.*\.scss/).test(filename);
      },

      compile = function(basePath, files, filename, done) {
        var file = files[filename],
            includes = this.includePaths || [],
            outputStyle = this.outputStyle || 'compressed',
            imagePath = this.imagePath || '/';

        if (isSassFile(filename) === true) {
          sass.render({
            file: join(basePath, filename),
            includePaths: includes,
            imagePath: imagePath,
            outputStyle: outputStyle,
            success: function(css) {
              // replace contents
              file.contents = new Buffer(css);
              // rename file extension
              files[filename.replace('.scss', '.css')] = file;
              delete files[filename];
              done();
            },
            error: function(err) {
              throw err;
            }
          });
        } else {
          done();
        }
      },

      compileSass = function compileSass(files, metalsmith, done) {
        var basePath = join(metalsmith.dir, metalsmith._src);
        each(Object.keys(files), compile.bind(this, basePath, files), done);
      },

      plugin = function plugin(options) {
        var config = options || {};
        return compileSass.bind(config);
      };

  module.exports = plugin;
}());
