#!/usr/bin/env zx
import { create } from 'create-svelte';
import 'zx/globals';

/** @typedef {Parameters<typeof create>[1]} Options  */

await $`rm -rf svelte`;
await $`mkdir -p svelte`;
cd('svelte');

const bool = [false, true];

const templates = [
  // template
  ['default', 'skeleton', 'skeletonlib'],
  // types
  [null, 'checkjs', 'typescript'],
  // prettier
  bool,
  // eslint
  bool,
  // playwright
  bool,
  // vitest
  bool,
  // svelte5
  bool,
].reduce((acc, arr) => acc.flatMap(el => arr.map(val => [...el, val])), [[]]);

function properties([template, types, prettier, eslint, playwright, vitest, svelte5]) {
  const path = [
    template,
    types && `-${types}`,
    prettier && '-prettier',
    eslint && '-eslint',
    playwright && '-playwright',
    vitest && '-vitest',
    svelte5 && '-svelte5',
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
    svelte5,
  };
  return [path, options];
}

// non-parallel version
// const failed = [];
// for (const template of templates) {
//   const [path, options] = properties(template);
//   try {
//     await create(path, options);
//   } catch (e) {
//     failed.push([path, options]);
//   }
// }

const results = await Promise.allSettled(
  templates.map(template => create(...properties(template))),
);
const failed = results
  .map((result, i) => (result.status === 'rejected' ? properties(templates[i]) : null))
  .filter(Boolean);

if (failed.length > 0) {
  console.warn('Failed templates:');
  console.warn(failed.map(([path]) => path).join(', '), '\n');
  console.warn(failed.map(([path, options]) => `${path}: ${JSON.stringify(options)}`).join('\n\n'));
}

cd('..');
