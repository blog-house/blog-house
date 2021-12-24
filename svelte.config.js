import adapter from '@sveltejs/adapter-static';
import replace from '@rollup/plugin-replace';
import markdown from './scripts/parse-markdown-articles.js';
import yaml from './scripts/parse-yaml.js';
import { windi } from 'svelte-windicss-preprocess';
import glob from 'rollup-plugin-glob';
import preprocess from 'svelte-preprocess';
import preprocessIcons from './scripts/preprocess-icons.js';
import env from 'dotenv';
import { getStatistics } from './scripts/resolve-statistics.js';

env.config();

const statistics = await getStatistics();

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [preprocessIcons, preprocess(), windi({})],
  onwarn(warning, defaultHandler) {
    if (warning.code.includes('a11y')) return;
    defaultHandler(warning);
  },
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          STATISTICS: JSON.stringify(statistics)
        }),
        yaml(),
        markdown(),
        glob()
      ],
      server: {
        fs: {
          allow: ['./config']
        }
      }
    }
  }
};
