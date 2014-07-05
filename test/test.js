(function () {
  'use strict';

  var each = require('async').each,
      assert = require('assert'),
      exists = require('fs').existsSync,
      join = require('path').join,
      metalsmith = require('metalsmith'),
      rm = require('rimraf'),
      sass = require('..'),
      equal = require('assert-dir-equal');

  describe('the plugin', function () {
    beforeEach(function (done) {
      var dirsToClean = [
        join(__dirname, 'fixtures/basic/build'),
        join(__dirname, 'fixtures/partials/build'),
        join(__dirname, 'fixtures/outputDir/build'),
        join(__dirname, 'fixtures/dotfiles/build')
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
            if (err) {
              throw err;
            }
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
