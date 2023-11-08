#!/usr/bin/env zx
import { create } from 'create-svelte';
import 'zx/globals';

await $`rm -rf svelte`;
await $`mkdir -p svelte`;
cd('svelte');

await create('default', {
  name: 'default',
  template: 'default', // or 'skeleton' or 'skeletonlib'
  types: 'checkjs', // or 'typescript' or null
  prettier: false,
  eslint: false,
  playwright: false,
  vitest: false,
});

cd('..');
