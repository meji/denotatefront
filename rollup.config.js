/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import filesize from 'rollup-plugin-filesize';
import {terser} from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

// Static assets will vary depending on the application
const copyConfig = {
  targets: [
    {src: 'node_modules/@webcomponents', dest: 'build/node_modules'},
    {src: 'images', dest: 'build'},
    {src: 'data', dest: 'build'},
    {src: 'index.html', dest: 'build'},
  ],
};

const config = {
  input: 'index.js',
  output: {
    dir: 'dev',
    format: 'es',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({'Reflect.decorate': 'undefined'}),
    resolve(),
    minifyHTML(),
    copy(copyConfig),
    terser({
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    filesize({
      showBrotliSize: true,
    }),
  ],
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(terser());
}

export default config;
