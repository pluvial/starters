#!/usr/bin/env zx

import path from 'node:path';
import { createApp } from 'create-qwik';
import 'zx/globals';

await $`rm -rf qwik`;
await $`mkdir -p qwik`;
cd('qwik');

// const pwd = (await $`pwd`).stdout.trim();
const pwd = process.cwd();

const templates = ['basic', 'empty', 'site-with-visual-cms', 'library'];

// non-parallel version
// const failed = [];
// for (const template of templates) {
//   try {
//     await createApp({ starterId: template, outDir: path.join(pwd, template) });
//   } catch {
//     failed.push(template);
//   }
// }

const results = await Promise.allSettled(
  templates.map(template => createApp({ starterId: template, outDir: path.join(pwd, template) })),
);
const failed = results
  .map((result, i) => (result.status === 'rejected' ? templates[i] : null))
  .filter(x => x);

if (failed.length > 0) {
  console.warn(`Failed templates: ${failed}`);
}

cd('..');
