const HtmlWebpackPlugin = require('html-webpack-plugin');

class WebpackCDNInject {
  constructor(config) {
    this.head = '';
    this.body = '';
    this.config = config;

    Object.keys(this.config).map((i) => {
      if (this.config[i].indexOf('css') !== -1) {
        this.head += `<link href="${this.config[i]}" rel="stylesheet" />`;
      } else {
        this.body += `\n    <script src="${this.config[i]}"></script>`;
      }
    });
  }

  apply(compiler) {
    // 1) determin if endpoint is CSS or JS (aka before </head> or </body>)
    // 2) scrub found modules against unpkg CDN
    // 3) if found, remove module from bundle and inject script blocks into HtmlWebpackPlugin

    // HtmlWebpackPlugin injection
    compiler.hooks.compilation.tap({
      name: 'WebpackCDNInject'
    }, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
        'StatsCompile',
        (data) => {
          data.html = data.html.replace(/<link(.*?)<\/head>/, `${this.head}<link$1</head>`);
          data.html = data.html.replace(/<script(.*?)<\/body>/,`${this.body}\n    <script$1\n  </body>`);
        }
      )
    });
  }
}

module.exports = WebpackCDNInject;