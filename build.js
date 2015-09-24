'use strict';

require('harmonize')(['harmony-generators']);

var Metalsmith = require('metalsmith'),
  markdown = require('metalsmith-markdown'),
  autoprefixer = require('metalsmith-autoprefixer'),
  jade = require('jade'),
  coffee = require('metalsmith-coffee'),
  stylus = require('metalsmith-stylus'),
  cleanCSS = require('metalsmith-clean-css'),
  copy = require('metalsmith-copy'),
  watch = require('metalsmith-watch'),
  serve = require('metalsmith-serve');

new Metalsmith(__dirname)
  .use(coffee())
  .use(stylus())
  .use(markdown())
  .use(autoprefixer())
  .use(cleanCSS(
    {
      files: 'build/assets/**/*.css',
      cleanCSS:
      {
        rebase: true
      }
  }))
  .use(copy(
  {
    'pattern': 'styl/*',
    'directory': 'assets/css',
    'move': true
  }))
  .use(
    watch({
      paths: {
        '${source}/**/*': true,
        'layouts/**/*': "**/*",
      },
      livereload: true,
    })
  )
  .use(serve())
  .build(function(err)
  {
    if (err)
    {
      throw err;
    } else {
      console.log('The cast is forged!')
    }
  });
