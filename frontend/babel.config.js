module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@/components': './components',
            '@/features': './features',
            '@/navigation': './navigation',
            '@/screens': './screens',
            '@/store': './store',
            '@/hooks': './hooks',
            '@/constants': './constants',
            '@/services': './services',
            '@/utils': './utils',
            '@/types': './types',
            '@/assets': './assets',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
}; 