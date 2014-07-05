(function() {
  'use strict';

  var sass = require('node-sass'),
      each = require('async').each,
      path = require('path'),

      isSassFile = function isSassFile(filename) {
        return (/^[^_.].*\.scss/).test(path.basename(filename));
      },

      isPartial = function isPartial(filename) {
        return (/^_.*\.scss/).test(path.basename(filename));
      },

      compile = function(basePath, files, filename, done) {
        var file = files[filename],
            includes = this.includePaths || [],
            outputStyle = this.outputStyle || 'compressed',
            imagePath = this.imagePath || '/',
            outputDir = this.outputDir || path.dirname(filename);

        if (isSassFile(filename) === true) {
          sass.render({
            file: path.join(basePath, filename),
            includePaths: includes,
            imagePath: imagePath,
            outputStyle: outputStyle,
            success: function(css) {
              // replace contents
              file.contents = new Buffer(css);
              // rename file extension
              files[path.join(outputDir, path.basename(filename).replace('.scss', '.css'))] = file;
              delete files[filename];
              done();
            },
            error: function(err) {
              throw err;
            }
          });
        } else if (isPartial(filename) === true) {
          delete files[filename];
          done();
        } else {
          done();
        }
      },

      compileSass = function compileSass(files, metalsmith, done) {
        var basePath = path.join(metalsmith.dir, metalsmith._src);
        each(Object.keys(files), compile.bind(this, basePath, files), done);
      },

      plugin = function plugin(options) {
        var config = options || {};
        return compileSass.bind(config);
      };

  module.exports = plugin;
}());
