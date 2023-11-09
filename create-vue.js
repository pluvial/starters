#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf vue`;
await $`mkdir -p vue`;
cd('vue');
// possible options:
// --default
// --typescript / --ts
// --jsx
// --router / --vue-router
// --pinia
// --with-tests / --tests (equals to `--vitest --cypress`)
// --vitest
// --cypress
// --nightwatch
// --playwright
// --eslint
// --eslint-with-prettier (only support prettier through eslint for simplicity)
// --force (for force overwriting)

const bool = [false, true];

const templates = [
  // ts
  bool,
  // jsx
  bool,
  // router
  bool,
  // pinia
  bool,
  // vitest
  bool,
  // e2e
  [null, 'cypress', 'nightwatch', 'playwright'],
  // lint
  [null, 'eslint', 'eslint-with-prettier'],
].reduce((acc, arr) => acc.flatMap(el => arr.map(val => [...el, val])), [[]]);

function properties([ts, jsx, router, pinia, vitest, e2e, lint]) {
  const strs = [
    ts && 'ts',
    jsx && 'jsx',
    router && 'router',
    pinia && 'pinia',
    vitest && 'vitest',
    e2e,
    lint,
  ].filter(Boolean);
  const path = strs.join('-') || 'default';
  const options = strs.map(s => '--' + s).concat('--default');
  return [path, options];
}

const base = '@pluvial';
await $`mkdir -p ${base}`;

const failed = [];
for (const template of templates) {
  const [path, options] = properties(template);
  const name = `${base}/vue-${path}`;
  try {
    await $`pnpm create vue ${name} ${options}`;
    await $`mv ${name} ${path}`;
  } catch (e) {
    failed.push([path, options]);
  }
}

if (failed.length > 0) {
  console.warn('Failed templates:');
  console.warn(failed.map(([path]) => path).join(', '), '\n');
  console.warn(failed.map(([path, options]) => `${path}: ${JSON.stringify(options)}`).join('\n\n'));
}

await $`rmdir ${base}`;

cd('..');
