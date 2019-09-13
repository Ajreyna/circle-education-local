const postcss = require('postcss')
const { readFileSync, writeFileSync } = require('fs')
const atImport = require('postcss-import')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano');
const amp = require('postcss-amp');

postcss([atImport, amp, purgecss({
  content: ['./_site/**/*.html']
}), cssnano({ preset: ['advanced'] })])
  .process(
    readFileSync('assets/css/main.css'),
    {
      from: 'assets/css/main.css',
      to: 'assets/css/main.min.css',
      map: { inline: false, from: '../../assets/css/main.min.css' }
    }
  ).then(result => {
    writeFileSync('assets/css/main.min.css', result.css)
    if ( result.map ) writeFileSync ('assets/css/main.min.css.map', result.map)
  })