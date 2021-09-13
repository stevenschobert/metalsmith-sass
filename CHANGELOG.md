# Changelog

## Unreleased

- Updated to [node-sass v6.0.1](https://github.com/sass/node-sass/releases/tag/v6.0.1). This drops support for Node 10 and older.

## [v1.7.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v1.7.0)

_11/21/2019_

- Enable support for Node.js version 12/13 by upgrading to [node-sass v4.13.0](https://github.com/sass/node-sass/releases/tag/v4.13.0) - thanks [@nickcolley](https://github.com/nickcolley).

## [v1.6.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v1.6.0)

_01/20/2018_

- Updated to [node-sass v4.11](https://github.com/sass/node-sass/releases/tag/v4.11.0).
- Fixed performance issue with calling `toString()` on non-sass files. Thanks @crazy2be! #47 :tada:

## [v1.4.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v1.4.0)

_01/09/2017_

- Updated to [node-sass v4.2](https://github.com/sass/node-sass/releases/tag/v4.2.0). Thanks @shouze! #40 :tada:

## [v1.3.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v1.3.0)

_07/20/2015_

- Support for Metalsmith v2
- Nicer error messaging, thanks @callym! #26

## [v1.2.1](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v1.2.1)

_06/10/2015_

- README updates

## [v1.2.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v1.2.0)

_06/10/2015_

- Added support for `.sass` files! :tada:

## [v1.1.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v1.1.0)

_06/08/2015_

- Added support for using a function in the `outputDir` option. Useful for preserving folder structure instead of just aggregating everything into a single folder.

## [v1.0.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v1.0.0)

_05/25/2015_

- Updated to [node-sass v3.0](https://github.com/sass/node-sass/releases/tag/v3.0.0) :tada:
- Added support for [source maps](https://github.com/stevenschobert/metalsmith-sass/blob/b162dd7c6ae6e5c6ee858e4db7bfc2a5c6393a85/README.md#source-maps).
- All options now get passed through to node-sass (no more manual updates for new options!)

## [v0.7.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.7.0)

_02/21/2015_

- Upgrades to [node-sass v2.0.1](https://github.com/sass/node-sass/releases/tag/v2.0.1)
- Adds support for node v0.12

## [v0.6.1](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.6.1)

_01/30/2015_

- Compilation errors are now reported correctly through Metalsmith CLI.

## [v0.6.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.6.0)

_01/29/2015_

- Switched node-sass compilation to use buffers instead of file paths. This enables other plugins (like yaml front-matter) to work properly. See #14.
- Upgrade node-sass to v1.2

## [v0.5.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.5.0)

_11/05/2014_

- Any errors encountered when compiling sass files are now capture-able through Metalsmith's `.build(function(err, files) {})` method. Thank you @ubenzer for the contribution ([#12](https://github.com/stevenschobert/metalsmith-sass/pull/12))!

## [v0.4.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.4.0)

_10/17/2014_

This release updates [libsass](https://github.com/sass/libsass/) (the underlying sass library) to [v3.0](https://github.com/sass/libsass/releases/tag/3.0), which includes **tons** of major fixes and improvements.

##### Check out the [Libsass v3.0 release notes](https://github.com/sass/libsass/releases/tag/3.0) for a detailed list of updates.

---

- Update to [node-sass v1.0](https://github.com/sass/node-sass/releases/tag/v1.0.0).

## [v0.3.1](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.3.1)

_10/07/2014_

- Support for **Metalsmith v1.0**.

## [v0.3.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.3.0)

_07/05/2014_

- Now uses libsass 2.0. See the [node-sass changelog](https://github.com/sass/node-sass/releases/tag/v0.9.0).
- Dotfiles are now ignored in builds.

## [v0.2.1](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.2.1)

_06/23/2014_

- Fixed an issue that was causing filenames with underscores (e.g. `my_file.scss`) to incorrectly be treated as partials.

## [v0.2.0](https://github.com/stevenschobert/metalsmith-sass/releases/tag/v0.2.0)

_06/09/2014_

- Partials are now properly ignored (thanks [@dpisklov](https://github.com/dpisklov)!). Addresses #1 and #2.
- Added an `outputDir` option. Can be used in combination with `Metalsmith.destination()` to control output paths for stylesheets.
