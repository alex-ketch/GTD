'use strict';

const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(
  path.join(__dirname, 'build'), {
    message: 'Auto-generated commit'
  },
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Site has been updated!'); // eslint-disable-line
    }
  }
);
