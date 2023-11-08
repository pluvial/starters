#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf vite`;
await $`mkdir -p vite`;
cd('vite');

const templates = [
  'vanilla',
  'vanilla-ts',
  'vue',
  'vue-ts',
  'react',
  'react-ts',
  'react-swc',
  'react-swc-ts',
  'preact',
  'preact-ts',
  'lit',
  'lit-ts',
  'svelte',
  'svelte-ts',
  'solid',
  'solid-ts',
  'qwik',
  'qwik-ts',
];

const base = '@pluvial';
await $`mkdir -p ${base}`;

// non-parallel version
// const failed = [];
// for (const template of templates) {
//   try {
//     const name = `${base}/vite-${template}`;
//     await $`pnpm create vite ${name} --template ${template}`;
//     await $`mv ${name} ${template}`;
//   } catch {
//     failed.push(template);
//   }
// }

const timeout = '10s';
const results = await Promise.allSettled(
  templates.map(async template => {
    const name = `${base}/vite-${template}`;
    await $`pnpm create vite ${name} --template ${template}`.timeout(timeout);
    await $`mv ${name} ${template}`;
  }),
);
const failed = results
  .map((result, i) => (result.status === 'rejected' ? templates[i] : null))
  .filter(x => x);

if (failed.length > 0) {
  console.warn(`Failed templates: ${failed}`);
}

await $`rmdir ${base}`;

cd('..');
