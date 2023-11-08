#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf solid`;
await $`mkdir -p solid`;
cd('solid');

const templates = [
  'bare',
  'hackernews',
  'movies',
  'notes',
  'todomvc',
  'with-auth',
  'with-authjs',
  'with-mdx',
  'with-prisma',
  'with-solid-styled',
  'with-tailwindcss',
  'with-trpc',
  'with-vitest',
  'with-websocket',
];

const failed = [];
for (const template of templates) {
  try {
    const answers = $`echo ${template}; sleep 1; echo yes; sleep 1; echo yes; sleep 1; echo yes`;
    await answers.pipe($`pnpm create solid ${template}`);
  } catch {
    failed.push(template);
  }
}

if (failed.length > 0) {
  console.warn(`Failed templates: ${failed}`);
}

cd('..');
