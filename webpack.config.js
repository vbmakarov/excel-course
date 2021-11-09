const path = require('path'); // подключаем библиотеку для работы с путями
const HtmlWebpackPlugin = require('html-webpack-plugin'); //  создает index.html в директории с бандлом (dist) и автоматически добавляет в него ссылку на бандл (файл .js).
const CopyPlugin = require('copy-webpack-plugin'); //
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssLoader = require('css-loader'); // Благодаря css-loader мы можем импортировать CSS-файлы в наш проект
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv)=>{
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  console.log('development: ', isDev);
  console.log('production: ', isProd);

  const getFileName = (ext)=> {
    return isProd ? `[name].[contenthash].bundle.${ext}`:`[name].bundle.${ext}`;
  };

  const getPlugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            // берем favicon.png ->
            from: path.resolve(__dirname, 'src', 'favicon.png'),
            // ->помещаем в папку img в папке dist
            to: 'img',
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: getFileName('css'),
      }),
    ];
    if (isDev) {
      base.push(new ESLintPlugin());
    }
    return base;
  };

  return {
    // подключаем папку src, в которой будут лежать все js файлы проекта
    context: path.resolve(__dirname, `src`),
    entry: {
      main: ['../node_modules/core-js/stable',
        '../node_modules/regenerator-runtime/runtime',
        // eslint-disable-next-line max-len
        './index.js'], // подключаем входной файл index.js из папки src   ./ -это папка src, которую мы подключили выше
    },
    output: {
      // создаем папку куда мы будем складывать обработанный webpack-ом index.js
      path: path.resolve(__dirname, 'dist'),
      // [name] - это имя "main" файла из entry : {main: '.index.js'}
      filename: getFileName('js'),
      clean: true,
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.join(__dirname, 'src'),
        '@core': path.join(__dirname, 'src/core'),
      },
    },
    devServer: {
      port: 3000,
      open: {
        app: {
          name: 'google-chrome',
        },
      },
      hot: true,
      watchFiles: './',
    },
    devtool: isDev? 'source-map' : false,
    plugins: getPlugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            },
          },
        },
      ],
    },
  };
};
