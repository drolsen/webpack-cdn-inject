<div align="center">
  <img src="/assets/logo.png" width="300" />
  <p style="margin-top: 25px;">Plugin to inject CDN script blocks to DOM.</p>

[![Build Status](https://travis-ci.com/drolsen/webpack-svg-spritely.svg?branch=master)](https://travis-ci.com/drolsen/webpack-svg-spritely)
[![dependencies Status](https://david-dm.org/drolsen/webpack-svg-spritely/status.svg)](https://david-dm.org/drolsen/webpack-svg-spritely)
[![devDependencies Status](https://david-dm.org/drolsen/webpack-svg-spritely/dev-status.svg)](https://david-dm.org/drolsen/webpack-svg-spritely?type=dev)
</div>

### How it works
Webpack CDN Inject allows developers a way to define CDN hosted assets that will be injected into their HTML document. CDN hosted assets helps reduce your project's build times and size and in some cases speed up load times.

Webpack CDN Inject accepts both JS (script tag) and CSS (link tag) configurations.

JS configurations are injected into bottom of your document's body, while CSS configurations are  injected into the bottom of the head of your document (below any existing tags).

---
### Install
```
npm i --save-dev webpack-cdn-inject
```
```
yarn add --dev webpack-cdn-inject
```

### Webpack Config
```js
const WebpackCDNInject = require('webpack-cdn-inject');
```
Instantiate a new WebpackCDNInject() class within Webpack configuration's plugin array:
```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      [key]: [url.js],
      [key]: [url.css]
    })
  ]
};
```

### Plugin Recommendations
There are LOTS of CDN sites out there that host lots and LOTS of assets.
However, WebpackCDNInject recommends you use https://unpkg.com/ which is a direct mirror of NPM.
Any module you would like to use found on NPM can be found on unpkg including all back versions.

By supporting the use of unpkg, you not only save time and make code endpoints be consistent, you are helping raise awareness across developers to unpkg.com. Please consider it!

---

## Options

```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      [key]: [url.js],
      [key]: [url.css]
    }, {options})
  ]
};
```

Option | Types | Description | Default
--- | --- | --- | ---
`js` | 'before' or 'after' | Defines if injected script blocks should be injected before or after existing found scripts before closing body tag. | 'before'
`css` | 'before' or 'after' | Defines if injected link tags should be injected before or after existing found link tags in document head. | 'after'
`entry` | String | If not using HTMLWebpackPlugin, you can define what entry file to add injecting JS too. | first found entry asset.


## js
When configuring a WebpackCDNInject url that has .js in the path, it will be injected into the document's body (just before closing body tag). However, by default WebpackCDNInject will inject CDN script blocks before any existing found script blocks before closing body tag.

This option allows you to define if WebpackCDNInject script blocks should be inserted before or after any existing script blocks.

## css
When configuring a WebpackCDNInject url that has .css in the path, it will be injected into the document's head (just before closing head tag). However, by default WebpackCDNInject will inject CDN link tags after any existing found tags within the document head.

This option allows you to define if WebpackCDNInject link tags should be inserted before or after any existing tags in document head.

## entry
WebpackCDNInject will check to see if build is using the popular HTMLWebpackPlugin, and if found to be true will inject CDN script blocks and link tags into the configured HTML entry file(s) for HTMLWebpackPlugin.

However, if found not to be using HTMLWebpackPlugin, WebpackCDNInject will add a little supporting script into your entry .js file that, once ran in browser will inject script blocks and link tags to the document programmatically.

This option allows you to define what entry file to add supporting script code too. 

---

### Tests

Webpack CDN Inject comes with a number of tests found under `/tests`.
These are here to help you better understand the expectations of each option we covered above.

Simply run `npm run test` or `yarn test` from the root of the plugin to run all tests. Running a test will produce a `/dist/[test]` directories. With each test, be sure to review the bottom of the bundled.js file(s), and the sprite file to understanding changes taking place from test to test.

If you would like to change a test, update the root package.json file's `test` script to use any of the `/test/*.test.config.js` files.

- `basic.test.config.js` = Should produce a .html file with injected script and link tags using HTMLWebpackPlugin.

`test.a.js` and `test.b.js` files are our test supporting entry files, not test configurations. Both these files are requiring our test svg files which is a requirement of Webpack CDN Inject.