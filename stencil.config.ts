import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'ui-stencil',
  globalScript: 'src/global.ts',
  globalStyle: 'src/global.scss',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'dist-custom-elements',
      copy: [
        {
          // this copies the favicon.ico into the root of the www folder
          src: './*.{ico,png}',
          dest: 'www',
          warn: true,
        },
      ],
    },
  ],
  rollupPlugins: {
    after: [
      nodePolyfills(),
    ],
  },
  plugins: [
    sass(),
  ],
};
