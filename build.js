'use strict';

require('harmonize');

var Metalsmith = require('metalsmith'),
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
  axis = require('axis'),
  mdattrs = require('markdown-it-attrs'),
  mdFoot = require('markdown-it-footnote');

var markdown = require('metalsmith-markdownit');
var md = markdown('default');
md.parser.use(mdattrs).use(mdFoot);

new Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Georgian Typography & Type Design',
      url: 'https://type.ge'
    }
  })
  .ignore(['_*.styl', '_*.css', '*.jade', '.DS_Store'])
  .use(coffee())
  .use(stylus(
    {
      compress: true,
      use: [koutoSwiss(), axis()]
    }
  ))
  .use(autoprefixer())
  .use(copy({
    'pattern': 'assets/styl/*',
    'directory': 'assets/css',
    'move': true
  }))
  .use(md)
  .use(permalinks({
    pattern: ':title',
    relative: 'false'
  }))
  .use(layouts({
    'default': 'default.jade',
    'directory': './src/layouts',
    'engine': 'jade',
    'partials': 'includes',
    'pattern': '**/*.html'
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
