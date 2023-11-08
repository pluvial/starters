#!/usr/bin/env zx
import { create } from 'create-svelte';
import 'zx/globals';

/** @typedef {Parameters<typeof create>[1]} Options  */

await $`rm -rf svelte`;
await $`mkdir -p svelte`;
cd('svelte');

const bool = [false, true];
const templates = ['default', 'skeleton', 'skeletonlib'];
const types = [null, 'checkjs', 'typescript'];

const permutations = [templates, types, bool, bool, bool, bool].reduce(
  (acc, arr) => acc.flatMap(el => arr.map(val => [...el, val])),
  [[]],
);

for (const [template, types, prettier, eslint, playwright, vitest] of permutations) {
  const path = [
    template,
    types && `-${types}`,
    prettier && '-prettier',
    eslint && '-eslint',
    playwright && '-playwright',
    vitest && '-vitest',
  ]
    .filter(Boolean)
    .join('');
  const name = `svelte-${path}`;

  /** @type {Options} */
  const options = {
    name,
    template,
    types,
    prettier,
    eslint,
    playwright,
    vitest,
  };
  console.log(JSON.stringify({ path, options }));
  await create(path, options);
}

cd('..');
