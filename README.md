<div align="center">
  <img src="/assets/logo.png" width="500" />
  <p style="margin-top: 25px;">Plugin to inject CDN hosted assets to DOM.</p>

[![Build Status](https://travis-ci.com/drolsen/webpack-svg-spritely.svg?branch=master)](https://travis-ci.com/drolsen/webpack-svg-spritely)
[![dependencies Status](https://david-dm.org/drolsen/webpack-svg-spritely/status.svg)](https://david-dm.org/drolsen/webpack-svg-spritely)
[![devDependencies Status](https://david-dm.org/drolsen/webpack-svg-spritely/dev-status.svg)](https://david-dm.org/drolsen/webpack-svg-spritely?type=dev)
</div>

### How it works
Webpack CDN Inject allows developers a way to define CDN hosted assets that will be added to their HTML document by means of script or link tags. CDN hosted assets helps reduce your project's build times and size and in some cases speed up load times.

Webpack CDN Inject accepts both JS (script tag) and CSS (link tag) configurations.

JS configurations are injected into bottom of your document's body, while CSS configurations are injected into the bottom of the head of your document (below any existing tags).

Webpack CDN Inject supports HTMLWebpackPlugin and will inject CDN link / script tags into the document compiled by this plugin automatically.

However, Webpack CDN Inject also comes with a fallback approach for builds not using HTMLWebpackPlugin by means of a programmatic install of CDN link / tags. In these build types, a little more configuration might be necessary so please see entry options.

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
      head: ['url.css', 'url.css']
      body: ['url.js', 'url.js']
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
      ...options
    })
  ]
};
```

Option | Types | Description | Default
--- | --- | --- | ---
`body` | object of strings | Defines url of scripts to be added to document body. | []
`head` | object of strings | Defines urls of css to be added to document head. | []
`entry` | String | If not using HTMLWebpackPlugin, you can define what entry file to add injecting JS too. | first entry asset.


## body
All urls added to the body option gets setup as script tags to the end of the document's body, but before any pre-existing scripts.

```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      body: ['url.js', 'url.js']
    })
  ]
};
```

## head
All urls added to the head option gets setup as script tags to the end of the document's body, but before any pre-existing scripts.

```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      head: ['url.css', 'url.css']
    })
  ]
};
```

## entry.file
Webpack CDN Inject checks to see if HTMLWebpackPlugin is found to be used in a build.
If found, WebpackCDNInject will inject both link and script tags to the HTML document produced from HTMLWebpackPlugin.

However if HTMLWebpackPlugin is not found, Webpack CDN Inject will inject a small JS snip into your build entry file. This small JS snip will install the CDN link and scripts tags programmatically when loaded in browser.

This entry option allows you to specify what entry file Webpack CDN Inject will inject JS snip into for programmatic install of CDN link / script tags. This is useful if you have a build configuration that has multiple entry files, and need finer control.

```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      entry: 'NameOfEntryOutput.js'
    })
  ]
};
```

## entry.wait

The wait option allows developers to specify if Webpack CDN Inject should wrap all entry.file's logic around a "onload checker" method against all the programmatically installed scripts.

This is useful if you have logic in your entry file that depends on the CDN assets being loaded in full prior.

```js
module.exports = {
  "plugins": [
    new WebpackCDNInject({
      entry: 'NameOfEntryOutput.js',
      wait: true
    })
  ]
};
```

The wait option works by registering each programmatically installed script tag into an array of false values. onLoad eventListeners are added to each installed script tag that updates the registry from false to true once script is loaded. Finally Webpack CDN Inject will recursively keep checking the registry for all entries to be true prior allowing entry file's logic to be ran.

Please note: It is important for developers to realize that in this setup, an Internet connection is not just something that effect the CDN requests, but also if the logic of your entry file will be ran at all. There is no bail option for this setup and if it is something that is limiting to your application or site needs, it is suggested you choose to set entry.wait to false and maintain your own API availability within your JS logic.

---

### Tests

Webpack CDN Inject comes with a number of tests found under `/tests`.
These are here to help you better understand the expectations of each option we covered above.

Simply run `npm run test` or `yarn test` from the root of the plugin to run all tests. Running a test will produce a `/dist/[test]` directories. With each test, be sure to review the bottom of the bundled.js file(s), and the sprite file to understanding changes taking place from test to test.

If you would like to change a test, update the root package.json file's `test` script to use any of the `/test/*.test.config.js` files.

- `basic.test.config.js` = Should produce a .html file with injected script and link tags using HTMLWebpackPlugin.

`test.a.js` and `test.b.js` files are our test supporting entry files, not test configurations. Both these files are requiring our test svg files which is a requirement of Webpack CDN Inject.