const isProduction = process.env.NODE_ENV === 'production'

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: isProduction ? '.env.production' : '.env.development'
        }
      ]
    ],
    env: {
      development: {
        plugins: ['react-native-reanimated/plugin']
      },
      production: {
        plugins: ['react-native-reanimated/plugin', 'react-native-paper/babel']
      }
    }
  }
}
