const makeLinkTag = (url) => `<link href="${url}" rel="stylesheet" />`;
const makeScriptTag = (url) => `<script src="${url}"></script>`;

class WebpackCDNInject {
  constructor(options) {
    this.options = (options) ? options : {
      head: [],
      body: []
    };
  }

  apply(compiler) {
    compiler.hooks.emit.tap({
      name: 'WebpackCDNInject'
    }, (compilation) => {
      Object.keys(compilation.assets).map((i) => {
        if (i.indexOf('.html') !== -1) {
          let data = compilation.assets[i].source().toString();
          if (this.options.head) {
            if (this.options.head.length) {
              data = data.replace(
                /<head>([\s\S]*?)<\/head>/,
                `<head>$1${
                  Object.keys(this.options.head).map((i) => 
                    (this.options.head[i].indexOf('.css') !== -1)
                      ? `  ${makeLinkTag(this.options.head[i])}`
                      : `    ${makeScriptTag(this.options.head[i])}`
                    ).join('\n')
                }\n  </head>`);
            }
          }

          if (this.options.body) {
            if (this.options.body.length) {
              data = data.replace(
                /<script([\s\S]*?)<\/body>/,
                `\n    ${Object.keys(this.options.body).map((i) => 
                  (this.options.body[i].indexOf('.js') !== -1)
                    ? makeScriptTag(this.options.body[i])
                    : makeLinkTag(this.options.body[i])).join('\n    ')
                }\n    <script$1\n  </body>`);
            }
          }
          compilation.assets[i].source = () => Buffer.from(data, 'utf8');        
        }
      }); 
    });
  }
}

module.exports = WebpackCDNInject;