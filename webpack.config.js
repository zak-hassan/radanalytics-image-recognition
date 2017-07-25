var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './app/frontend/App.jsx'
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },
    output: {
        filename: 'bundle.js',
      path: __dirname + '/app/backend/static/build'
    },


    plugins: [
      //copy patternfly assets
      new CopyWebpackPlugin([
          {
              from: { glob: './node_modules/patternfly/dist/img/*.*'},
              to: './img',
              flatten: true
          },
          {
              from: { glob: './node_modules/patternfly/dist/fonts/*.*'},
              to: './fonts',
              flatten: true
          },
          {
              from: { glob: './node_modules/patternfly/dist/css/*.*'},
              to: './css',
              flatten: true
          }
      ]),
    ]
}
