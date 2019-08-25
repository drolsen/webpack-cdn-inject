<div align="center">
  <img src="/assets/logo.png" width="500" />
  <p style="margin-top: 25px;">Plugin to inject CDN assets into HTML documents.</p>

[![Build Status](https://travis-ci.com/drolsen/webpack-cdn-inject.svg?branch=master)](https://travis-ci.com/drolsen/webpack-cdn-inject)
[![dependencies Status](https://david-dm.org/drolsen/webpack-cdn-inject/status.svg)](https://david-dm.org/drolsen/webpack-cdn-inject)
[![devDependencies Status](https://david-dm.org/drolsen/webpack-cdn-inject/dev-status.svg)](https://david-dm.org/drolsen/webpack-cdn-inject?type=dev)
</div>

### How it works
Webpack CDN Inject allows developers a way to define CDN hosted assets that will be added to their HTML documents.
CDN hosted assets helps reduce your project's build times, bundle size and in some cases page speed.

Webpack CDN Inject accepts both `JS (<script/> tag)` and `CSS (<link/> tag)` configurations across both `head` and `head` of HTML documents.

Webpack CDN Inject works by injecting script/link CDN tags into all HTML files found within a given build's asset being output.
Therefor Webpack CDN Inject works with both [HTMLWebpackPlugin](https://www.npmjs.com/package/html-webpack-plugin) and good old fashion [CopyWebpackPlugin](https://www.npmjs.com/package/copy-webpack-plugin). So long as there is HTML file in a build's asset output, Webpack CDN Inject will take care of the rest.

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
Instantiate a `new WebpackCDNInject()` class within Webpack configuration's plugin array:
```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      ...config
    })
  ]
};
```

---

## Configuration


Option | Type | Description
--- | --- | ---
`head` | String array | Defines urls to be added to document head (tag type is defined by url's file extension).
`body` | String array | Defines urls to be added to document body (tag type is defined by url's file extension).

---

## body
All URLs added to the body option gets setup as script tags to the end of the document's body, but before any pre-existing scripts.

```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      body: ['url.js', 'url.css']
    })
  ]
};
```

---

## head
All URLs added to the head option gets setup as script tags to the end of the document's body, but before any pre-existing scripts.

```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      head: ['url.css', 'url.js']
    })
  ]
};
```

---

### Plugin Recommendations
Please support [https://unpkg.com/](https://unpkg.com/) (a direct mirror of everything on NPM) by using them as your CDN.
Any module you would like to use found on NPM can be found on unpkg including all back versions.

By using [https://unpkg.com/](https://unpkg.com/) you not only make endpoints be consistent in the configuration of this plugin, but you are helping raise awareness across developers to existence of [https://unpkg.com/](https://unpkg.com/). Please consider it!

---

### Tests

Webpack CDN Inject comes with three tests `head`, `body` and `copy`.
These are here to help you better understand the expectations of each option we covered above as well as stress test the plugin.

Simply run `npm run test` or `yarn test` from the root of the plugin to run all tests.

Running a test will produce a `/dist/[test name]` directory.

If you would like to change a test, update the root package.json file's `test` script to use any of the `/test/*.test.config.js` files.

- `body.test.config.js` = Should produce a entry .js file and a test.html.
The test.html file should have injected script tags in body of document before the existing script tag pointing to our entry .js file.The .html file in this test is provided to the build by [HTMLWebpackPlugin](https://www.npmjs.com/package/html-webpack-plugin).

- `body.test.config.js` = Should produce a entry .js and a test.html.
The test.html file should have injected link tags in head of document after any existing tags. The .html file in this test is provided to the build by [HTMLWebpackPlugin](https://www.npmjs.com/package/html-webpack-plugin).

- `copy.test.config.js` = Should produce a entry .js file and a test.html.
The test.html file should have both injected script tags in document body, and link tags in document head. The .html file in this test is provided to the build by [CopyWebpackPlugin](https://www.npmjs.com/package/copy-webpack-plugin).