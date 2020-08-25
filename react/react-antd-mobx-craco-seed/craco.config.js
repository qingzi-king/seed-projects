/*
 * @Descripttion: 
 * @Author: qingzi.wang
 * @Date: 2020-06-08 18:03:19
 */ 
const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
  //   if (pluginOptions.preText) {
  //     console.log(pluginOptions.preText);
  //   }

  //   console.log(JSON.stringify(webpackConfig, null, 4));

  //   // Always return the config object.
  //   return webpackConfig;
  // },
  webpack: {
    definePlugin: {
      PTR_APP_ENV: 'pro'
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new AntdDayjsWebpackPlugin(),
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1890ff'
            }, // #1890ff 蓝色 #ED5311 橙色 #9D60FF 紫色
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true //设置为true即是less
        }
      ]
    ]
  }
};