'use strict';

require('harmonize')(['harmony-generators']);

var Metalsmith = require('metalsmith'),
  markdown = require('metalsmith-markdown'),
  autoprefixer = require('metalsmith-autoprefixer'),
  permalinks = require('metalsmith-permalinks'),
  layouts = require('metalsmith-layouts'),
  coffee = require('metalsmith-coffee'),
  cleanCSS = require('metalsmith-clean-css'),
  copy = require('metalsmith-copy'),
  watch = require('metalsmith-watch'),
  serve = require('metalsmith-serve'),
  stylus = require('metalsmith-stylus'),
  koutoSwiss = require('kouto-swiss'),
  axis = require('axis');

new Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Georgian Typography & Type Design',
      url: 'https://type.ge'
    }
  })
  .clean(false)
  .ignore(['./','./package.json','./node_modules/','./build.js','./README.md','./src/', './src/layouts/'])
  .destination('./')
  .use(coffee())
  .use(stylus(
    {
      use: [koutoSwiss(), axis()]
    }
  ))
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
  .use(markdown())
  .use(permalinks({
    pattern: ':title',
    relative: 'false'
  }))
  .use(layouts({
    'engine': 'jade',
    'directory': 'layouts',
    'partials': 'includes'
  }))
  .use(serve({
    port: 8080,
    verbose: true
  }))
  .use(
    watch({
      paths: {
        '${source}/**/*': true
      },
      livereload: true,
    })
  )
  .build(function(err)
  {
    if (err)
    {
      throw err;
    } else {
      console.log('The cast is forged!');
    }
  });
