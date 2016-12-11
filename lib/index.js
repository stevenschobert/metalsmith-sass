(function() {
  'use strict';

  var sass = require('node-sass'),
      each = require('async').each,
      path = require('path'),
      extend = require('extend'),

      isAnySassFile = function isAnySassFile(filename) {
        return (/^[^_.].*\.s[ac]ss/).test(path.basename(filename));
      },

      isSassFile = function isSassFile(filename) {
        return (/^[^_.].*\.sass/).test(path.basename(filename));
      },

      isPartial = function isPartial(filename) {
        return (/^_.*\.s[ac]ss/).test(path.basename(filename));
      },

      compile = function(config, basePath, files, filename, done) {
        var file = files[filename],
            filePath = path.join(basePath, filename),
            opts = extend({
              includePaths: [],
              outputStyle: 'compressed',
              imagePath: '/',
              outputDir: path.dirname(filename),
              indentedSyntax: isSassFile(filename)
            }, config, {
              // Use the file's content stream buffer rather than the file path.
              data: file.contents.toString(),
              file: filePath
            }),
            fileDir = path.dirname(filePath),
            computedOutputDir = (typeof opts.outputDir === 'function') ? opts.outputDir(path.dirname(filename)) : opts.outputDir,
            dest = path.join(computedOutputDir, path.basename(filename).replace(/\.s[ca]ss/, '.css'));

        if (opts.sourceMap) {
          opts.outFile = filePath.replace(/\.s[ca]ss/, '.css');
        }

        if (isAnySassFile(filename) === true) {
          // Append the file's base path to the available include paths.
          opts.includePaths.push(fileDir);

          // Compile the file using SASS.
          sass.render(opts, function (err, result) {
            var error = null;

            if (err && err instanceof Error) {
              error = new Error([
                '[metalsmith-sass] Error: ',
                err.message, ' -> ',
                err.file,
                ':',
                err.line, ':', err.column
              ].join(''));
            } else if (err) {
              error = new Error(err);
            }

            if (error) {
              done(error);
              return;
            }

            // add soure map
            if (result.map) {
              files[dest+'.map'] = {
                contents: result.map,
                mode: file.mode
              };
            }

            // replace contents
            file.contents = result.css;

            // rename file extension
            files[dest] = file;

            delete files[filename];
            done();
          });
        } else if (isPartial(filename) === true) {
          delete files[filename];
          done();
        } else {
          done();
        }
      },

      compileSass = function compileSass(config, files, metalsmith, done) {
        /**
         * Looks up different key names on `metalsmith` to support
         * old versions (< v1) of Metalsmith. At some point, I will remove
         * support for < v1 and remove the key lookups
         */
        var directory = metalsmith.dir || metalsmith._directory,
            source = metalsmith._src || metalsmith._source,
            basePath = path.join(directory, source);
        each(Object.keys(files), compile.bind(null, config, basePath, files), done);
      },

      plugin = function plugin(options) {
        var config = options || {};
        return compileSass.bind(null, config);
      };

  // exposing node-sass types for custom functions. see:
  // https://github.com/stevenschobert/metalsmith-sass/pull#21
  plugin.types = sass.types;
  module.exports = plugin;
}());
