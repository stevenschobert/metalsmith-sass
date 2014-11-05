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
              done(err);
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
        /**
         * Looks up different key names on `metalsmith` to support
         * old versions (< v1) of Metalsmith. At some point, I will remove
         * support for < v1 and remove the key lookups
         */
        var directory = metalsmith.dir || metalsmith._directory,
            source = metalsmith._src || metalsmith._source,
            basePath = path.join(directory, source);
        each(Object.keys(files), compile.bind(this, basePath, files), done);
      },

      plugin = function plugin(options) {
        var config = options || {};
        return compileSass.bind(config);
      };

  module.exports = plugin;
}());
