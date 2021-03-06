const linkTag = (url) => `<link href="${url}" rel="stylesheet" />`;
const scriptTag = (url) => `<script src="${url}"></script>`;

class WebpackCDNInject {
  constructor(options) {
    this.options = {
      head: (options.head) ? options.head : [],
      body: (options.body) ? options.body : []
    };
  }

  apply(compiler) {
    compiler.hooks.emit.tap({
      name: 'WebpackCDNInject'
    }, (compilation) => {
      // loop over build assets
      Object.keys(compilation.assets).map((i) => {
        // limit assets to only .html files
        if (i.indexOf('.html') !== -1) {
          // get .html file's source out of buffer and into string
          let HTML = compilation.assets[i].source().toString();

          // if we have head CDN urls
          if (this.options.head.length) {
            // inject tags with replace / regex
            HTML = HTML.replace(
              /<head>([\s\S]*?)<\/head>/,
              `<head>$1${
                Object.keys(this.options.head).map((i) => 
                  (this.options.head[i].indexOf('.css') !== -1)
                    ? `  ${linkTag(this.options.head[i])}`          // link tags in head
                    : `    ${scriptTag(this.options.head[i])}`      // script tags in head
                  ).join('\n')
              }\n  </head>`);
          }

          // if we have body CDN urls
          if (this.options.body.length) {
            // inject tags with replace / regex
            HTML = HTML.replace(
              /<script([\s\S]*?)<\/body>/,
              `\n    ${Object.keys(this.options.body).map((i) => 
                (this.options.body[i].indexOf('.js') !== -1)
                  ? scriptTag(this.options.body[i])                 // script tags in body
                  : linkTag(this.options.body[i])).join('\n    ')   // link tags in body (odd, but possible)
              }\n    <script$1\n  </body>`);
          }

          // Store changed HTML results back into compliation's asset to be written to disk.
          compilation.assets[i].source = () => Buffer.from(HTML, 'utf8');        
        }
      }); 
    });
  }
}

module.exports = WebpackCDNInject;