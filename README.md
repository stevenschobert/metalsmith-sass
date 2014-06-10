metalsmith-sass
===============

[![Build Status](https://travis-ci.org/stevenschobert/metalsmith-sass.svg?branch=master)](https://travis-ci.org/stevenschobert/metalsmith-sass)
[![Dependency Status](https://gemnasium.com/stevenschobert/metalsmith-sass.svg)](https://gemnasium.com/stevenschobert/metalsmith-sass)

A Sass plugin for Metalsmith.

## Installation

```sh
npm install --save metalsmith-sass
```

## Getting Started

If you haven't checked out [Metalsmith](http://metalsmith.io/) before, head over to their website and check out the
documentation.

## CLI Usage

If you are using the command-line version of Metalsmith, you can install via npm, and then add the
`metalsmith-sass` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-sass": {
      "outputStyle": "expanded"
    }
  }
}
```

## JavaScript API

If you are using the JS Api for Metalsmith, then you can require the module and add it to your
`.use()` directives:

```js
var sass = require('metalsmith-sass');

metalsmith.use(sass({
  outputStyle: "expanded"
}));
```

## Options

Under the hood, this plugin is using [node-sass](https://github.com/andrew/node-sass), and there are
few options you can pass through to it:


### outputStyle

Compression-level of the output CSS. Can be `'nested', 'expanded', 'compact', 'compressed'`.

### outputDir

Change the base folder path styles are outputed to. You can use this in combination with
Metalsmith's `destination` option to control where styles end up after the build.

The final output directory is equal to `Metalsmith.destination() + outputDirOption`. For example,
the following setup output styles to `build/css/` even though the source files are in `src/scss/`:

```js
Metalsmith()
  .source("src/")
  .destination("build/")
  .use(sass({
    outputDir: 'css/'   // This changes the output dir to "build/css/" instead of "build/scss/"
  }))
  .build(function () {
    done();
  });
```

### includePaths

Array of path names of directories to look for `@import` statements. By default, this plugin should locate
all imports own its own, but if you are getting `not found` errors, try manually adding some paths.

### imagePath

Base path to use when evaluating `image-url()` functions in a stylesheet. Path will be prefixed to
the value.

## Credits

Thanks to [Segment.io](http://github.com/segmentio) for creating and open-sourcing
[Metalsmith](https://github.com/segmentio/metalsmith)! Also thanks to the whole community behind
the [node-sass](https://github.com/andrew/node-sass) project.
