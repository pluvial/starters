#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf qwik`;
await $`mkdir -p qwik`;
cd('qwik');

const templates = ['basic', 'empty', 'site-with-visual-cms', 'library'];

// non-parallel version
// const failed = [];
// for (const template of templates) {
//   try {
//     await $`pnpm create qwik ${template} ${template}`;
//   } catch {
//     failed.push(template);
//   }
// }

const results = await Promise.allSettled(
  templates.map(template => $`pnpm create qwik ${template} ${template}`),
);
const failed = results
  .map((result, i) => (result.status === 'rejected' ? templates[i] : null))
  .filter(x => x);

if (failed.length > 0) {
  console.warn(`Failed templates: ${failed}`);
}

cd('..');
