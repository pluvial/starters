#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf vite`;
await $`mkdir -p vite`;
cd('vite');
await $`pnpm create vite --template vanilla vanilla`;
cd('..');
