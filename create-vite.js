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

for (const template of templates) {
  await $`pnpm create vite --template ${template} ${template}`;
}

cd('..');
