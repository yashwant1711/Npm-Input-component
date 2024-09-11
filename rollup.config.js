import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

const devMode = (process.env.NODE_ENV === 'development');
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

export default [
  {
    input: 'src/index.js',
    output: {
      file: "dist/index.js",
      format: 'es',
      sourcemap: devMode ? 'inline' : false,
    },
    plugins: [
      postcss({
        modules: true, // Enable CSS Modules
        extract: true, // Extract CSS to a separate file
        minimize: !devMode, // Minimize CSS in production mode
        sourceMap: devMode // Enable source maps in development mode
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
      }),
      terser({
        ecma: 2020,
        mangle: { toplevel: true },
        compress: {
          module: true,
          toplevel: true,
          unsafe_arrows: true,
          drop_console: !devMode,
          drop_debugger: !devMode
        },
        output: { quote_style: 1 }
      })
    ]
  }
];

