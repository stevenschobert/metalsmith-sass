(function () {
  'use strict';

  var each = require('async').each,
      assert = require('assert'),
      exists = require('fs').existsSync,
      join = require('path').join,
      metalsmith = require('metalsmith'),
      rm = require('rimraf'),
      types = require('node-sass').types,
      sass = require('..'),
      equal = require('assert-dir-equal');

  describe('the plugin', function () {
    beforeEach(function (done) {
      var dirsToClean = [
        join(__dirname, 'fixtures/basic/build'),
        join(__dirname, 'fixtures/partials/build'),
        join(__dirname, 'fixtures/outputDir/build'),
        join(__dirname, 'fixtures/dotfiles/build'),
        join(__dirname, 'fixtures/imports/build'),
        join(__dirname, 'fixtures/front-matter/build'),
        join(__dirname, 'fixtures/invalid/build')
      ];
      each(dirsToClean, rm, done);
    });

    describe('core', function () {
      it('should compile sass files', function (done) {
        metalsmith(__dirname)
          .source('fixtures/basic/src')
          .destination('fixtures/basic/build')
          .use(sass({
            outputStyle: 'expanded'
          }))
          .build(function (err) {
            assert.equal(err, null, "There shouldn't be any error.");
            equal(join(__dirname, 'fixtures/basic/build'), join(__dirname, 'fixtures/basic/expected'));
            done();
          });
      });

      it('should ignore partial files', function (done) {
        metalsmith(__dirname)
          .source('fixtures/partials/src')
          .destination('fixtures/partials/build')
          .use(sass({
            outputStyle: 'expanded'
          }))
          .build(function (err) {
            if (err) {
              throw err;
            }
            equal(join(__dirname, 'fixtures/partials/build'), join(__dirname, 'fixtures/partials/expected'));
            done();
          });
      });

      it('should compile with import statements', function (done) {
        metalsmith(__dirname)
          .source('fixtures/imports/src')
          .destination('fixtures/imports/build')
          .use(sass({
            outputStyle: 'expanded'
          }))
          .build(function (err) {
            if (err) {
              throw err;
            }
            equal(join(__dirname, 'fixtures/imports/build'), join(__dirname, 'fixtures/imports/expected'));
            done();
          });
      });

      it('should ignore dotfiles', function (done) {
        metalsmith(__dirname)
          .source('fixtures/dotfiles/src')
          .destination('fixtures/dotfiles/build')
          .use(sass({
            outputStyle: 'expanded'
          }))
          .build(function (err) {
            if (err) {
              throw err;
            }
            equal(join(__dirname, 'fixtures/dotfiles/build'), join(__dirname, 'fixtures/dotfiles/expected'));
            assert(!exists(join(__dirname, 'fixtures/dotfiles/build/.badfile.css')));
            done();
          });
      });

      it('should operate correctly around YAML front matter', function (done) {
        metalsmith(__dirname)
        .source('fixtures/front-matter/src')
        .destination('fixtures/front-matter/build')
        .use(sass({
          outputStyle: 'expanded'
        }))
        .build(function (err) {
          if (err) {
            throw err;
          }
          equal(join(__dirname, 'fixtures/front-matter/build'), join(__dirname, 'fixtures/front-matter/expected'));
          assert(!exists(join(__dirname, 'fixtures/dotfiles/build/.badfile.css')));
          done();
        });
      });

      it('should correctly report errors to Metalsmith', function(done) {
        metalsmith(__dirname)
          .source('fixtures/invalid/src')
          .destination('fixtures/invalid/build')
          .use(sass({
            outputStyle: 'expanded'
          }))
          .build(function (err) {
            assert(err.message && /aninvalidrule/.test(err.message));
            assert(!exists(join(__dirname, 'fixtures/invalid/build/invalid.scss')));
            done();
          });
      });

      it('should accept custom functions', function(done) {
        metalsmith(__dirname)
          .source('fixtures/functions/src')
          .destination('fixtures/functions/build')
          .use(sass({
            outputStyle: 'expanded',
            functions: {
              'test($arg)': function(arg) {
                return new types.String('#' + arg.getValue() + '123');
              }
            }
          }))
          .build(function (err) {
            if (err) {
              throw err;
            }
            equal(join(__dirname, 'fixtures/functions/build'), join(__dirname, 'fixtures/functions/expected'));
            done();
          });
      });
    });

    describe('the outputDir option', function () {
      it('should change the destination directory', function (done) {
        metalsmith(__dirname)
          .source('fixtures/outputDir/src')
          .destination('fixtures/outputDir/build')
          .use(sass({
            outputStyle: 'expanded',
            outputDir: 'nested/'
          }))
          .build(function (err) {
            if (err) {
              throw err;
            }
            equal(join(__dirname, 'fixtures/outputDir/build'), join(__dirname, 'fixtures/outputDir/expected'));
            done();
          });
      });
    });
  });
}());
