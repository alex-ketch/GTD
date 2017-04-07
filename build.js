'use strict';

const Metalsmith   = require('metalsmith');
const autoprefixer = require('metalsmith-autoprefixer');
const permalinks   = require('metalsmith-permalinks');
const layouts      = require('metalsmith-layouts');
// const cleanCSS     = require('metalsmith-clean-css');
const copy         = require('metalsmith-copy');
const watch        = require('metalsmith-watch');
const serve        = require('metalsmith-serve');
const mdattrs      = require('markdown-it-attrs');
const mdFoot       = require('markdown-it-footnote');
const sass         = require('metalsmith-sass');

let markdown       = require('metalsmith-markdownit');
let md = markdown('default');
md.parser.use(mdattrs).use(mdFoot);

new Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Georgian Typography & Type Design',
      url: 'https://type.ge'
    }
  })
  .ignore(['_*.styl', '_*.css', '*.pug', '.DS_Store'])
  .use(sass({
    outputDir: 'assets/css/',
    outputStyle: 'compact', // nested, expanded, compact, compressed
    precision: 8
  }))
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
    'default': 'default.pug',
    'directory': './src/layouts',
    'engine': 'pug',
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
  .build((err) => {
    if (err) {
      throw err;
    } else {
      console.log('The cast is forged!'); // eslint-disable-line
    }
  });
