// @ts-check
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

const { name } = pkg;

const outDir = 'dist';

const entrypoint = 'src/index.ts';

// Define your externals here
const externals = ['react'];

export default defineConfig([
  {
    // Main compile step
    input: entrypoint,
    external: externals,
    plugins: [
      postcss({
        modules: {
          localsConvention: 'camelCaseOnly'
        },
        //extract: true ?
      }),

      typescript({
        useTsconfigDeclarationDir: true
      }),
    ],
    output: [
      {
        file: `${outDir}/${name}.js`,
        format: 'cjs',
        sourcemap: true
      }, {
        file: `${outDir}/${name}.mjs`,
        format: 'es',
        sourcemap: true
      }
    ]
  },
  {
    // Bundle generated d.ts files into one
    input: '.temp/index.d.ts',
    external: externals,
    plugins: [dts()],
    output: {
      file: `${outDir}/${name}.d.ts`,
      format: 'es'
    }
  }
]);