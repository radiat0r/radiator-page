import { Config } from '@stencil/core';
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: 'ui-stencil',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'dist-custom-elements',
      copy: [
        {
          // this copies the logo.png into the root of the www folder
          src: './*.{jpg,png,svg,ico,webmanifest}',
          dest: 'www',
          warn: true,
        },
        {
          // this copies the dao logos into the root of the www folder
          src: './daopics/*.{jpg,png,svg,ico,webmanifest}',
          dest: 'www/daopics',
          warn: true,
        }
      ]
    },
  ],
  plugins: [
    sass()
  ]
};
