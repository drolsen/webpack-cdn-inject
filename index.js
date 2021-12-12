const { sources } = require('webpack');

class WebpackCDNInject {
  constructor(options) {
    this.options = {
      head: (options.head) ? options.head : [],
      body: (options.body) ? options.body : []
    };
  }

  makeLinkTag(url) { return `<link href="${url}" rel="stylesheet" />`; }
  makeScriptTag(url) { return `<script src="${url}"></script>`; }

  injectCDN(assets, compilation) {
    Object.keys(assets).map((i) => {
      // limit assets to only .html files
      if (i.indexOf('.html') !== -1) {
        // get .html file's source out of buffer and into string
        let HTML = assets[i].source().toString();

        // if we have head CDN urls
        if (this.options.head.length) {
          // inject tags with replace / regex
          HTML = HTML.replace(
            /<\/head>/,
            `\n    ${
              Object.keys(this.options.head).map((i) =>
                (this.options.head[i].indexOf('.css') !== -1)
                  ? this.makeLinkTag(this.options.head[i])          // link tags in head
                  : `    ${this.makeScriptTag(this.options.head[i])}`      // script tags in head
                ).join('\n')
            }\n  </head>`);
        }

        // if we have body CDN urls
        if (this.options.body.length) {
          // inject tags with replace / regex
          HTML = HTML.replace(
            /<\/body>/,
            `\n    ${Object.keys(this.options.body).map((i) =>
              (this.options.body[i].indexOf('.js') !== -1)
                ? this.makeScriptTag(this.options.body[i])                 // script tags in body
                : this.makeLinkTag(this.options.body[i])
              ).join('\n    ')   // link tags in body (odd, but possible)
            }\n  </body>`);
        }

        // Store changed HTML results back into compliation's asset to be written to disk.
        compilation.updateAsset(i, new sources.RawSource(HTML));        
      }
    });    

    return assets;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap({ name: 'WebpackCDNInject' }, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'WebpackCDNInject',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS, // see below for more stages
          additionalAssets: (assets) => this.injectCDN(assets, compilation)
        }, (assets) => this.injectCDN(assets, compilation)
      );
    });
  }
}

module.exports = WebpackCDNInject;
