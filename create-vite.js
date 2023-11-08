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

// non-parallel version
// for (const template of templates) {
//   await $`pnpm create vite --template ${template} ${template}`;
// }

const results = await Promise.allSettled(
  templates.map(template => $`pnpm create vite --template ${template} ${template}`.timeout('10s')),
);

const failed = results.map((result, i) => (result.status === 'rejected' ? i : null)).filter(x => x);
if (failed.length > 0) {
  console.warn(`Failed templates: ${failed.map(i => templates[i])}`);
  // const reasons = failed.map(i => results[i].reason);
  // for (const stdout of reasons.map(reason => reason.stdout)) {
  //   console.warn(stdout);
  // }
  // for (const stderr of reasons.map(reason => reason.stderr)) {
  //   console.error(stderr);
  // }
}

cd('..');
