#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf qwik`;
await $`mkdir -p qwik`;
cd('qwik');

const templates = ['basic', 'empty', 'site-with-visual-cms', 'library'];

const failed = [];
for (const template of templates) {
  try {
    await $`pnpm create qwik ${template} ${template}`;
  } catch {
    failed.push(template);
  }
}

if (failed.length > 0) {
  console.warn(`Failed templates: ${failed}`);
}

cd('..');
