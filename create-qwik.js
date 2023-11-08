#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf qwik`;
await $`mkdir -p qwik`;
cd('qwik');
await $`pnpm create qwik basic basic`;
cd('..');
