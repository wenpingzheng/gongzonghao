module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    [require.resolve('babel-plugin-module-resolver'), {
      root: ['./src'],
      alias: {
        '@': './src',
      },
    }],
  ],
};